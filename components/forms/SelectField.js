import React from "react";
import { ErrorMessage, useField } from "formik";

export default function SelectField({ label,onChange, children, ...props }) {
    const [ field, meta ] = useField(props);
    
    return (
        <div className="form-group m-0 mr-5">
            <label htmlFor={props.name} className="mb-0 mt-2">{label}</label>
            <select id={props.name} name={props.name}
                    className={`form-control m-0 ${meta.touched && (meta.error ? "is-invalid" : "is-valid")}`}
                    autoComplete="off"{...props}{...field} onChange={onChange}>
                {children}
            </select>
            <ErrorMessage name={field.name} component="div" className="invalid-feedback"/>
        </div>
    );
}