import "../styles/app.scss";
import NextNprogress from "nextjs-progressbar";
import BackToTop from "../components/backToTop/index";
import { Icon } from "react-icons-kit";
import { shoppingCart } from "react-icons-kit/feather";
import { getDatabaseCart } from "../utils/utilities";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
    setCount(ecommercedata);
  });

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
