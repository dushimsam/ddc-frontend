import Pagination from "react-js-pagination";
import React from "react";

const Paginator = ({paginatorLoading, paginator, handlePageChange, cars=false}) => {
    return (
        <div className={"row mt-4 mb-4 " + (!cars ? 'justify-content-end' : 'justify-content-center')}>
            {
                paginatorLoading ? "Loading ..." :
                    <Pagination activePage={paginator.page} itemsCountPerPage={paginator.perPage}
                                totalItemsCount={paginator.total} pageRangeDisplayed={paginator.range}
                                onChange={handlePageChange}/>
            }
        </div>
    )
}

export  default  Paginator;