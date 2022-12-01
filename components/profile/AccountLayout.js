import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { ProfileNavbar } from "./ProfileNavbar";
import { Sidebar } from "./Sidebar";

// eslint-disable-next-line react/display-name
export const AccountLayout = forwardRef((props, ref) => {
  const profileNavbarRef = useRef(null);

  useImperativeHandle(ref, () => ({
    dataUpdate() {
      if (profileNavbarRef.current) {
        profileNavbarRef.current.dataUpdate();
      }
    },
  }));

  return (
    <div className="account-layout-container">
      <div className="d-flex">
        <div className="layout-sidebar-container d-none d-lg-block">
          <Sidebar />
        </div>
        <div className="flex-fill layout-container flex-shrink-1">
          <ProfileNavbar
            ref={profileNavbarRef}
            title={props.title ? props.title : null}
          />
          {props.children}
        </div>
      </div>
    </div>
  );
});
