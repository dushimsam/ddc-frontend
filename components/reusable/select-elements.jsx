import { GLOBAL_COLOR } from "../../utils/constants";


export const OptionImageSelection = ({ image, label }) => {
  return (
    <div className={"container"}>
      <div className={"d-flex flex-row"}>
        <div>
          <img
            id={"image"}
            className="border border-secondary border-2 cursor-pointer rounded shadow-sm mt-2 mb-1 " width={"40"}
            src={image} onError={(e) => { e.target.onerror = null; e.target.src = "/img/default-spare-part.png" }}
            title={label}
          />
        </div>
        <div>
          <p className={"mt-3 ml-2"}>{label}</p>
        </div>
      </div>
    </div>
  )
}

export const mainCustomStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    // const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isFocused ? GLOBAL_COLOR : "white",
      color: isFocused ? "white" : "gray",
      cursor: "pointer"
    };
  },
  control: (base, state) => ({
    ...base,
    boxShadow: "none",
    borderColor: "red",
    // paddingTop: "1em",
    height: "3em",
    '&:hover': { borderColor: 'gray' }, // border style on hover
    border: '1px solid lightgray', // default border color

  })
};


export const selectCustomStyles = (optionFontSize, valueFontSize) => {
  return (
    {
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        // const color = chroma(data.color);
        return {
          ...styles,
          backgroundColor: isFocused ? GLOBAL_COLOR : "white",
          color: isFocused ? "white" : "gray",
          cursor: "pointer",
          fontSize: valueFontSize
        };
      },
      control: (base, state) => ({
        ...base,
        boxShadow: "none",
        borderColor: "red",
        fontSize: optionFontSize,
        height: "1em",
        '&:hover': { borderColor: 'gray' }, // border style on hover
        border: '1px solid lightgray', // default border color

      })
    })

};

