export default function Title({ children }){
    return (
        <div className="d-flex align-items-center py-3 py-md-4 py-lg-5 justify-content-center">
            <div className="dashboard-line"/>
            <h4 className="mx-3 mx-md-5 font-weight-bold text-secondary">{ children }</h4>
            <div className="dashboard-line"/>
        </div>
    )
}