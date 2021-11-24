import React from "react";
export default function ToggleButton({onChangeSelect,on=true,text='on'}){
     return(
            <div>
                <button onClick={onChangeSelect}>on</button>
                {text}
            </div>
        )
}