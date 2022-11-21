import "../styles/app.scss";
import NextNprogress from "nextjs-progressbar";
import BackToTop from "../components/backToTop/index";
import { Icon } from "react-icons-kit";
import { shoppingCart } from "react-icons-kit/feather";
import { getDatabaseCart, getODPDatabaseCart } from "../utils/utilities";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  const [count, setCount] = useState();
  const router = useRouter();
  // Handle cart list
  const handleCartList = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/cart");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    const ecommercedata = Object.keys(getDatabaseCart()).length;
    const odpdata = Object.keys(getODPDatabaseCart()).length;
    setCount(ecommercedata + odpdata);
  });

  // useEffect(() => {
  //   const newfunc = async () => {
  //     const res = await axios.get("https://api.ipify.org/?format=json");
  //     if (res.data && res.data.ip) {
  //       const ip = res.data.ip;
  //       console.log("ip");
  //       console.log(ip);
  //       const userdel = await axios.get(
  //         `https://imageprocessor.efgtailor.com/getDetails/${ip}`
  //       );
  //     }
  //   };
  //   newfunc();
  // });

  return (
    <>
      <NextNprogress
        color="#F6990E"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        options={{ showSpinner: false }}
      />
      {/* Cart float button */}
      <button
        type="button"
        className="btn shadow shopping-cart-float-btn d-none d-lg-block"
        onClick={handleCartList}
      >
        <Icon icon={shoppingCart} size={28} />
        <p>{count}</p>
      </button>
      <Component {...pageProps} />
      <BackToTop />
    </>
  );
}

export default MyApp;
