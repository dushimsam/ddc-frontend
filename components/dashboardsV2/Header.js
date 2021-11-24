import Link from "next/link";
import React from "react";
import NotificationContext from "../Notification";
import { app_config } from "../../utils/constants";
import Account from "./SessionAccount";

export default function Header() {
  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage:
          "linear-gradient(to left, #400101F0, #400101FA),url('https://i.pinimg.com/originals/41/5f/12/415f128daaa416ff3a35826932211ae5.jpg')",
        height: 80,
      }}
      className="text-white sticky-top"
    >
      <div className="d-flex px-2 px-md-5 justify-content-between align-items-center h-100">
        <Link href="/" passHref>
          <div>
            <h4 className="font-weight-bolder cursor-pointer">
              {app_config.APP_NAME}
            </h4>
          </div>
        </Link>
        <div className="d-flex align-items-center">
          <div className="notifications cursor-pointer">
            <NotificationContext on_nav_bar />
          </div>
          <div className="pl-4 cursor-pointer">
            <Account />
          </div>
        </div>
      </div>
    </div>
  );
}
