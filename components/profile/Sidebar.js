import React, { useState } from "react";
import { useRouter } from "next/router";
import Icon from "react-icons-kit";
import { grid, rotateCcw, settings, lock } from "react-icons-kit/feather";
import { ic_lightbulb } from "react-icons-kit/md";
import { GeneralImage } from "../image";
import Logo from "../../public/assets/logowhite.png";
import { clipboard } from "react-icons-kit/feather";
import { ic_groups } from "react-icons-kit/md";
import { ic_person } from "react-icons-kit/md";
import { ic_payment } from "react-icons-kit/md";

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
      localStorage.removeItem("storeId");
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

        {/* Sotre */}
        <button
          type="button"
          className={path === "/profile/store" ? "btn active" : "btn"}
          onClick={() => router.push("/profile/store")}
          disabled={props.storeWarning}
        >
          <Icon icon={clipboard} size={16} />
          <span className="ms-2">Store</span>
        </button>

        {/* Campaign */}
        <button
          type="button"
          className={path === "/profile/campaign" ? "btn active" : "btn"}
          onClick={() => router.push("/profile/campaign")}
          disabled={props.storeWarning}
        >
          <Icon icon={ic_lightbulb} size={16} />
          <span className="ms-2">Campaign</span>
        </button>

        {/* Analytics */}
        <button
          type="button"
          className={path === "/profile/analytics" ? "btn active" : "btn"}
          onClick={() => router.push("/profile/analytics")}
          disabled={props.storeWarning}
        >
          <Icon icon={ic_groups} size={16} />
          <span className="ms-2">Analytics</span>
        </button>

        {/* Statistics */}
        <button
          type="button"
          className={path === "/profile/statistics" ? "btn active" : "btn"}
          onClick={() => router.push("/profile/statistics")}
          disabled={props.storeWarning}
        >
          <Icon icon={ic_person} size={16} />
          <span className="ms-2">Statistics</span>
        </button>

        {/* Payout */}
        <button
          type="button"
          className={path === "/profile/payout" ? "btn active" : "btn"}
          onClick={() => router.push("/profile/payout")}
          disabled={props.storeWarning}
        >
          <Icon icon={ic_payment} size={16} />
          <span className="ms-2">Payout</span>
        </button>

        {/* Promotions */}
        <button
          type="button"
          className={path === "/profile/promotions" ? "btn active" : "btn"}
          onClick={() => router.push("/profile/promotions")}
          disabled={props.storeWarning}
        >
          <Icon icon={ic_payment} size={16} />
          <span className="ms-2">Promotions</span>
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
