import * as Yup from "yup";

export const createBookingSchema = Yup.object({
    selectedCountry: Yup.string().min(2).max(100).required().label("Select Country"),
    delivery_port: Yup.string().min(3).max(100).required().label("Near by Port"),
    names: Yup.string().min(3).max(20).required().label("names"),
    email: Yup.string().email().min(3).max(100).required().label("Email"),
    phone: Yup.number().min(10).max(13).required().label("Phone"),
    postal_code: Yup.string().min(5).max(100).required().label("Postal Code (Zip)"),
    customer_country: Yup.string().required().label("Your Country")
});