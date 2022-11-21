import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import moment from "moment";
import { useRouter } from "next/router";
import { Layout2 } from "../../components/layout/index";
import { Container } from "../../components/container";
import { ProductShow } from "../../components/product";
import { Requests } from "../../utils/Http";
import { Toastify } from "../../components/toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  PinterestIcon,
} from "react-share";

// imported images
import BannerImage from "../../public/assets/img/topsection.png";

export default function Home() {
  const [tab, setTab] = useState("Shop Products");
  const { query } = useRouter();
  const [logo, setLogo] = useState(
    "https://ih1.redbubble.net/image.3566826920.6325/flat,300x200,075,t.jpg"
  );
  const [cover, setCover] = useState(BannerImage.src);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [productList, setProductList] = useState([]);
  const [joinTime, setJoinTime] = useState("");
  const [totalDesign, setTotalDesign] = useState(0);
  const [storeId, setStoreId] = useState();
  const [storeFollow, setStoreFollow] = useState(false);
  const [storeFollowerList, setStoreFollowerList] = useState([]);
  const [shareIcon, setShareIcon] = useState(false);

  const fetchData = async () => {
    if (query && query.id) {
      try {
        const response = await Requests.Store.GetSingleStore(query.id);
        setStoreId(query.id);
        setLogo(Requests.HostUrl + response.data.body.store.logo);
        setCover(Requests.HostUrl + response.data.body.store.cover);
        setName(response.data.body.store.user.name);
        setEmail(response.data.body.store.user.email);
        setDescription(response.data.body.store.description);
        setJoinTime(
          moment(response.data.body.store.user.createdAt).format("MMMM YYYY")
        );
        setProductList(response.data.body.campaignItems);
        setTotalDesign(response.data.body.campaignItems.length);
        if (response.data.body.store.follow) {
          setStoreFollowerList(response.data.body.store.follow);
          if (localStorage.getItem("token")) {
            const logged = jwt_decode(localStorage.getItem("token"));
            if (response.data.body.store.follow.indexOf(logged.id) !== -1) {
              setStoreFollow(true);
            } else {
              setStoreFollow(false);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const handleFollow = async () => {
    if (localStorage.getItem("token")) {
      const logged = jwt_decode(localStorage.getItem("token"));
      if (storeFollow) {
        const formData = new FormData();
        formData.append(
          "follow",
          storeFollowerList.filter((item) => item !== logged.id)
        );
        const response = await Requests.Store.UnFollowStore(formData, storeId);
        if (response.data.message) {
          Toastify.Success(response.data.message);
        }
        fetchData();
      } else {
        const formData = new FormData();
        storeFollowerList?.forEach((element) => {
          formData.append("follow", element);
        });
        formData.append("follow", logged.id);
        const response = await Requests.Store.FollowStore(formData, storeId);
        if (response.data.message) {
          Toastify.Success(response.data.message);
        }
        fetchData();
      }
    } else {
      Toastify.Error("You need to login for following the store");
    }
  };

  return (
    <Layout2 title="Store Details">
      <Container.Simple>
        <img className="img-fluid w-100" src={cover} />
        <Container.Row className="text-center">
          <img
            src={logo}
            style={{
              position: "absolute",
              marginTop: "-1rem",
              left: "calc(50% - 32px)",
              borderRadius: "50%",
              height: "40px",
              width: "64px",
              // objectFit: "cover",
              // objectPosition: "0 0",
              // outline: "0",
              // border: "2px solid #FFFFFF",
            }}
          />
        </Container.Row>
        <Container.Row>
          <Container.Column className="fw-bold mt-5 text-center">
            {name}
          </Container.Column>
          <Container.Column className="fs-11 mt-1 text-center">
            <p>
              Joined {joinTime}
              <span className="ms-1">
                &#9642; {totalDesign} {totalDesign > 1 ? "designs" : "design"}
              </span>
            </p>
          </Container.Column>
        </Container.Row>
        <Container.Row>
          <div className="d-flex justify-content-center">
            <div
              className={
                tab == "Shop Products"
                  ? "btn btn-primary text-center text-light"
                  : "btn-gray text-center text-dark"
              }
              onClick={() => {
                setTab("Shop Products");
              }}
            >
              Shop Products
            </div>
            <div
              className={
                tab == "About Designer"
                  ? "btn btn-primary text-center text-light"
                  : "btn-gray text-center text-dark"
              }
              onClick={() => {
                setTab("About Designer");
              }}
            >
              About Designer
            </div>
          </div>
        </Container.Row>
        {tab == "About Designer" && (
          <Container.Row className="border p-3 my-5">
            <Container.Column>
              <Container.Row>
                <Container.Column className="col-sm-1 col-md-1 col-lg-1">
                  <img
                    src={logo}
                    style={{
                      borderRadius: "50%",
                      height: "64px",
                      width: "64px",
                      // objectFit: "cover",
                      // objectPosition: "0 0",
                      // outline: "0",
                      border: "2px solid #FFFFFF",
                    }}
                  />
                </Container.Column>
                <Container.Column className="col-sm-9 col-md-9 col-lg-9 mt-3">
                  <h4 className="fw-bold m-0">{name}</h4>
                  <div className="d-flex fs-11">
                    <p>Joined {joinTime}</p>
                    <p>
                      &#9642; {totalDesign}{" "}
                      {totalDesign > 1 ? "designs" : "design"}
                    </p>
                  </div>
                </Container.Column>
                <Container.Column
                  className="col-sm-1 col-md-1 col-lg-1 mt-3 mb-5 py-2 text-center text-secondary border border-secondary"
                  style={{ backgroundColor: "#EEEEEE" }}
                  onClick={handleFollow}
                >
                  {storeFollow ? "Unfollow" : "Follow"}
                </Container.Column>
                <Container.Column className="col-sm-1 col-md-1 col-lg-1 mt-3 mb-5 d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon
                    className="border border-secondary p-1 fs-icon"
                    icon={faShareAlt}
                    onClick={() => {
                      setShareIcon(!shareIcon);
                    }}
                  />
                </Container.Column>
              </Container.Row>
              {shareIcon && (
                <Container.Row>
                  <div>
                    <TwitterShareButton
                      className="float-end"
                      title={"Twitter"}
                      url={`${
                        "https://efgtailor.com/storeDetails/" + query.id
                      }`}
                      hashtags={["efg"]}
                    >
                      <TwitterIcon size={32} />
                    </TwitterShareButton>
                    <FacebookShareButton
                      className="float-end"
                      title={"Facebook"}
                      url={`${
                        "https://efgtailor.com/storeDetails/" + query.id
                      }`}
                      hashtags={["efg"]}
                    >
                      <FacebookIcon size={32} />
                    </FacebookShareButton>
                    <PinterestShareButton
                      className="float-end"
                      title={"Pinterest"}
                      url={`${
                        "https://efgtailor.com/storeDetails/" + query.id
                      }`}
                      media={`${
                        "https://efgtailor.com/storeDetails/" + query.id
                      }`}
                      hashtags={["efg"]}
                    >
                      <PinterestIcon size={32} />
                    </PinterestShareButton>
                    <WhatsappShareButton
                      className="float-end"
                      title={"WhatsApp"}
                      url={`${
                        "https://efgtailor.com/storeDetails/" + query.id
                      }`}
                      hashtags={["efg"]}
                    >
                      <WhatsappIcon size={32} />
                    </WhatsappShareButton>
                  </div>
                </Container.Row>
              )}
              <p>{description}</p>
              <p>
                If you have any inquiries or if you want to send us feedback
                feel free to contact us
              </p>
              <p>at {email}. Thank you very much for your support</p>
            </Container.Column>
          </Container.Row>
        )}
        {tab == "Shop Products" && (
          <Container.Row className="border p-3 my-5">
            {productList &&
              productList.map((item, index) => {
                return (
                  <div className="col-xl-3 col-md-6 col-sm-12 pb-4" key={index}>
                    <ProductShow item={item} onDemand={true} />
                  </div>
                );
              })}
          </Container.Row>
        )}
      </Container.Simple>
    </Layout2>
  );
}
