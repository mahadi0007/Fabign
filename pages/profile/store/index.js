import Head from "next/head";
import React, { useEffect, useState, useRef } from "react";
import withAuth from "../../../components/withAuth";
import { AccountNavbar } from "../../../components/profile/AccountNavbar";
import { AccountLayout } from "../../../components/profile/AccountLayout";
import { StoreForm } from "../../../components/form/StoreForm";
import Image1 from "../../../public/assets/album/layer1.png";
import Image2 from "../../../public/assets/album/album1.png";
import Image3 from "../../../public/assets/album/layer3.png";
import { Container } from "../../../components/container";
import UserImage from "../../../public/assets/user.jpeg";
import { Toastify } from "../../../components/toastify";
import { Card } from "../../../components/card";
import { Text } from "../../../components/text";
import { PrimaryModal } from "../../../components/modal/PrimaryModal.js";
import { PrimaryButton, SecondaryButton } from "../../../components/button";
import { Requests } from "../../../utils/Http";

const StoreIndex = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Your title");
  const [description, setDescription] = useState("Your description");
  const [storeLogo, setStoreLogo] = useState(UserImage.src);
  const [storeBanner, setStoreBanner] = useState(Image2.src);
  const [fb, setFb] = useState("");
  const [insta, setInsta] = useState("");
  const [website, setWebsite] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [storeState, setStoreState] = useState(false);

  const accountLayoutRef = useRef(null);
  const accountNavbarRef = useRef(null);

  async function fetchData() {
    try {
      const response = await Requests.Store.GetStore();
      if (response.data.message == "Found stores") {
        setStoreState(true);
        localStorage.setItem("storeId", response.data.body._id);
        setTitle(response.data.body.title);
        setDescription(response.data.body.description);
        setStoreLogo(Requests.HostUrl + response.data.body.logo);
        setStoreBanner(Requests.HostUrl + response.data.body.cover);
        setFb(response.data.body.fb);
        setInsta(response.data.body.insta);
        setWebsite(response.data.body.website);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Handle store submit
  const handleStoreSubmit = async (data) => {
    try {
      setLoading(true);
      if (storeState) {
        const response = await Requests.Store.UpdateStore(
          data,
          localStorage.getItem("storeId")
        );
        setLoading(false);
        Toastify.Success("Successfully Updated");
        if (response.data.message == "Successfully Updated") {
          Toastify.Success(response.data.message);
        } else {
          Toastify.Error("Something going wrong.");
        }
      } else {
        const response = await Requests.Store.CreateStore(data);
        console.log(response);
        setLoading(false);
        if (response.data.message == "User already created his store") {
          Toastify.Error(response.data.message);
        } else if (response.data.message == "Store created") {
          setModalShow(true);
          localStorage.setItem("storeId", response.data.body._id);
          setStoreState(true);
          if (accountLayoutRef.current) {
            accountLayoutRef.current.dataUpdate();
          }
          if (accountNavbarRef.current) {
            accountNavbarRef.current.dataUpdate();
          }
        } else {
          Toastify.Error("Something wrong");
        }
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        if (error.response) {
          Toastify.Error(error.response.message);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  const handleTitle = (text) => {
    setTitle(text);
  };

  const handleDescription = (text) => {
    setDescription(text);
  };

  const handleStoreLogo = (imageSource) => {
    setStoreLogo(imageSource);
  };

  const handleStoreBanner = (imageSource) => {
    setStoreBanner(imageSource);
  };

  const handleFb = (text) => {
    setFb(text);
  };

  const handleInsta = (text) => {
    setInsta(text);
  };

  const handleWebsite = (text) => {
    setWebsite(text);
  };

  return (
    <div>
      <Head>
        <title>Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AccountNavbar ref={accountNavbarRef} />

      <AccountLayout ref={accountLayoutRef} title="Manage Store">
        <Container.Fluid className="tag">
          <Card.Simple>
            <Card.Body>
              <Container.Row>
                <Container.Column className="col-md-6 col-xl-5">
                  <StoreForm
                    loading={loading}
                    submit={handleStoreSubmit}
                    handleTitle={handleTitle}
                    handleDescription={handleDescription}
                    handleStoreLogo={handleStoreLogo}
                    handleStoreBanner={handleStoreBanner}
                    handleFb={handleFb}
                    handleInsta={handleInsta}
                    handleWebsite={handleWebsite}
                    title={title}
                    description={description}
                    fb={fb}
                    insta={insta}
                    website={website}
                    storeLogo={storeLogo}
                    storeBanner={storeBanner}
                    storeState={storeState}
                  />
                </Container.Column>

                <Container.Column className="col-md-6 col-xl-7">
                  <Card.Simple className="border-0 p-0 bg-transparent">
                    <Card.Body className="p-0">
                      <img
                        className="card-img store-image"
                        src={storeBanner}
                        alt="..."
                      />
                      <div className="card-img-overlay d-flex align-items-end">
                        <img
                          className="rounded-circle"
                          src={storeLogo}
                          alt="..."
                          height={70}
                          width={70}
                        />
                        <div className="ms-2">
                          <Text className="fs-16 fw-bolder mb-0">{title}</Text>
                          <Text className="fs-13 mb-0">{description}</Text>
                        </div>
                      </div>
                    </Card.Body>
                  </Card.Simple>

                  <Card.Simple className="border-0 p-0 bg-transparent">
                    <Card.Body className="p-0">
                      <img
                        className="card-img img-fluid"
                        src={Image1.src}
                        alt="..."
                      />
                    </Card.Body>
                  </Card.Simple>
                </Container.Column>
              </Container.Row>
            </Card.Body>
          </Card.Simple>
        </Container.Fluid>
        {modalShow && (
          <PrimaryModal
            show={modalShow}
            onHide={() => {
              setModalShow(false);
            }}
          >
            <div className="text-center">
              <img className="img-fluid" src={Image3.src} alt="..." />
              <h4 className="fw-bold">Your Store Created!</h4>
              <p>
                Thanks for create your store <h5>Design & Sell</h5>
              </p>
              <p>You will get notification on your email.</p>
              <p>You can design your creativity and</p>
              <p>sell & earn your profit</p>
            </div>
            <div className="d-flex justify-content-center">
              <PrimaryButton className="me-2">Start Design</PrimaryButton>
              <SecondaryButton className="">
                {/* <FontAwesomeIcon className="" icon={faStore} /> */}
                Browse Store
              </SecondaryButton>
            </div>
          </PrimaryModal>
        )}
      </AccountLayout>
    </div>
  );
};

export default withAuth(StoreIndex);
