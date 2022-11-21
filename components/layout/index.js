import Head from "next/head";
import { NavbarBase } from "../navbar/index";
import { NavbarBaseTab, TopBar, MegaMenu } from "../navbar/navbar";
import { Footer } from "../footer";

export const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>{props ? props.title : null} | Fabign</title>
      </Head>
      <NavbarBase />

      <div>{props.children}</div>
      <Footer />
    </div>
  );
};

export const Layout2 = (props) => {
  return (
    <div className="layout-section">
      <Head>
        <title>{props ? props.title : null} | Fabign</title>
        {/* <link rel="manifest" href="../../public/manifest.json" /> */}
      </Head>
      {/* <TopBar /> */}
      <NavbarBaseTab />
      <MegaMenu />

      <main>{props.children}</main>
      <Footer />
    </div>
  );
};
