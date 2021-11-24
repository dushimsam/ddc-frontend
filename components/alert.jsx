export default function Alert(props) {
    return (
        <div className={"alert alert-dismissible fade show " + props.className} role="alert">
            {props.message || "Error occurred"}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close"
                    onClick={() => props.setAlert({show: false, class: "", message: ""})}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}
