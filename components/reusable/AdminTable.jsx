import React from "react";

export default function AdminTable({label,rows}){
    return (
        <table className="table table-striped mt-2 border rounded" style={{fontSize: "0.8em"}}>
            <thead>
            <tr>
                <th scope="col">#</th>
                { label.map(col => <th scope="col">{col}</th>) }
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    )
}