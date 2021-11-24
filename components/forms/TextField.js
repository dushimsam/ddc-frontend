import React from "react";
import { ErrorMessage, useField } from "formik";

export default function TextField({ label, ...props }) {
    const [ field, meta ] = useField(props);
    
    return (
        <div className="form-group m-0 mr-md-5">
            <label htmlFor={props.name} className="mb-0 mt-2">{label}</label>
            <input id={props.name} name={props.name}
                   className={`form-control m-0 ${meta.touched && (meta.error ? "is-invalid" : "is-valid")}`}
                   autoComplete="off" type="text" {...props} {...field}/>
            <ErrorMessage name={field.name} component="div" className="invalid-feedback"/>
        </div>
    );
}