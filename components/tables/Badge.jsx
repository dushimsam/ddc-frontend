import React from 'react'

const Badge = ({color, text, value}) => {
    return (
        <div className="card">
            <div className="card-content">
                <div className="card-body cleartfix">
                    <div className="row">
                        <div className="align-self-center">
                            <h4 className="mr-2 text" style={{width: "13em"}}>{text}</h4>
                        </div>
                        <div className="align-self-center">
                            <span className={"rounded-circle  p-1 font-weight-bold text-white " + color}>{value}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Badge;