import {app_config} from "../../utils/constants";

export default function Footer() {
    return (
        <div className="text-center text-secondary py-1 border-top">
            <div className="bg-app-red border-top border-light pb-1 pt-1">
                <p className="text-center font-weight-light text-dark mb-0">
                    &copy; {new Date().getFullYear()}{" " + app_config.APP_NAME}
                </p>
                <div className="text-center">
          <span className="font-weight-light font-italic mr-1">
            powered by
          </span>
                    <span className="font-weight-bold text-dark  font-italic mb-1">
            <a href={"https://grapes.vercel.app/"} target="_blank" rel="noopener noreferrer">Grapes</a>
          </span>
                </div>
            </div>
        </div>
    )
}