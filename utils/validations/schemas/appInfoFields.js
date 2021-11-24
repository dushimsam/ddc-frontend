import * as Yup from "yup";

export const AppInfoFieldsSchema = Yup.object({
    app_name: Yup.string().min(3).max(100).required().label("Application Name"),
    app_email: Yup.string().email().min(3).required().label("Application Email"),
    current_password: Yup.string().min(3).required().label("Current password"),
    new_password: Yup.string().min(8).required().label("New password")
})