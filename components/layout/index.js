import Head from "next/head";
import { Navbar, TopBar } from "../navbar";
import { Footer } from "../footer";

export const Layout = (props) => {
  return (
    <div className="layout-section">
      <Head>
        <title>{props ? props.title : null} | Fabign</title>
        {/* <link rel="manifest" href="../../public/manifest.json" /> */}
      </Head>
      {/* <TopBar /> */}
      <Navbar />

      <main>{props.children}</main>
      <Footer />
    </div>
  );
};
