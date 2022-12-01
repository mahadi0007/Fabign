import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "react-icons-kit";
import { useForm } from "react-hook-form";
import { ic_place } from "react-icons-kit/md";
import { phone, mail, send } from "react-icons-kit/feather";
import {
  facebook,
  twitter,
  youtubePlay,
  instagram,
  linkedin,
  whatsapp,
} from "react-icons-kit/fa";
import { loading } from "react-icons-kit/ikons";
// import { Subscribe } from '../../pages/api/index'
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import Image from "next/image";
import Dhl from "../../public/assets/footerlogos/dhl.png";
import Fedex from "../../public/assets/footerlogos/fedex.png";
import Pathao from "../../public/assets/footerlogos/pathao.png";
import Sundarban from "../../public/assets/footerlogos/sundarban.png";

toast.configure({
  autoClose: 2000,
  transition: Slide,
  position: "top-left",
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

export const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // const response = await Subscribe(data)
      // if (response.status === 201) toast.success(response.data.message)
      setLoading(false);
    } catch (error) {
      if (error) {
        setLoading(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Network error");
        }
      }
    }
  };

  return (
    <div className="custom-footer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 col-xl-9">
            <div className="row">
              {/* Contact information */}
              <div className="col-lg-4 mb-4 mb-lg-0">
                <h6 style={{ marginBottom: "8px" }}>Customer Contact</h6>
                <p style={{ marginBottom: "0" }}>
                  <a href="tel:+8809612-000123">
                    <Icon icon={phone} size={18} className="me-2" />
                    +8809612-000123
                  </a>
                </p>
                <p style={{ marginBottom: "0" }}>
                  <a href="tel:+8809678-114545">
                    <Icon icon={phone} size={18} className="me-2" />
                    +8809678-114545
                  </a>
                </p>
                <p style={{ marginBottom: "20px" }}>
                  <a href="mailto:support@efgfashion.com">
                    <Icon icon={mail} size={18} className="me-2" />
                    support@efgfashion.com
                  </a>
                </p>
                <p style={{ marginBottom: "15px" }}>
                  <Icon icon={ic_place} size={18} className="me-2" />
                  <strong>Head Office:</strong> Navana Oval, 7th floor, Plot-5,
                  Sonargaon Janapath road, Sector-7, Uttara, Dhaka
                </p>
                <p style={{ marginBottom: "15px" }}>
                  <Icon icon={ic_place} size={18} className="me-2" />
                  <strong>Factory Address:</strong> South Kolma, 02/03, Dairy
                  Farm-1341, Savar, Dhaka
                </p>
              </div>
              {/* Policy & Info */}
              <div className="col-lg-4 mb-4 mb-lg-0">
                <h6>Policy & Info</h6>
                <Link href={`/about-us`}>About Us</Link>
                <Link href={`/privacy-policy`}>Privacy Policy</Link>
                <Link href={`/cookie-policy`}>Cookie Policy</Link>
                <Link href={`/why-shop-on-efgfashion`}>Why Shop on Fabign</Link>
                <Link href={`/terms-and-conditions`}>Terms Conditions</Link>
                <Link href={`/faq`}>FAQs</Link>
                <Link href="#">Seller Login</Link>
                <p className="mb-0">e-CAB Member ID: 1608</p>
                <p className="mb-0">BIN : 004296225-0101</p>
              </div>

              {/* My account */}
              <div className="col-lg-4 mb-4 mb-lg-0">
                <h6>My Account</h6>
                <Link href="/account/account-details">Account Details</Link>
                <Link href="/account/change-password">Change Password</Link>
                <Link href="/account">Dashboard</Link>
                <Link href="/account/review">My Review</Link>
                <Link href="/account/orders">Orders</Link>
                <Link href="/account/purchased">Purchased Products</Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 col-xl-3">
            {/* Subscribe */}
            <div>
              <h6>Subscribe now</h6>
              <p>
                Love Fabign? Subscribe to our newsletter to get instant update
                when we add a product or start a campaign. You may also get
                coupons.
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex">
                  <div className="flex-fill">
                    <input
                      type="text"
                      name="email"
                      className={
                        errors.email
                          ? "form-control shadow-none error"
                          : "form-control shadow-none"
                      }
                      placeholder="example@gmail.com"
                      ref={register("email", {
                        required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        },
                      })}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn shadow-none"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Icon icon={loading} className="spin" size={18} />
                      ) : (
                        <Icon icon={send} size={22} />
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Social links */}
              <div className="social-links">
                <a
                  href="https://www.facebook.com/efgfashiongarments"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon icon={facebook} size={18} />
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <Icon icon={twitter} size={20} />
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <Icon icon={youtubePlay} size={20} />
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <Icon icon={instagram} size={20} />
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <Icon icon={linkedin} size={20} />
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <Icon icon={whatsapp} size={20} />
                </a>
              </div>

              <div className="d-flex justify-content-start">
                <img
                  src={Dhl}
                  alt="..."
                  className="img-fluid"
                  height={50}
                  width={100}
                />
                <img
                  src={Fedex}
                  alt="..."
                  className="img-fluid"
                  height={50}
                  width={150}
                />
                <img
                  src={Pathao}
                  alt="..."
                  className="img-fluid"
                  height={50}
                  width={150}
                />
                <img
                  src={Sundarban}
                  alt="..."
                  className="img-fluid"
                  height={50}
                  width={120}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container">
                <div className="row">
                    <div className="col-sm-3 d-flex align-content-end">
                        <h3 className="text-white mb-2" style={{ fontSize: 14, display: 'inline', marginTop: 72 }}>Our Other Concern</h3>
                        <a href="#" style={{ display: 'inline' }} target="_blank" rel="noreferrer">
                            <img src="/assets/icons/cv.png" style={{ height: '100px', backgroundColor: '#ffffff', borderRadius: '10px', marginLeft: '35px' }} className="img-fluid" alt="..." />
                        </a>
                    </div>
                </div>
            </div> */}

      {/* Copywrite */}
      <div className="copy-write">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-lg-flex">
                <div className="content">
                  <p>
                    Copyright @ 2020-{new Date().getFullYear()} Fabign Limited.
                    Design & developed by{" "}
                    <span
                      onClick={() => router.push("https://techjb.net/")}
                      className="fw-bold"
                      style={{ cursor: "pointer" }}
                    >
                      Tech Join Bridge.
                    </span>
                  </p>
                </div>
                <div className="ms-auto text-left text-lg-right pt-2">
                  <img
                    src={"https://api.efgtailor.com/uploads/paymentssl.png"}
                    className="img-fluid"
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
