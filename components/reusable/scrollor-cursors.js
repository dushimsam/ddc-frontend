export const Cursors = ({
  rounded,
  currentSlide,
  jumpToSlide,
  width,
  height,
}) => {
  if (!rounded) {
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
          style={{
            border: "1px solid #ff570c",
            backgroundColor: "#F3A35D",
          }}
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
      <div
        className="controls d-flex justify-content-between position-absolute mr-n2"
        style={{ zIndex: 1, bottom: "-12rem", width: "96%" }}
      >
        <button
          className="btn btn-default p-0 rounded-0 rounded-right mr-3"
          disabled={currentSlide === 0}
          style={{
            backgroundColor: "transparent",
          }}
          onClick={() => jumpToSlide(currentSlide - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="53"
            height="53"
            viewBox="0 0 53 53"
          >
            <defs>
              <filter
                id="Rectangle_3"
                x="0"
                y="0"
                width="53"
                height="53"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" input="SourceAlpha" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodColor="#b1adad" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g
              id="Group_63"
              data-name="Group 63"
              transform="translate(-89 -392)"
            >
              <g
                transform="matrix(1, 0, 0, 1, 89, 392)"
                filter="url(#Rectangle_3)"
              >
                <rect
                  id="Rectangle_3-2"
                  data-name="Rectangle 3"
                  width="35"
                  height="35"
                  rx="17.5"
                  transform="translate(9 6)"
                  fill="#f3a35d"
                />
              </g>
              <path
                id="Icon_awesome-angle-left"
                data-name="Icon awesome-angle-left"
                d="M2.006,12.283,7.27,7.019a.925.925,0,0,1,1.312,0l.875.875a.925.925,0,0,1,0,1.312L5.73,12.941l3.731,3.731a.925.925,0,0,1,0,1.312l-.875.879a.925.925,0,0,1-1.312,0L2.01,13.6a.926.926,0,0,1,0-1.316Z"
                transform="translate(109.019 403.5)"
                fill="#fff"
              />
            </g>
          </svg>
        </button>
        <button
          className="btn btn-default p-0 rounded-0"
          disabled={currentSlide === 40 - 1 || currentSlide === 40}
          style={{
            backgroundColor: "transparent",
          }}
          onClick={() => jumpToSlide(currentSlide + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="53"
            height="53"
            viewBox="0 0 53 53"
          >
            <defs>
              <filter
                id="Rectangle_3"
                x="0"
                y="0"
                width="53"
                height="53"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" input="SourceAlpha" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodColor="#b1adad" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g
              id="Group_64"
              data-name="Group 64"
              transform="translate(142 439) rotate(180)"
            >
              <g
                transform="matrix(-1, 0, 0, -1, 142, 439)"
                filter="url(#Rectangle_3)"
              >
                <rect
                  id="Rectangle_3-2"
                  data-name="Rectangle 3"
                  width="35"
                  height="35"
                  rx="17.5"
                  transform="translate(44 41) rotate(180)"
                  fill="#f3a35d"
                />
              </g>
              <path
                id="Icon_awesome-angle-left"
                data-name="Icon awesome-angle-left"
                d="M2.006,12.283,7.27,7.019a.925.925,0,0,1,1.312,0l.875.875a.925.925,0,0,1,0,1.312L5.73,12.941l3.731,3.731a.925.925,0,0,1,0,1.312l-.875.879a.925.925,0,0,1-1.312,0L2.01,13.6a.926.926,0,0,1,0-1.316Z"
                transform="translate(109.019 402.5)"
                fill="#fff"
              />
            </g>
          </svg>

          {/* <svg
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
          </svg> */}
        </button>
      </div>
    );
  }
};
