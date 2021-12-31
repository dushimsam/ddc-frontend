export const Cursors = ({
  zIndexing,
  currentSlide,
  jumpToSlide,
  width,
  height,
}) => {
  if (!zIndexing) {
    return (
      <div className="controls">
        <button
          className="btn btn-default p-0 rounded-0 rounded-right mr-3"
          disabled={currentSlide === 0}
          style={{ border: "1px solid #ff570c", backgroundColor: "#F3A35D" }}
          onClick={() => jumpToSlide(currentSlide - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={!width ? "24" : width}
            height={!height ? "24" : height}
          >
            <path
              fill={currentSlide === 0 ? "#fff" : "#F3A35D"}
              d="M0 0h24v24H0z"
            />
            <path
              fill={currentSlide === 0 ? "#F3A35D" : "#fff"}
              d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"
            />
          </svg>
        </button>
        <button
          className="btn btn-default p-0 rounded-0"
          disabled={currentSlide === 40 - 1 || currentSlide === 40}
          style={{ border: "1px solid #ff570c", backgroundColor: "#F3A35D" }}
          onClick={() => jumpToSlide(currentSlide + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={!width ? "24" : width}
            height={!height ? "24" : height}
          >
            <path
              fill={
                currentSlide === 40 - 1 || currentSlide === 40
                  ? "#fff"
                  : "#F3A35D"
              }
              d="M0 0h24v24H0z"
            />
            <path
              d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"
              fill={
                currentSlide === 40 - 1 || currentSlide === 40
                  ? "#F3A35D"
                  : "#fff"
              }
            />
          </svg>
        </button>
      </div>
    );
  } else {
    return (
      <div className="controls d-flex justify-content-between mr-n5 ml-n5 mb-n5">
        <button
          className="btn btn-default p-0 rounded-0 rounded-right mr-3"
          disabled={currentSlide === 0}
          style={{
            border: "1px solid #ff570c",
            backgroundColor: "#F3A35D",
          }}
          onClick={() => jumpToSlide(currentSlide - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={!width ? "24" : width}
            height={!height ? "24" : height}
          >
            <path
              fill={currentSlide === 0 ? "#fff" : "#F3A35D"}
              d="M0 0h24v24H0z"
            />
            <path
              fill={currentSlide === 0 ? "#F3A35D" : "#fff"}
              d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"
            />
          </svg>
        </button>
        <button
          className="btn btn-default p-0 rounded-0"
          disabled={currentSlide === 40 - 1 || currentSlide === 40}
          style={{ border: "1px solid #ff570c", backgroundColor: "#F3A35D" }}
          onClick={() => jumpToSlide(currentSlide + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={!width ? "24" : width}
            height={!height ? "24" : height}
          >
            <path
              fill={
                currentSlide === 36 - 1 || currentSlide === 36
                  ? "#fff"
                  : "#F3A35D"
              }
              d="M0 0h24v24H0z"
            />
            <path
              d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"
              fill={
                currentSlide === 36 - 1 || currentSlide === 36
                  ? "#F3A35D"
                  : "#fff"
              }
            />
          </svg>
        </button>
      </div>
    );
  }
};
