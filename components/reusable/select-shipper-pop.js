import React, { useState } from 'react';
// import Alert from "../components/alert";

const Result = ({ employee, setAlert, setEmployee }) => {

    return (
        <div className="container  pt-3 pb-1">
            <div className="row">
                <div className="col-3">
                    <img
                        id={"imageContainer"}
                        className="rounded-pill border-dark text-bold"
                        src={employee.user.imageUrl}
                        style={{ width: "5em", height: "5em" }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                                "https://ui-avatars.com/api/?name=" +
                                employee.user.username;
                        }}
                        alt={employee.user.username}
                        title={employee.user.username}
                    />
                </div>
                <div className="col-7">
                    <h6 className="text-dark text-capitalize" style={{ color: "#707070" }}>
                        <strong>{`${(employee.user.firstName).toUpperCase()} ${employee.user.lastName}`}</strong></h6>
                    <p style={{
                        width: "200px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis", color: "#707070", fontSize: "0.9em"
                    }}>{employee.user.email}</p>
                    <p style={{ fontSize: "0.9em", color: "#707070" }}>{employee.user.phone}</p>
                </div>

                <div className="col-1">
                    <button onClick={() => setEmployee(employee)} className="btn btn-danger rounded rounded-circle p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"
                                fill="rgba(255,255,255,1)" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}


const SearchBar = () => {
    return (
        <form action="">
            <div className="p-1 bg-light rounded border shadow-sm mb-4">
                <div className="input-group">
                    <input type="search" placeholder="Search for Shipper ..." aria-describedby="button-addon1"
                        className="form-control border-0 bg-light" />
                    <div className="input-group-append">
                        <button id="button-addon1" type="submit" disabled={true} className="btn btn-link text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                    d="M11 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9zm0 16c3.867 0 7-3.133 7-7 0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7zm8.485.071l2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414z"
                                    fill="rgba(52,72,94,1)" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </form>
    )
}

const Results = ({ employees, setEmployee, setAlert }) => {

    return (
        <div className="container">
            <div className="row">

                {employees.map((employee) => {
                    return (
                        <div className="col-6 mt-4">
                            <Result employee={employee} setAlert={setAlert} setEmployee={setEmployee} />
                        </div>

                    )
                })}
            </div>
        </div>
    )
}


const SelectEmployee = ({ setEmployee, employees }) => {
    const [alert, setAlert] = useState({ message: "", class: "", status: "", show: false })

    return (
        <div className="modal fade" id="selectShipperDialog" tabIndex="-1" role="dialog"
            aria-labelledby="exampleModalLabe" aria-hidden="false">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="container border p-3 rounded bg-white  shadow-lg">
                        {/*{alert.show && alert.status === "profile" ?*/}
                        {/*    <Alert className={"my-3 alert-" + alert.class} message={alert.message}/> : null*/}
                        {/*}*/}
                        <div className="row justify-content-center">
                            <div className="col-10">
                                <SearchBar />
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12 pb-3">
                                <Results setAlert={setAlert} setEmployee={setEmployee} employees={employees} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SelectEmployee;
