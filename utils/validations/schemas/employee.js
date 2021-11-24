import * as Yup from "yup";

export const employeeSchema = Yup.object({
    firstName: Yup.string().min(3).max(100).required().label("First name"),
    lastName: Yup.string().min(3).max(100).required().label("Last name"),
    username: Yup.string().min(3).max(20).required().label("Username"),
    email: Yup.string().email().min(3).max(100).required().label("Email"),
    phone: Yup.string().min(10).max(13).required().label("Phone"),
    category: Yup.string().min(5).max(100).required().label("Category"),
    password: Yup.string().min(8).max(20).required().label("Password"),
    gender: Yup.string().min(4).required().label("Gender"),
    employeeCategory: Yup.string().min(10).required().label("Employee category"),
    nationalId: Yup.string().length(16).required().label("National ID"),
});