import React from "react";
import Head from "next/head";

import styles from "../../styles/components/aboutus.module.css";
import NavBar from "../../components/navbar";
import Footer from "../../components/Footer";
import { app_config } from "../../utils/constants";
import formStyles from "../../styles/pages/forms.module.css";
import * as Validator from "validatorjs";
import { isEmpty } from "../../utils/functions";
import Alert from "../../components/alert";
import { useRouter } from "next/router";
import globalStyles from "../../styles/global-colors.module.css";
import {
  PlayIcon,
  OurStrengthIcon,
  OurTargetIcon,
  OurVisionIcon,
} from "../../icons";

const AboutUs = () => {
  const validations = {
    message: "required|min:5",
    fullNames: "required|min:3",
    email: "required|email",
  };

  const [form, setForm] = React.useState({
    message: "",
    fullNames: "",
    province: "",
    email: "",
    district: "",
    subject: "",
  });

  const [errors, setErrors] = React.useState({
    message: null,
    fullNames: null,
    province: null,
    email: null,
    district: null,
    subject: null,
  });

  const [loading, setLoading] = React.useState(false);

  const [alertData, setAlertData] = React.useState({
    alert: false,
    message: "",
    class: "",
  });

  const router = useRouter();
  const send = async () => {
    event.preventDefault();
    setAlertData({ alert: false, message: "", class: "" });
    form.extra = {};
    router.push("/");
  };

  const handleFormChange = (prop) => async (event) => {
    setForm({ ...form, [prop]: event.target.value });
    const validator = new Validator(form, validations);
    if (validator.fails(null))
      setErrors({ ...errors, [prop]: validator.errors.get(prop) });
    else setErrors({ ...errors, [prop]: null });
  };

  return (
    <React.Fragment>
      <NavBar />
      <Head>
        <title>About Us | {app_config.APP_NAME_LOWER}</title>
      </Head>
      <div className="contianer-fluid d-flex flex-column">
        <div className="container">
          <h4 className="ml-4 mt-5">
            About <span style={{ color: "#F3A35D" }}>DDC Cos</span>metic
          </h4>
          <p className="ml-4">
            DDC Cosmetics is a company operating in Rwanda which sells all
            cosmetic products you may need in your daily life. DDC only picks
            products with immediate effect: „THE WOW EFFECT “, combining natural
            and luxurious ingredients with aroma packaged into unique designs.
          </p>
        </div>
        <div className="row container row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 justify-content-center mx-auto">
          <div className={"p-3 d-flex flex-row " + styles.aboutUs_desc}>
            <PlayIcon height={50} width={50} />
            <div className={"ml-3 "}>
              <h6>Watch a description of our story and activity</h6>
              <p>
                Watch this video to get more personal stories and activities of
                DDC Cosmetics Beauty
              </p>
            </div>
          </div>
          <div className={"p-3 d-flex flex-row " + styles.aboutUs_desc}>
            <OurTargetIcon height={50} width={50} />
            <div className="ml-3">
              <h6>Our Target</h6>
              <p>
                DDC Cosmetics aims at making everyone who wants beauty products
                access them quickly and effeciently
              </p>
            </div>
          </div>
          <div className={"p-3 d-flex flex-row " + styles.aboutUs_desc}>
            <OurStrengthIcon height={50} width={50} />
            <div className="ml-3">
              <h6>Our Strength</h6>
              <p>
                We're a very serious company to the extent of that we work 24/7
                hours in order to supply you with high quality best products
              </p>
            </div>
          </div>
          <div className={"p-3 d-flex flex-row " + styles.aboutUs_desc}>
            <OurVisionIcon height={60} width={60} />
            <div className="ml-3">
              <h6>Our Vision</h6>
              <p>
                Our Vision is to satisfy everyone who will use our this system
                get all the unique product pallet for the whole body combined
                with exclusive design and presented using innovative packaging
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <hr />
        <h4 className=" mb-5">Drop Us a line</h4>
        <div className={"w-100 card p-3 " + styles.form}>
          <h6 className={"text-center " + styles.goldenText}>Write to Us</h6>
          <p className="text-center pt-2">
            Provide feedback or suggestion to this online store.
          </p>
          <div className={"mb-5"}>
            {alertData.alert ? (
              <Alert
                message={alertData.message}
                setAlert={setAlertData}
                className={alertData.class}
              />
            ) : (
              <div />
            )}
          </div>
          <form autoComplete={"off"} className={"container-fluid"}>
            <div className="form-group row">
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label htmlFor="first-name" className={styles.inputLabels}>
                  Full names
                </label>
                <input
                  type="text"
                  id={"full-name"}
                  onChange={handleFormChange("fullNames")}
                  value={form.fullNames}
                  className={
                    !isEmpty(errors.fullNames)
                      ? "form-control form-control-sm  is-invalid"
                      : !form.fullNames
                      ? "form-control form-control-sm "
                      : "form-control form-control-sm  is-valid"
                  }
                  placeholder="Type here..."
                />
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label htmlFor="province" className={formStyles.inputLabels}>
                  Province
                </label>
                <select
                  name="province"
                  id="province"
                  className={
                    !isEmpty(errors.province)
                      ? "form-control form-control-sm  is-invalid"
                      : !form.province
                      ? "form-control form-control-sm "
                      : "form-control form-control-sm is-valid"
                  }
                  onChange={handleFormChange("province")}
                >
                  <option value={""}>Choose province</option>
                  <option value={"kigali"}>Kigali city</option>
                  <option value={"south"}>Southern province</option>
                  <option value={"east"}>Eastern province</option>
                  <option value={"west"}>Western province</option>
                  <option value={"north"}>Northern province</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label
                  htmlFor="email"
                  id="email"
                  className={formStyles.inputLabels}
                >
                  Your Email
                </label>
                <input
                  type="text"
                  id={"email"}
                  onChange={handleFormChange("email")}
                  value={form.email}
                  placeholder="Type here..."
                  className={
                    !isEmpty(errors.email)
                      ? "form-control form-control-sm is-invalid"
                      : !form.email
                      ? "form-control form-control-sm "
                      : "form-control form-control-sm is-valid"
                  }
                />
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label
                  htmlFor="district"
                  id="district"
                  className={formStyles.inputLabels}
                >
                  District
                </label>
                <select
                  name="district"
                  id="district"
                  className={
                    !isEmpty(errors.district)
                      ? "form-control form-control-sm is-invalid"
                      : !form.district
                      ? "form-control form-control-sm "
                      : "form-control form-control-sm is-valid"
                  }
                  onChange={handleFormChange("district")}
                >
                  <option value={""}>Choose district</option>
                  <option value={"gasabo"}>Gasabo</option>
                  <option value={"kicukiro"}>Kicukiro</option>
                  <option value={"nyarugenge"}>Nyarugenge</option>
                  <option value={"nyagatare"}>Nyagatare</option>
                  <option value={"gatsibo"}>Gatsibo</option>
                  <option value={"rwamagana"}>Rwamagana</option>
                  <option value={"kayonza"}>Kayonza</option>
                  <option value={"ngoma"}>Ngoma</option>
                  <option value={"kirehe"}>Kirehe</option>
                  <option value={"musanze"}>Musanze</option>
                  <option value={"gicumbi"}>Gicumbi</option>
                  <option value={"gakenke"}>Gakenke</option>
                  <option value={"rulindo"}>Rulindo</option>
                  <option value={"burera"}>Burera</option>
                  <option value={"nyabihu"}>Nyabihu</option>
                  <option value={"rubavu"}>Rubavu</option>
                  <option value={"nyamasheke"}>Nyamasheke</option>
                  <option value={"rusizi"}>Rusizi</option>
                  <option value={"ngororero"}>Ngororero</option>
                  <option value={"rutsiro"}>Rutsiro</option>
                  <option value={"karongi"}>Karongi</option>
                  <option value={"huye"}>Huye</option>
                  <option value={"muhanga"}>Muhanga</option>
                  <option value={"kamonyi"}>Kamonyi</option>
                  <option value={"nyamagabe"}>Nyamagabe</option>
                  <option value={"nyaruguru"}>Nyaruguru</option>
                  <option value={"gisagara"}>Gisagara</option>
                  <option value={"ruhango"}>Ruhango</option>
                  <option value={"nyaruguru"}>Nyaruguru</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label htmlFor="subject" className={formStyles.inputLabels}>
                  Subject
                </label>
                <input
                  type="text"
                  id={"subject"}
                  onChange={handleFormChange("subject")}
                  value={form.subject}
                  className={
                    !isEmpty(errors.subject)
                      ? "form-control form-control-sm is-invalid"
                      : !form.subject
                      ? "form-control form-control-sm "
                      : "form-control form-control-sm is-valid"
                  }
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <label
                  htmlFor="message"
                  id="message"
                  className={formStyles.inputLabels}
                >
                  Message
                </label>
                <textarea
                  placeholder={"Type here..."}
                  rows={5}
                  onChange={handleFormChange("message")}
                  id={"message"}
                  className={
                    !isEmpty(errors.message)
                      ? "form-control form-control-sm is-invalid"
                      : !form.message
                      ? "form-control form-control-sm "
                      : "form-control form-control-sm is-valid"
                  }
                  value={form.message}
                ></textarea>
              </div>
            </div>

            <div className="form-group row d-flex justify-content-around">
              <div className="checkbox">
                <input type={"checkbox"} id="subscribe" className="mr-2" />
                <label htmlFor="subscribe" id="subscribe">
                  <small>Also subscribe to our Newsletter</small>
                </label>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <button
                  type={"submit"}
                  className={
                    formStyles.submitBtn +
                    " btn text-white w-100 " +
                    styles.goldenBg
                  }
                  disabled={
                    !Object.values(errors).some((o) => o === null) ||
                    Object.values(form).some((o) => o === "") ||
                    loading
                  }
                  onClick={send}
                >
                  {loading ? (
                    <img
                      src={"/img/loader.gif"}
                      alt={"Loading"}
                      className={"loader"}
                    />
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AboutUs;
