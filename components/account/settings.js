import React, { useEffect, useRef, useState } from "react";
import jwt from "jwt-decode";
import AuthService from "../../services/auth/auth.service";
import UserService from "../../services/users/user.service";
import { setAuthUser } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { PasswordChangeSchema } from "../../utils/validations/schemas/passwordChange";
import {
  replaceCharacter,
  updateJavaScriptObject,
} from "../../utils/functions";
import { notifyError, notifySuccess } from "../../utils/alerts";
import { Form, Formik } from "formik";
import TextField from "../forms/TextField";
import globalStyles from "../../styles/global-colors.module.css";
import EmployeesDataService from "../../services/employees/employees";
import filesService from "../../services/files-service";
import styles from "../../styles/components/deleteConfirm.module.css";
import LoginToConfirmComponent from "../reusable/login-to-confim";
import { hide_modal, show_modal } from "../../utils/modal-funs";

const ConfirmModal = ({ updateUser, system_user }) => {
  const handleCancel = () => {
    hide_modal("#updateConfirmationModal");
  };
  return (
    <div id="updateConfirmationModal" className={"modal fade"}>
      <div className={"modal-dialog modal-dialog-centered"}>
        <div className={"modal-content "}>
          <div className={"modal-body "}>
            <LoginToConfirmComponent
              SYSTEM_USER={system_user}
              continueAction={updateUser}
              MESSAGE={"LOGIN TO CONFIRM THE AUTHORITY OF THIS ACTION"}
              handleCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const UpdatePassword = () => {
  const user = useSelector((state) => state.authUser);
  const [loading, setLoading] = useState(false);

  const changePassword = async (values) => {
    setLoading(true);
    try {
      const { current_password, new_password } = values;
      await UserService.changePassword(user.id, {
        current_password,
        new_password,
      });
      notifySuccess("Successfully updated password");
    } catch (e) {
      notifyError(
        e.response
          ? e.response.data.message
          : e.message || "Error occurred. Try again latter."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h5 className="font-weight-bold">Change password</h5>
      <Formik
        initialValues={{
          current_password: "",
          new_password: "",
          confirm: "",
        }}
        onSubmit={changePassword}
        validationSchema={PasswordChangeSchema}
      >
        {(formik) => (
          <Form>
            <div className="row row-cols-1 row-cols-lg-3">
              <div className="col">
                <TextField
                  label="Current password"
                  name="current_password"
                  type="password"
                />
              </div>
              <div className="col">
                <TextField
                  label="New password"
                  name="new_password"
                  type="password"
                />
              </div>
              <div className="col">
                <TextField
                  label="Confirm password"
                  name="confirm"
                  type="password"
                />
              </div>
            </div>
            <div className="mt-5">
              <button
                className={
                  "btn px-4 mr-5 text-white pr- " + globalStyles.globalBackColor
                }
                type="submit"
              >
                {" "}
                {loading ? (
                  <img
                    src={"/img/loader.gif"}
                    alt={"Loading"}
                    className={"loader"}
                  />
                ) : (
                  "Update password"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const BasicInformation = () => {
  const imageContainer = useRef(null);
  const [passwordValues, setPasswordValues] = useState({
    current_password: "",
    new_password: "",
    confirm: "",
  });

  let defaultUser = jwt(AuthService.getDecToken());
  let user = jwt(AuthService.getDecToken());
  const [userDetails, setUserDetails] = useState({});

  const [values, setValues] = useState({
    email: "",
    username: "",
    firstName: "",
    category: "",
    lastName: "",
    phone: "",
    gender: "",
  });
  const [nationalId, setNationalId] = useState(null);

  const [defaultValues, setDefaultValues] = useState({
    email: "",
    username: "",
    firstName: "",
    category: "",
    lastName: "",
    phone: "",
    gender: "",
  });
  const handleChange = (prop) => (event) => {
    setUpdateState(updateState === "IMAGE" ? "BOTH" : "DETAILS");
    setValues({ ...values, [prop]: event.target.value });
  };

  const handlePasswordChange = (prop) => (event) => {
    setPasswordValues({ ...passwordValues, [prop]: event.target.value });
  };

  const refresh = () => {
    UserService.get(defaultUser.id)
      .then((res) => {
        user = updateJavaScriptObject(user, res.data);
        user.fullNames = res.data.firstName + " " + res.data.lastName;
        dispatch(setAuthUser(user));

        setValues({
          email: res.data.email,
          username: res.data.username,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          category: res.data.category._id,
          phone: res.data.phone,
          gender: res.data.gender,
        });
        setDefaultValues({
          email: res.data.email,
          username: res.data.username,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          category: res.data.category._id,
          phone: res.data.phone,
          gender: res.data.gender,
        });
        setUserDetails(res.data);

        if (user.category.name === "EMPLOYEE") {
          EmployeesDataService.getByUserId(user.id)
            .then((res) => {
              setNationalId(res.data.nationalId);
            })
            .catch((e) => console.log(e));
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    refresh();
  }, []);

  const [alert, setAlert] = useState({
    message: "",
    class: "",
    status: "",
    show: false,
  });
  const [updateState, setUpdateState] = useState(null);

  const dispatch = useDispatch();

  function updateUser() {
    UserService.update(userDetails._id, values)
      .then((res) => {
        setDefaultValues(values);
        notifySuccess("Profile is updated Successfully");
        refresh();
      })
      .catch((e) => {
        notifyError(
          e.response
            ? e.response.data.message
            : e.message || "Error occurred. Try again latter."
        );
      })
      .finally(() => {
        setLoading({ load: false, status: "" });
        setUpdateState(null);
      });
  }

  const updateRecords = async () => {
    if (!updateState) {
      notifyError("No profile update required");
      setLoading({ load: false, status: "" });
    } else {
      if (updateState === "BOTH" || updateState === "IMAGE") {
        let formData = new FormData();
        formData.append("profile", imageContainer.current.files[0]);
        setUpdateState(
          updateState === "IMAGE" ? setUpdateState(null) : updateState
        );
        try {
          await UserService.uploadImage(userDetails._id, formData);
          updateState === "IMAGE"
            ? notifySuccess("Profile updated Successfully")
            : "";
          setLoading({ load: false, status: "" });
          refresh();
        } catch (e) {
          notifyError(
            e.response
              ? e.response.data.message
              : e.message || "Error occurred. Try again latter."
          );
          setLoading({ load: false, status: "" });
        }
      }

      if (updateState === "BOTH" || updateState === "DETAILS") {
        if (
          userDetails.username !== values.username ||
          userDetails.email !== values.email
        ) {
          show_modal("#updateConfirmationModal");
          setLoading({ load: false, status: "" });
        } else {
          updateUser();
        }
      }
    }
  };

  const uploadAnImage = (event) => {
    event.preventDefault();
    document.getElementById("imageControl").click();
  };

  const handleImageChange = () => {
    setUpdateState(updateState === "DETAILS" ? "BOTH" : "IMAGE");
    let file = imageContainer.current.files[0];

    if (file) {
      if (file) {
        let reader = new FileReader();
        reader.onload = function (evt) {
          document
            .getElementById("imageContainer")
            .setAttribute("src", evt.target.result);
        };
        reader.onerror = function (evt) {
          console.log(evt);
          document.getElementById("holla").innerText = "error reading file";
        };

        reader.readAsDataURL(imageContainer.current.files[0]);
      }
    }
  };

  const [loading, setLoading] = useState({ load: false, status: "" });

  const removeAnImage = () => {
    filesService
      .delete(
        replaceCharacter(userDetails.profile, "%2F", "/"),
        "PROFILE",
        userDetails._id
      )
      .then((res) => {
        notifySuccess("File removed successfully");
        refresh();
        setUserDetails({
          ...userDetails,
          imageUrl: "https://apis.koreaautop.com/api/files/load/",
          profile: "",
        });
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <h5>Basic information</h5>
      <div className="row mt-3">
        <div className="col-sm-6 col-md-4 mt-2">
          <div className="form-group">
            <label htmlFor="your-name">First name:</label>
            <input
              className="form-control"
              id="your-name"
              value={values.firstName}
              onChange={handleChange("firstName")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              className="form-control"
              id="username"
              value={values.username}
              onChange={handleChange("username")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              className="form-control"
              id="phone"
              value={values.phone}
              onChange={handleChange("phone")}
            />
          </div>
          {user.category.name === "EMPLOYEE" ? (
            <div className="form-group">
              <label htmlFor="national_id">National Id:</label>
              <input
                className="form-control"
                id="national_id"
                value={nationalId}
              />
            </div>
          ) : null}
        </div>
        <div className="col-sm-6 col-md-6 mt-2 ">
          <div className="p-0 col-md-9 mx-auto">
            <div className="form-group">
              <label htmlFor="lastname">Last name:</label>
              <input
                className="form-control"
                id="lastname"
                value={values.lastName}
                onChange={handleChange("lastName")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                className="form-control"
                id="email"
                value={values.email}
                onChange={handleChange("email")}
              />
            </div>

            <div className="form-group col-5">
              <label htmlFor="gender">Gender:</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  checked={values.gender !== "" && values.gender === "MALE"}
                  onClick={handleChange("gender")}
                  value="MALE"
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios2"
                  onClick={handleChange("gender")}
                  checked={values.gender !== "" && values.gender === "FEMALE"}
                  value="FEMALE"
                />
                <label className="form-check-label" htmlFor="exampleRadios2">
                  Female{" "}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="d-block d-md-block col-sm-6 col-md-2 mt-2 text-center">
          <div id="holla" />
          <img
            id={"imageContainer"}
            className="nav-bar-avatar rounded-circle shadow"
            src={userDetails?.imageUrl}
            height={150}
            width={150}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://ui-avatars.com/api/?name=" + userDetails?.username;
            }}
            alt={userDetails?.username}
            title={userDetails?.username}
          />
          <div className="text-center mt-3">
            <input
              type="file"
              id="imageControl"
              hidden
              ref={imageContainer}
              onChange={handleImageChange}
            />
            <a href="#" className="text-primary" onClick={uploadAnImage}>
              Change
            </a>
          </div>
          {userDetails?.profile !== "" ? (
            <div className="text-center mt-3">
              <a href="#" className="text-danger" onClick={removeAnImage}>
                Remove
              </a>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="mt-4">
        <button
          className={
            "btn bg-app-red text-white " + globalStyles.globalBackColor
          }
          onClick={() => {
            setLoading({ load: true, status: "profile" });
            updateRecords().then();
          }}
        >
          {loading.load && loading.status === "profile" ? (
            <img src={"/img/loader.gif"} alt={"Loading"} className={"loader"} />
          ) : (
            "Update profile"
          )}
        </button>
      </div>
      {
        <ConfirmModal
          system_user={userDetails?.category?.name}
          updateUser={updateUser}
        />
      }
    </div>
  );
};

const ProfileSettings = () => {
  return (
    <div>
      <div className="border rounded">
        <div className="bg-light px-4 py-3">
          <h5 className={"font-weight-bold"}>Profile settings</h5>
        </div>
        <div className="bg-white px-4 py-4">
          <BasicInformation />
          <hr />
          <UpdatePassword />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
