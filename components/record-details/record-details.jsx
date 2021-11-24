import React from 'react'


export const MapDetails = (fields)=>{
    return(
         fields.map((field, index) => {
                                return (
                                    <div className="col-8 pt-2">
                                        <span className="font-weight-bold">{field.name}: </span><span
                                        className="font-weight-light">{field.value}</span>
                                    </div>)
                            })

    )}

const RecordDetails = ({title, fields, only}) => {
    return (
        <div className="modal fade bg-dark" id="itemReadMoreModal" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabe"
             aria-hidden="false">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div class="modal-header">
                        <span> MORE ABOUT </span> <span class="modal-title font-weight-bold pl-1"
                                                        id="exampleModalLabe"> {` ${title} `} </span><span>'s  Records</span>
                        {
                            !only ?
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button> : null
                        }

                    </div>
                    <div className="modal-body  rounded">
                        <div className="row pt-2 pl-5">
                            <MapDetails fields={fields}/>
                        </div>
                        <div className="row">
                            <div className="col-11 pt-3">
                                <hr/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}


export default RecordDetails;