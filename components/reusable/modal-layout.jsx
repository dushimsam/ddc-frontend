
import React, { useMemo } from 'react';
import { useEffect, useState } from 'react';
import SuppliersDataService from '../../services/supplies/SupplierService';
import SuppliedPartsDataService from '../../services/supplies/SuppliedProductsService';

import RecordDetails from "../../components/record-details/record-details"
import UserService from "../../services/users/user.service"
import { processDetailedDate } from "../../utils/process-date"
const ModalContent = ({ fields, Table }) => {
    return (
        <div className="bg-white rounded border p-3 mt-2 mb-3">
            <h6 className="font-weight-bold text-dark" style={{ fontSize: "0.95em" }}>{fields.title}</h6>
            <div className="row pt-2 pl-5">

                {fields.value.map((field, index) => {
                    return (
                        <div className="col-8 pt-2">
                            <span className="font-weight-bold">{field.name}: </span><span className="font-weight-light">{field.value}</span>
                        </div>)
                })
                }

            </div>
{
Table && <React.Fragment>
{Table}
</React.Fragment>
}
        </div>
    );
};


const ModalLayout = ({ Table, fields ,Title}) => {

    return (
        <div className="modal fade" id="itemDetailsModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="false">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div class="modal-header">
                        <Title/>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body  rounded">
                        <ModalContent fields={fields} Table={Table} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalLayout;
