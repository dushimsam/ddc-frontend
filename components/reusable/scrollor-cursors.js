export const Cursors = ({currentSlide, jumpToSlide}) => {
    return (
        <div className="controls">
            <button
                className="btn btn-default  p-0  border rounded-0 rounded-right"
                disabled={currentSlide === 0}
                style={{border: "2px solid #F3A35D"}}
                onClick={() => jumpToSlide(currentSlide - 1)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                >
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/>
                </svg>
            </button>
            <button
                className="btn btn-default bg-white p-0 border rounded-0 border-left-0"
                style={{backgroundColor: "#F3A35D"}}
                disabled={currentSlide === 5 - 1 || currentSlide === 5}
                onClick={() => jumpToSlide(currentSlide + 1)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                >
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
                </svg>
            </button>
        </div>)
}