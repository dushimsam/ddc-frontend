import * as Yup from "yup";

export const PasswordChangeSchema = Yup.object({
    current_password: Yup.string().min(3).required().label("Current password"),
    new_password: Yup.string().min(4).required().label("New password"),
    confirm: Yup.string().oneOf([Yup.ref("new_password")], "Passwords must match").required().label("Confirmation")
})