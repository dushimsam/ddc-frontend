export const getDiffOfTime = (date1, date2) => {
    const diffTime = Math.ceil(new Date(date1) - date2);
    return {time: diffTime, days: Math.ceil(diffTime / (1000 * 60 * 60 * 24))};
}

export const handle_set_availability = (setAvailabilityDetails, product) => {
    if (product.availability.exists) {
        const diffDays = getDiffOfTime(product.availability.object.deadline, new Date()).days;
        const diffTime = getDiffOfTime(product.availability.object.deadline, new Date()).time;

        setAvailabilityDetails({
            available: false,
            nbr_days: diffDays,
            visible: true,
            message: diffTime < 0 ? "THE SPARE PART IS NOT AVAILABLE NOW." : `SORRY THE SPARE PART WILL BE AVAILABLE IN  ${diffDays} DAYS FROM TODAY.`
        });
    } else {
        setAvailabilityDetails({
            available: false,
            nbr_days: 0,
            visible: true,
            message: "THE SPARE PART IS NOT AVAILABLE NOW."
        });
    }
}

