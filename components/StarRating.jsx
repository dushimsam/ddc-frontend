import React, {useState} from "react";

const StarRating = ({setRating, rating}) => {

    const [state, setState] = useState({
        stars: [1, 2, 3, 4, 5],
        rating: rating,
        hovered: 0,
        selectedIcon: "★",
        deselectedIcon: "☆"
    })


    // useEffect(() => {
    //
    // }, [])

    const changeRating = (newRating) => {
        setState({
            ...state,
            rating: newRating
        });
        setRating(newRating)
    }

    const hoverRating = (rating) => {
        setState({
            ...state,
            hovered: rating
        });
    }


    return (
        <div>
            <p className={"text-dark font-weight-bold mt-3"}>How do you like our service ?</p>
            <div className="rating" style={{fontSize: '3em', color: "#f39c12"}}>

                {state.stars?.map(star => {
                    return (
                        <span
                            style={{cursor: 'pointer'}}
                            onClick={() => {
                                changeRating(star);
                            }}
                            onMouseEnter={() => {
                                hoverRating(star);
                            }}
                            onMouseLeave={() => {
                                hoverRating(0);
                            }}
                        >
                                {state.rating < star ?
                                    state.hovered < star ? state.deselectedIcon : state.selectedIcon
                                    :
                                    state.selectedIcon
                                }
                            </span>
                    );
                })}

            </div>
        </div>
    );
}

export default StarRating