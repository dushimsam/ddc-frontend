import {hide_modal} from "../../utils/modal-funs";

const UpdateFormLayout = ({Content, title}) => {
    return (
        <div className="modal fade" id="itemUpdateModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="false" style={{overflowY: "auto"}}>
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title font-weight-bold" id="exampleModalLabel">{title} </h6>
                        <button type="button" className="close" onClick={() => {
                            hide_modal("#itemUpdateModal")
                        }}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body  rounded">
                        {Content}
                    </div>
                </div>
            </div>
        </div>)
}

export default UpdateFormLayout