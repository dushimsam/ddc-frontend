import React, {useEffect, useState} from 'react';
import CustomerService from "../../../services/customers/customer.service"
import SingleSubModuleLayout from "../../../layouts/admin-layouts/SingleSubModule";
import SortableHead from "../../../components/tables/sortableHead"
import {processYear} from "../../../utils/process-date"
import SortTables from "../../../utils/sort-tables"
import RecordDetails from "../../../components/record-details/record-details"

function CustomersTable({customers,setCustomers}){
       
    const [sortOrder,setSortOrder] = useState({
        "first_name":null,
        "last_name":null,
        "email":null,
        "created_at":null
    })


   const setOrder = (prop)=>{

    let order;
 if(sortOrder[prop] == null || sortOrder[prop] == "DSC"){
     setSortOrder({ ...sortOrder, [prop]: "ASC" })
     order = "ASC"
 }else if(sortOrder[prop] == "ASC")
 {
     setSortOrder({ ...sortOrder, [prop]: "DSC" })
     order = "DSC"
 }
 return order;
}

        
    const sortData = (status) =>{
        let copy = [...customers]
        let sorted;
        switch(status){

            case "first_name":
                let extractedValue = customers.map(item => {
                    let new_obj =  {"id":item["_id"],"value":item["user"].firstName}
                    return new_obj;
                 });
               
                  sorted = SortTables(extractedValue,copy,setOrder(status));
                  console.log(sorted)
break;
case "last_name":
   
    extractedValue = customers.map(item => {
        let new_obj =  {"id":item["_id"],"value":item["user"].lastName}
        return new_obj;
     });
      sorted = SortTables(extractedValue,copy,setOrder(status));

break;

case "created_at":

    extractedValue = customers.map(item => {
     let new_obj =  {"id":item["_id"],"value":item.createdAt}
     return new_obj;
  });

   sorted = SortTables(extractedValue,copy,setOrder(status));

break;

case "username":
    extractedValue = customers.map(item => {
        let new_obj =  {"id":item["_id"],"value":item["user"].username}
        return new_obj;
     });
      sorted = SortTables(extractedValue,copy,setOrder(status));
 
break;

case "email":
    extractedValue = customers.map(item => {
        let new_obj =  {"id":item["_id"],"value":item["user"].email}
        return new_obj;
     });
      sorted = SortTables(extractedValue,copy,setOrder(status));
break;

default:
            console.log("invalid")
        }

        setCustomers(sorted);
    }


const[fields,setFields] = useState(null);
    const handleSetItem=(item)=>{
        setFields([
    {name:"First Name",value:item.user.firstName},
    {name:"Last Name",value:item.user.lastName},
    {name:"Phone Number",value:item.user.phone},
    {name:"Email",value:item.user.email},
    {name:"Gender",value:item.user.gender !=null ? item.user.gender:" UNKNOWN "},
    {name:"Username",value:item.user.username},
    {name:"Registered At ",value:processYear(item.createdAt)}
      ]);
      document.getElementById("modalShowBtn").click()
    }
    
    return (
        <React.Fragment> 
        <table
            className="table table-striped mt-2 border rounded sortable"
            style={{ fontSize: "0.8em" }}
        >
          
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col"><SortableHead subject={"Names"} sortProperty={"first_name"} sortOrder={sortOrder} sortData={sortData}/></th>
                    {/* <th scope="col"><SortableHead subject={"Last Name"} sortProperty={"last_name"} sortOrder={sortOrder} sortData={sortData}/></th> */}
                    {/* <th scope="col"><SortableHead subject={"Username"} sortProperty={"username"} sortOrder={sortOrder} sortData={sortData}/></th> */}
                    <th scope="col"><SortableHead subject={"Email"} sortProperty={"email"} sortOrder={sortOrder} sortData={sortData}/></th>
                    {/* <th scope="col">Gender</th> */}
                    <th scope="col">Phone</th>
                    {/* <th scope="col"><SortableHead subject={"Registered On"} sortProperty={"created_at"} sortOrder={sortOrder} sortData={sortData}/></th> */}
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer, index) => {
                    console.log(customer);
                    return (
                        <tr key={customer._id}>
                            <td scope="row">
                                <span className="text-uppercase">
                                    {index + 1}
                                </span>
                            </td>
                            <td>{`${customer.user.firstName} ${customer.user.lastName}`}</td>
                            <td>{customer.user.email}</td>
                            {/* <td>{customer.user.gender}</td> */}
                            <td>{customer.user.phone}</td>
                            {/* <td>{processYear(customer.createdAt)}</td> */}
                            <td>
                                <a className="text-decoration-none" onClick={()=>handleSetItem(customer)} href="#">Read More</a>
                {/* <ActionButtons handleSetItem={handleSetItem} item={companies}/> */}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        {fields && <RecordDetails title={fields[0].value} fields={fields}/>}
        <button id="modalShowBtn" className="d-none" data-toggle="modal" data-target="#itemReadMoreModal">Large modal</button></React.Fragment>
    );
}


const AllCustomers = () => {
    const [filter,setFilter] = useState()    

    const [customers,setCustomers] = useState([])
    useEffect(()=>{
        CustomerService.getAll()
            .then(res =>setCustomers(res.data.docs))
            .catch(err =>console.error(err))

    },[])
    return (
        <SingleSubModuleLayout Content={ <CustomersTable customers={customers}  setCustomers={setCustomers}/>}  count={customers.length} route={"customers"} name={"Customer"} setFilter={setFilter} status="new" page="customers"/>
    )
}

export default AllCustomers