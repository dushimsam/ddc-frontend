import { useState } from "react";
import AuthService from "../../services/auth/auth.service";


const CheckUserModal = ({callFn,loading,setLoading}) =>{

    const [form, setForm] = useState({
        login: "",
        password: "",
      });

      const handleFormChange = (prop) => (event) => {
        setForm({ ...form, [prop]: event.target.value });
      };

      
  const check = async () => {
    // setLoading(true);
    try {
      const res = await AuthService.login(form);
      if (res.data.category === system_users.ADMIN) 
      {
        callFn(true)
      }else{
        callFn(false)
      }
    }catch{
        e=>{console.log(e);callFn(false);}
    }}
    return(

<div classname="modal fade bd-example-modal-lg" id="checkUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div classname="modal-dialog modal-dialog-centered" role="document">
    <div classname="modal-content row">
      <div classname="modal-header border-bottom-0">
        <h5 classname="modal-title" id="exampleModalLabel">Enter Full Credentials</h5>
        <button type="button" classname="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form>
        <div classname="modal-body">
          <div classname="form-group">
            <label for="email1">Email address</label>
            <input type="email"   onChange={handleFormChange("login")}
                value={form.login} classname="form-control" id="email1" aria-describedby="emailHelp" placeholder="Enter email"/>
         
          </div>
          <div classname="form-group">
            <label for="password1">Password</label>
            <input type="password"   onChange={handleFormChange("password")}
                value={form.password}
                 classname="form-control" id="password1" placeholder="Password"/>
          </div>
        </div>
        <div classname="modal-footer border-top-0 d-flex justify-content-center">
          <button type="submit" classname="btn btn-danger"  data-dismiss="modal" aria-label="Close" onClick={()=>{setLoading();check()}}>
               {loading ? (
                                <img
                                    src={"/img/loader.gif"}
                                    alt={"Loading"}
                                    className={"loader"}
                                />
                            ) : "CONTINUE ACTION"}
              
              </button>
        </div>
      </form>
    </div>
  </div>
</div>)
}


export default CheckUserModal;