import React, { useState } from "react";
import { useRouter } from "next/router";
import Icon from "react-icons-kit";
import { grid, rotateCcw, settings, lock } from "react-icons-kit/feather";
import { GeneralImage } from "../image";
import Logo from "../../public/assets/logowhite.png";

export const Sidebar = (props) => {
  const router = useRouter();
  let path = router.pathname;
  const [isLoading, setLoading] = useState(false);

  // Logout
  const doLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      router.push("/");
    }, 2000);
  };

  return (
    <div className="account-sidebar-container shadow">
      <div className="menu-items">
        <div
          className="text-center"
          onClick={() => router.push("/")}
          style={{ cursor: "pointer" }}
        >
          <GeneralImage src={Logo} alt="..." x={150} y={65} />
        </div>

        {/* Dashboard */}
        <button
          type="button"
          className={path === "/profile" ? "btn active" : "btn"}
          onClick={() => router.push("/profile")}
        >
          <Icon icon={grid} size={16} />
          <span className="ms-2">Dashboard</span>
        </button>

        {/* My Purchases */}
        <button
          type="button"
          className={
            router.pathname == "/profile/my-purchases" ? "btn active" : "btn"
          }
          onClick={() => router.push("/profile/my-purchases")}
          disabled={props.storeWarning}
        >
          <Icon icon={rotateCcw} size={16} />
          <span className="ms-2">My Puchases</span>
        </button>

        {/* Settings */}
        <button
          type="button"
          className={
            router.pathname == "/profile/settings" ? "btn active" : "btn"
          }
          onClick={() => router.push("/profile/settings")}
        >
          <Icon icon={settings} size={16} />
          <span className="ms-2">Settings</span>
        </button>

        {/* Logout */}
        <button
          type="button"
          className="btn"
          onClick={doLogout}
          disabled={isLoading}
        >
          <Icon icon={lock} size={16} />
          <span className="ms-2">
            {isLoading ? "logging out..." : "logout"}
          </span>
        </button>
      </div>
    </div>
  );
};
