import React, { useState, useEffect, useCallback } from "react";
import { Text } from "../../components/text";
import { Layout2 } from "../../components/layout/index";
import { Container } from "../../components/container";
import { Tab, Tabs } from "react-bootstrap";
import { BreadCrumb } from "../../components/breadcrumb";
import { DateRangePicker } from "../../components/dateRangePicker";

// imported images
import TShirtColor from "../../public/assets/bulk-img/tShirtColor.png";
import CollorColor from "../../public/assets/bulk-img/collarColor.png";
import CuffColor from "../../public/assets/bulk-img/cuffColor.png";
import FrontPlacketColor from "../../public/assets/bulk-img/frontPlacketColor.png";
import BackPlacketColor from "../../public/assets/bulk-img/backPlacketColor.png";
import ButtonColor from "../../public/assets/bulk-img/buttonColor.png";
import SizeGuide from "../../public/assets/sizeguide.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Requests } from "../../utils/Http";
import * as htmlToImage from "html-to-image";
import { Toastify } from "../../components/toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";
import { PrimaryModal } from "../../components/modal/PrimaryModal";

const Index = () => {
  const { query } = useRouter();
  const { register, handleSubmit, setValue, reset } = useForm();

  const [item, setItem] = useState();
  const [tabKey, setTabKey] = useState(1);
  const [uploadImage, setUploadImage] = useState(false);
  const [sizeguideshow, setSizeGuideShow] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [fabricGroup, setFabricGroup] = useState([]);
  const [fabric, setFabric] = useState();
  const [fabricError, setFabricError] = useState();
  const [tShirtColor, setTShirtColor] = useState();
  const [collorColor, setCollorColor] = useState();
  const [cuffColor, setCuffColor] = useState();
  const [frontPlacketColor, setFrontPlacketColor] = useState();
  const [backPlacketColor, setBackPlacketColor] = useState();
  const [buttonColor, setButtonColor] = useState();
  const [XSQuantity, setXSQuantity] = useState();
  const [SQuantity, setSQuantity] = useState();
  const [MQuantity, setMQuantity] = useState();
  const [LQuantity, setLQuantity] = useState();
  const [XLQuantity, setXLQuantity] = useState();
  const [XXLQuantity, setXXLQuantity] = useState();
  const [XXXLQuantity, setXXXLQuantity] = useState();
  const [XXXXLQuantity, setXXXXLQuantity] = useState();
  const [quantityError, setQuantityError] = useState();
  const [designImage, setDesignImage] = useState();
  const [designImageLength, setDesignImageLength] = useState();
  const [designImageWidth, setDesignImageWidth] = useState();
  const [printLocation, setPrintLocation] = useState();
  const [printType, setPrintType] = useState();
  const [uploadImageError, setUploadImageError] = useState(false);

  const printTypeList = [
    "Silk Screen",
    "Rubber",
    "Plastisol",
    "High Density",
    "Embroidery",
    "CMYK",
    "Dye Sub",
    "Crackle",
    "Glitter",
    "Flocking",
    "Foil",
    "Glow-in-The-Dark",
    "Heat-Transfer",
    "High Gloss",
    "Metalic",
    "Puff",
    "Digital",
  ];

  const countryList = [
    "Zimbabwe",
    "Zambia",
    "Yugoslavia",
    "Yemen",
    "Western Sahara",
    "Wallis and Futuna Islands",
    "Virgin Islands (U.S.)",
    "Virgin Islands (British)",
    "Vietnam",
    "Venezuela",
    "Vanuatu",
    "Uzbekistan",
    "Uruguay",
    "United States Minor Outlying Islands",
    "United States",
    "United Kingdom",
    "United Arab Emirates",
    "Ukraine",
    "Uganda",
    "Tuvalu",
    "Turks and Caicos Islands",
    "Turkmenistan",
    "Turkey",
    "Tunisia",
    "Trinidad and Tobago",
    "Tonga",
    "Tokelau",
    "Togo",
    "Thailand",
    "Tanzania, United Republic of",
    "Tajikistan",
    "Taiwan, Province of China",
    "Syrian Arab Republic",
    "Switzerland",
    "Sweden",
    "Swaziland",
    "Svalbard and Jan Mayen Islands",
    "Suriname",
    "Sudan",
    "St. Pierre and Miquelon",
    "St. Helena",
    "Sri Lanka",
    "Spain",
    "South Georgia and the South Sandwich Islands",
    "South Africa",
    "Somalia",
    "Solomon Islands",
    "Slovenia",
    "Slovakia (Slovak Republic)",
    "Singapore",
    "Sierra Leone",
    "Seychelles",
    "Senegal",
    "Saudi Arabia",
    "Sao Tome and Principe",
    "San Marino",
    "Samoa",
    "Saint Vincent and the Grenadines",
    "Saint Lucia",
    "Saint Kitts and Nevis",
    "Rwanda",
    "Russian Federation",
    "Romania",
    "Reunion",
    "Qatar",
    "Puerto Rico",
    "Portugal",
    "Poland",
    "Pitcairn",
    "Philippines",
    "Peru",
    "Paraguay",
    "Papua New Guinea",
    "Panama",
    "Palau",
    "Pakistan",
    "Oman",
    "Norway",
    "Northern Mariana Islands",
    "Norfolk Island",
    "Niue",
    "Nigeria",
    "Niger",
    "Nicaragua",
    "New Zealand",
    "New Caledonia",
    "Netherlands Antilles",
    "Netherlands",
    "Nepal",
    "Nauru",
    "Namibia",
    "Myanmar",
    "Mozambique",
    "Morocco",
    "Montserrat",
    "Mongolia",
    "Monaco",
    "Moldova, Republic of",
    "Micronesia, Federated States of",
    "Mexico",
    "Mayotte",
    "Mauritius",
    "Mauritania",
    "Martinique",
    "Marshall Islands",
    "Malta",
    "Mali",
    "Maldives",
    "Malaysia",
    "Malawi",
    "Madagascar",
    "Macedonia, The Former Yugoslav Republic of",
    "Macau",
    "Luxembourg",
    "Lithuania",
    "Liechtenstein",
    "Libyan Arab Jamahiriya",
    "Liberia",
    "Lesotho",
    "Lebanon",
    "Latvia",
    "Lao, People's Democratic Republic",
    "Kyrgyzstan",
    "Kuwait",
    "Korea, Republic of",
    "Korea, Democratic People's Republic of",
    "Kiribati",
    "Kenya",
    "Kazakhstan",
    "Jordan",
    "Japan",
    "Jamaica",
    "Italy",
    "Israel",
    "Ireland",
    "Iraq",
    "Iran (Islamic Republic of)",
    "Indonesia",
    "India",
    "Iceland",
    "Hungary",
    "Hong Kong",
    "Honduras",
    "Holy See (Vatican City State)",
    "Heard and Mc Donald Islands",
    "Haiti",
    "Guyana",
    "Guinea-Bissau",
    "Guinea",
    "Guatemala",
    "Guam",
    "Guadeloupe",
    "Grenada",
    "Greenland",
    "Greece",
    "Gibraltar",
    "Ghana",
    "Germany",
    "Georgia",
    "Gambia",
    "Gabon",
    "French Southern Territories",
    "French Polynesia",
    "French Guiana",
    "France Metropolitan",
    "France",
    "Finland",
    "Fiji",
    "Faroe Islands",
    "Falkland Islands (Malvinas)",
    "Ethiopia",
    "Estonia",
    "Eritrea",
    "Equatorial Guinea",
    "El Salvador",
    "Egypt",
    "Ecuador",
    "East Timor",
    "Dominican Republic",
    "Dominica",
    "Djibouti",
    "Denmark",
    "Czech Republic",
    "Cyprus",
    "Cuba",
    "Croatia (Hrvatska)",
    "Cote d'Ivoire",
    "Costa Rica",
    "Cook Islands",
    "Congo, the Democratic Republic of the",
    "Congo",
    "Comoros",
    "Colombia",
    "Cocos (Keeling) Islands",
    "Christmas Island",
    "China",
    "Chile",
    "Chad",
    "Central African Republic",
    "Cayman Islands",
    "Cape Verde",
    "Canada",
    "Cameroon",
    "Cambodia",
    "Burundi",
    "Burkina Faso",
    "Bulgaria",
    "Brunei Darussalam",
    "British Indian Ocean Territory",
    "Brazil",
    "Bouvet Island",
    "Botswana",
    "Bosnia and Herzegowina",
    "Bolivia",
    "Bhutan",
    "Bermuda",
    "Benin",
    "Belize",
    "Belgium",
    "Belarus",
    "Barbados",
    "Bahrain",
    "Bahamas",
    "Azerbaijan",
    "Austria",
    "Australia",
    "Aruba",
    "Armenia",
    "Argentina",
    "Antigua and Barbuda",
    "Antarctica",
    "Anguilla",
    "Angola",
    "Andorra",
    "American Samoa",
    "Algeria",
    "Albania",
    "Afghanistan",
    "Bangladesh",
  ];

  // fetch bulkproduct
  const fetchProduct = async () => {
    if (query && query.id) {
      const response = await Requests.BulkProduct.GetSingleProduct(query.id);
      if (response && response.status === 200) {
        setFabricGroup(response.data.body.fabrics);
        console.log("response.data.body");
        console.log(response.data.body);
        setItem(response.data.body);
      }
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  const hexToRgb = (color) => {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    color = color.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : {
          r: 0,
          g: 0,
          b: 0,
        };
  };

  const colorImage = (imgId, hexaColor) => {
    // create hidden canvas (using image dimensions)
    var imgElement = document.getElementById(imgId);

    var canvas = document.createElement("canvas");
    canvas.width = item.width;
    canvas.height = item.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(imgElement, 0, 0);
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var data = imageData.data;
    // convert image to grayscale
    var rgbColor = hexToRgb(hexaColor);
    for (var p = 0, len = data.length; p < len; p += 4) {
      data[p + 0] = rgbColor.r;
      data[p + 1] = rgbColor.g;
      data[p + 2] = rgbColor.b;
    }
    ctx.putImageData(imageData, 0, 0);
    // replace image source with canvas data
    imgElement.src = canvas.toDataURL();
  };

  const handleTab = (key) => {
    setTabKey(key);
  };

  const nextTab = () => {
    setTabKey(tabKey + 1);
  };

  const backTab = () => {
    setTabKey(tabKey - 1);
  };

  // Handle submit
  const onSubmit = async (data) => {
    if (
      data.fullName &&
      data.email &&
      data.phone &&
      data.address &&
      data.city &&
      data.state &&
      data.postCode &&
      data.country
    ) {
      let image = "";
      await htmlToImage
        .toPng(document.getElementById("bulkImage"))
        .then((dataUrl) => {
          console.log(dataUrl);
          image = dataUrl;
        });
      const formData = new FormData();
      formData.append("name", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("businessName", data.businessName);
      formData.append("shippingAddress", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("postCode", data.postCode);
      formData.append("country", data.country);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("instruction", data.note);
      formData.append("image", image);
      formData.append("fabric", fabric._id);
      formData.append(
        "quantity",
        JSON.stringify({
          xs: data.xs,
          s: data.s,
          m: data.m,
          l: data.l,
          xl: data.xl,
          xxl: data.xxl,
          xxxl: data.xxxl,
          xxxxl: data.xxxxl,
        })
      );
      formData.append(
        "product_color",
        JSON.stringify({
          body: data.body,
          collor: data.collor,
          cuff: data.cuff,
          front_placket: data.front_placket,
          back_placket: data.back_placket,
          button: data.button,
        })
      );
      if (uploadImage) {
        formData.append(
          "uploadImage",
          JSON.stringify({
            length: designImageLength,
            width: designImageWidth,
            printLocation,
            printType,
          })
        );
        formData.append("uploadImageFile", designImage);
      }
      if (localStorage.getItem("token")) {
        try {
          const response = await Requests.BulkOrder.CreateBulkOrder(formData);
          Toastify.Success("Bulk Order Created Successfully");
          reset();
          setValue("country", "Bangladesh");
          setDateRange([null, null]);
          setDesignImage();
          setDesignImageLength();
          setDesignImageWidth();
          setPrintType("Silk Screen");
          setPrintLocation();
          setFabric();
          setTabKey(1);
        } catch (error) {
          if (error.response) {
            Toastify.Error(error.response);
          } else {
            Toastify.Error("Something going wrong.");
          }
        }
      } else {
        Toastify.Error("You need to login for giving feedback");
      }
    }
  };

  useEffect(() => {
    if (
      printLocation == "neck heat seal label" ||
      printLocation == "hang tag"
    ) {
      setPrintType("Digital");
    }
  }, [printLocation]);

  useEffect(() => {
    setValue("country", "Bangladesh");
  }, []);

  return (
    <Layout2 title="Event tshirt - Wholesale | EFGFashion">
      <Container.Simple>
        <BreadCrumb />
      </Container.Simple>
      <Container.Simple>
        <Container.Row>
          <Container.Column className="col-sm-4">
            <p
              className="text-center w-100"
              style={{ backgroundColor: "#b3f0bd" }}
            >
              Customize bulk order t-shirt
            </p>
            <div
              className="d-grid"
              id="bulkImage"
              style={{ gridTemplateColumns: "1fr" }}
            >
              {item && item.collor_image != null && (
                <img
                  id="img_collar"
                  className="img-fluid"
                  src={item.collor_image}
                  alt=""
                  crossOrigin="anonymous"
                  style={{ gridRowStart: 1, gridColumnStart: 1 }}
                />
              )}
              {item && item.cuff_image != null && (
                <img
                  id="img_cuff"
                  className="img-fluid"
                  src={item.cuff_image}
                  alt=""
                  crossOrigin="anonymous"
                  style={{ gridRowStart: 1, gridColumnStart: 1 }}
                />
              )}
              {item && item.front_placket_image != null && (
                <img
                  id="img_frontPlacket"
                  className="img-fluid"
                  src={item.front_placket_image}
                  alt=""
                  crossOrigin="anonymous"
                  style={{ gridRowStart: 1, gridColumnStart: 1 }}
                />
              )}
              {item && item.back_placket_image != null && (
                <img
                  id="img_backPlacket"
                  className="img-fluid"
                  src={item.back_placket_image}
                  alt=""
                  crossOrigin="anonymous"
                  style={{ gridRowStart: 1, gridColumnStart: 1 }}
                />
              )}
              {item && item.button_image != null && (
                <img
                  id="img_button"
                  className="img-fluid"
                  src={item.button_image}
                  alt=""
                  crossOrigin="anonymous"
                  style={{ gridRowStart: 1, gridColumnStart: 1 }}
                />
              )}
              {item && item.body_image != null && (
                <img
                  className="img-fluid"
                  id="img_main"
                  src={item.body_image}
                  alt=""
                  crossOrigin="anonymous"
                  style={{ gridRowStart: 1, gridColumnStart: 1 }}
                />
              )}
              {item && item.shadow_image != null && (
                <img
                  className="img-fluid"
                  src={item.shadow_image}
                  alt=""
                  crossOrigin="anonymous"
                  style={{ gridRowStart: 1, gridColumnStart: 1 }}
                />
              )}
            </div>
            <p className="text-center">
              The image shown above is a close representation of the final
              product
            </p>
          </Container.Column>
          <Container.Column className="col-sm-8">
            <form onSubmit={handleSubmit(onSubmit)} className="form-group">
              <Tabs
                activeKey={tabKey}
                id="controlled-tab-example"
                className="mb-3"
                onSelect={handleTab}
              >
                <Tab
                  eventKey={1}
                  title="Select group"
                  disabled={tabKey != 1}
                  style={{ marginTop: "-1rem" }}
                >
                  {/* third section */}
                  <Container.Simple className="bg-gray container py-2 mb-3">
                    <Text className="fs-21 mt-4 mb-2 mb-0">
                      Select Fabric Type
                    </Text>
                    {fabricGroup &&
                      fabricGroup.map((item, index) => {
                        return (
                          <div
                            key={`fabric${index}`}
                            className={
                              JSON.stringify(item) == JSON.stringify(fabric)
                                ? "bg-success p-2"
                                : "bg-white p-2"
                            }
                            onClick={() => {
                              setFabric(item);
                              setFabricError();
                            }}
                          >
                            <span className="d-block">
                              <b>{item.fabric_name}</b>
                            </span>
                            <span className="d-block">
                              Fabric: {item.description}
                              <br />
                              Size: {item.size}
                              <br />
                              MOQ: {item.moq}
                            </span>
                            <span className="d-block">
                              <span className="d-inline-block">Colors:</span>
                              {item.colors.map((colorItem, colorIndex) => {
                                return (
                                  <span
                                    key={`color${colorIndex}`}
                                    className="d-inline-block"
                                    style={{
                                      border: "1px solid rgb(0, 0, 0)",
                                      minWidth: "15px",
                                      minHeight: "15px",
                                      background: `${colorItem.color_code}`,
                                      margin: "2px 2px -2px 0px",
                                    }}
                                  ></span>
                                );
                              })}
                            </span>
                          </div>
                        );
                      })}
                    {fabricError && (
                      <div className="my-5 col-12 d-flex">
                        <p className="text-danger">{fabricError}</p>
                      </div>
                    )}
                    <div className="my-5 col-12 d-flex justify-content-end">
                      <button
                        className="btn btn-sm btn-primary"
                        style={{ marginLeft: "5px" }}
                        onClick={() => {
                          if (fabric) {
                            setFabricError();
                            nextTab();
                          } else {
                            setFabricError(
                              "You need to select fabric type to proceed"
                            );
                          }
                        }}
                      >
                        Next <i className="fa fa-arrow-circle-right"></i>
                      </button>
                    </div>
                  </Container.Simple>
                </Tab>
                <Tab
                  eventKey={2}
                  title="Choose your color"
                  disabled={tabKey != 2}
                  style={{ marginTop: "-1rem" }}
                >
                  {/* fourth section */}
                  <Container.Simple className="bg-white container py-2 mb-3">
                    {item && item.body_image != null && (
                      <Container.Row>
                        <div className="row">
                          <h6>Select Tshirt Color</h6>
                          <div>
                            <div className="float-start">
                              <img src={TShirtColor.src} alt="" />
                            </div>
                            <div>
                              {fabric &&
                                fabric.colors.map((item, index) => {
                                  return (
                                    <span
                                      key={`tShirtColor${index}`}
                                      className={`${
                                        tShirtColor === item.color_code
                                          ? "color-bulk-selected-div rounded-circle d-inline-block"
                                          : "color-bulk-div rounded-circle d-inline-block"
                                      }`}
                                      style={{
                                        backgroundColor: `${item.color_code}`,
                                      }}
                                      onClick={() => {
                                        colorImage("img_main", item.color_code);
                                        setValue("body", item.color_code);
                                        setTShirtColor(item.color_code);
                                      }}
                                    ></span>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </Container.Row>
                    )}
                    {item && item.collor_image != null && (
                      <Container.Row>
                        <div className="row">
                          <h6>Select Collar Color (Minimum Order 500pc)</h6>
                          <div>
                            <div className="float-start">
                              <img src={CollorColor.src} alt="" />
                            </div>
                            <div>
                              {fabric &&
                                fabric.colors.map((item, index) => {
                                  return (
                                    <span
                                      key={`collorColor${index}`}
                                      className={`${
                                        collorColor === item.color_code
                                          ? "color-bulk-selected-div rounded-circle d-inline-block"
                                          : "color-bulk-div rounded-circle d-inline-block"
                                      }`}
                                      style={{
                                        backgroundColor: `${item.color_code}`,
                                      }}
                                      onClick={() => {
                                        colorImage(
                                          "img_collar",
                                          item.color_code
                                        );
                                        setValue("collor", item.color_code);
                                        setCollorColor(item.color_code);
                                      }}
                                    ></span>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </Container.Row>
                    )}
                    {item && item.cuff_image != null && (
                      <Container.Row>
                        <div className="row">
                          <h6>Select Cuff Color (Minimum Order 500pc)</h6>
                          <div>
                            <div className="float-start">
                              <img src={CuffColor.src} alt="" />
                            </div>
                            <div>
                              {fabric &&
                                fabric.colors.map((item, index) => {
                                  return (
                                    <span
                                      key={`cuffColor${index}`}
                                      className={`${
                                        cuffColor === item.color_code
                                          ? "color-bulk-selected-div rounded-circle d-inline-block"
                                          : "color-bulk-div rounded-circle d-inline-block"
                                      }`}
                                      style={{
                                        backgroundColor: `${item.color_code}`,
                                      }}
                                      onClick={() => {
                                        colorImage("img_cuff", item.color_code);
                                        setValue("cuff", item.color_code);
                                        setCuffColor(item.color_code);
                                      }}
                                    ></span>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </Container.Row>
                    )}
                    {item && item.front_placket_image != null && (
                      <Container.Row>
                        <div className="row">
                          <h6>
                            Select Front Placket Color (Minimum Order 500pc)
                          </h6>
                          <div>
                            <div className="float-start">
                              <img src={FrontPlacketColor.src} alt="" />
                            </div>
                            <div>
                              {fabric &&
                                fabric.colors.map((item, index) => {
                                  return (
                                    <span
                                      key={`frontPlacketColor${index}`}
                                      className={`${
                                        frontPlacketColor === item.color_code
                                          ? "color-bulk-selected-div rounded-circle d-inline-block"
                                          : "color-bulk-div rounded-circle d-inline-block"
                                      }`}
                                      style={{
                                        backgroundColor: `${item.color_code}`,
                                      }}
                                      onClick={() => {
                                        colorImage(
                                          "img_frontPlacket",
                                          item.color_code
                                        );
                                        setValue(
                                          "front_placket",
                                          item.color_code
                                        );
                                        setFrontPlacketColor(item.color_code);
                                      }}
                                    ></span>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </Container.Row>
                    )}
                    {item && item.back_placket_image != null && (
                      <Container.Row>
                        <div className="row">
                          <h6>
                            Select Back Placket Color (Minimum Order 500pc)
                          </h6>
                          <div>
                            <div className="float-start">
                              <img src={BackPlacketColor.src} alt="" />
                            </div>
                            <div>
                              {fabric &&
                                fabric.colors.map((item, index) => {
                                  return (
                                    <span
                                      key={`backPlacketColor${index}`}
                                      className={`${
                                        backPlacketColor === item.color_code
                                          ? "color-bulk-selected-div rounded-circle d-inline-block"
                                          : "color-bulk-div rounded-circle d-inline-block"
                                      }`}
                                      style={{
                                        backgroundColor: `${item.color_code}`,
                                      }}
                                      onClick={() => {
                                        colorImage(
                                          "img_backPlacket",
                                          item.color_code
                                        );
                                        setValue(
                                          "back_placket",
                                          item.color_code
                                        );
                                        setBackPlacketColor(item.color_code);
                                      }}
                                    ></span>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </Container.Row>
                    )}
                    {item && item.button_image != null && (
                      <Container.Row>
                        <div className="row">
                          <h6>Select Button Color</h6>
                          <div>
                            <div className="float-start">
                              <img src={ButtonColor.src} alt="" />
                            </div>
                            <div>
                              {fabric &&
                                fabric.colors.map((item, index) => {
                                  return (
                                    <span
                                      key={`buttonColor${index}`}
                                      className={`${
                                        buttonColor === item.color_code
                                          ? "color-bulk-selected-div rounded-circle d-inline-block"
                                          : "color-bulk-div rounded-circle d-inline-block"
                                      }`}
                                      style={{
                                        backgroundColor: `${item.color_code}`,
                                      }}
                                      onClick={() => {
                                        colorImage(
                                          "img_button",
                                          item.color_code
                                        );
                                        setValue("button", item.color_code);
                                        setButtonColor(item.color_code);
                                      }}
                                    ></span>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </Container.Row>
                    )}
                    <div className="my-5 col-12 d-flex justify-content-end">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={backTab}
                      >
                        <i className="fa fa-arrow-circle-left"></i> Back
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        style={{ marginLeft: "5px" }}
                        onClick={nextTab}
                      >
                        Next <i className="fa fa-arrow-circle-right"></i>
                      </button>
                    </div>
                  </Container.Simple>
                </Tab>
                <Tab
                  eventKey={3}
                  title="Select size & quantity"
                  disabled={tabKey != 3}
                  style={{ marginTop: "-1rem" }}
                >
                  {/* third section */}
                  <Container.Simple className="bg-white container py-2 mb-3">
                    <Container.Row className="mb-4">
                      <h6>Give your required quantiy/size</h6>
                      <Container.Column className="col-sm-3 border text-center rounded-start p-2">
                        <p className="fw-bold mb-1 mt-3">Size: XS</p>
                        <p className="mb-1">Body: 34-36</p>
                        <p>Height: 25-26</p>
                        <input
                          className="form-control"
                          type="number"
                          min="0"
                          style={{ borderLeft: "1px solid #b9b9b9" }}
                          onChange={(event) => {
                            let value = event.target.value;
                            setXSQuantity(value);
                            setQuantityError();
                            setValue("xs", value);
                          }}
                        />
                      </Container.Column>
                      <Container.Column className="col-sm-3 border text-center p-2">
                        <p className="fw-bold mb-1 mt-3">Size: S</p>
                        <p className="mb-1">Body: 36-38</p>
                        <p>Height: 26-27</p>
                        <input
                          className="form-control"
                          type="number"
                          min="0"
                          style={{ borderLeft: "1px solid #b9b9b9" }}
                          onChange={(event) => {
                            let value = event.target.value;
                            setSQuantity(value);
                            setQuantityError();
                            setValue("s", value);
                          }}
                        />
                      </Container.Column>
                      <Container.Column className="col-sm-3 border text-center p-2">
                        <p className="fw-bold mb-1 mt-3">Size: M</p>
                        <p className="mb-1">Body: 38-40</p>
                        <p>Height: 27-28</p>
                        <input
                          className="form-control"
                          type="number"
                          min="0"
                          style={{ borderLeft: "1px solid #b9b9b9" }}
                          onChange={(event) => {
                            let value = event.target.value;
                            setMQuantity(value);
                            setQuantityError();
                            setValue("m", value);
                          }}
                        />
                      </Container.Column>
                      <Container.Column className="col-sm-3 border text-center rounded-end p-2">
                        <p className="fw-bold mb-1 mt-3">Size: L</p>
                        <p className="mb-1">Body: 40-42</p>
                        <p>Height: 28-29</p>
                        <input
                          className="form-control"
                          type="number"
                          min="0"
                          style={{ borderLeft: "1px solid #b9b9b9" }}
                          onChange={(event) => {
                            let value = event.target.value;
                            setLQuantity(value);
                            setQuantityError();
                            setValue("l", value);
                          }}
                        />
                      </Container.Column>
                    </Container.Row>
                    <Container.Row>
                      <Container.Column className="col-sm-3 border text-center rounded-start p-2">
                        <p className="fw-bold mb-1 mt-3">Size: XL</p>
                        <p className="mb-1">Body: 42-44</p>
                        <p>Height: 29-30</p>
                        <input
                          className="form-control"
                          type="number"
                          min="0"
                          style={{ borderLeft: "1px solid #b9b9b9" }}
                          onChange={(event) => {
                            let value = event.target.value;
                            setXLQuantity(value);
                            setQuantityError();
                            setValue("xl", value);
                          }}
                        />
                      </Container.Column>
                      <Container.Column className="col-sm-3 border text-center rounded-start p-2">
                        <p className="fw-bold mb-1 mt-3">Size: 2XL</p>
                        <p className="mb-1">Body: 44-46</p>
                        <p>Height: 30-31</p>
                        <input
                          className="form-control"
                          type="number"
                          min="0"
                          style={{ borderLeft: "1px solid #b9b9b9" }}
                          onChange={(event) => {
                            let value = event.target.value;
                            setXXLQuantity(value);
                            setQuantityError();
                            setValue("xxl", value);
                          }}
                        />
                      </Container.Column>
                      <Container.Column className="col-sm-3 border text-center rounded-start p-2">
                        <p className="fw-bold mb-1 mt-3">Size: 3XL</p>
                        <p className="mb-1">Body: 46-48</p>
                        <p>Height: 31-32</p>
                        <input
                          className="form-control"
                          type="number"
                          min="0"
                          style={{ borderLeft: "1px solid #b9b9b9" }}
                          onChange={(event) => {
                            let value = event.target.value;
                            setXXXLQuantity(value);
                            setQuantityError();
                            setValue("xxxl", value);
                          }}
                        />
                      </Container.Column>
                      <Container.Column className="col-sm-3 border text-center rounded-start p-2">
                        <p className="fw-bold mb-1 mt-3">Size: 4XL</p>
                        <p className="mb-1">Body: 48-50</p>
                        <p>Height: 32-33</p>
                        <input
                          className="form-control"
                          type="number"
                          min="0"
                          style={{ borderLeft: "1px solid #b9b9b9" }}
                          onChange={(event) => {
                            let value = event.target.value;
                            setXXXXLQuantity(value);
                            setQuantityError();
                            setValue("xxxxl", value);
                          }}
                        />
                      </Container.Column>
                      <Container.Row className="mt-2">
                        <div
                          className="d-flex justify-content-start"
                          style={{ cursor: "pointer" }}
                          onClick={() => setSizeGuideShow(!sizeguideshow)}
                        >
                          <div>
                            <img src={SizeGuide.src} alt="" height={18} />
                          </div>
                          <div className="w-25">
                            <Text className=" ms-2 text-decoration-underline">
                              Size Guide
                            </Text>
                          </div>
                        </div>
                      </Container.Row>
                      <Container.Row className="mt-2">
                        <div className="d-flex" style={{ cursor: "pointer" }}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            style={{ cursor: "pointer" }}
                            id="uploadImage"
                            checked={uploadImage ? true : false}
                            onChange={() => {
                              setUploadImage(!uploadImage);
                              if (uploadImage) {
                                setUploadImageError();
                                setDesignImage();
                                setDesignImageLength();
                                setDesignImageWidth();
                                setPrintType("Silk Screen");
                                setPrintLocation();
                              }
                            }}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="uploadImage"
                            style={{ cursor: "pointer" }}
                          >
                            Upload Images of your design?
                          </label>
                        </div>
                      </Container.Row>
                      {uploadImage && (
                        <Container.Row className="mt-3">
                          <div>
                            <h6>1. Select File</h6>
                            <input
                              type="file"
                              className="form-control"
                              accept="image/png, image/gif, image/jpeg, image/jpg"
                              onChange={(event) => {
                                setDesignImage(event.target.files[0]);
                                setUploadImageError();
                              }}
                            />
                            <br />
                            <h6>2. Input Print Size</h6>
                            <Container.Row
                              style={{ margin: "0px", marginTop: "15px" }}
                            >
                              <Container.Column className="col-sm-6">
                                <div className="input-group">
                                  <span className="input-group-text">
                                    Image Length (inch)
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Optional"
                                    value={designImageLength}
                                    onChange={(event) =>
                                      setDesignImageLength(event.target.value)
                                    }
                                  />
                                </div>
                              </Container.Column>
                              <Container.Column className="col-sm-6">
                                <div className="input-group">
                                  <span className="input-group-text">
                                    Image Width (inch)
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Optional"
                                    value={designImageWidth}
                                    onChange={(event) =>
                                      setDesignImageWidth(event.target.value)
                                    }
                                  />
                                </div>
                              </Container.Column>
                            </Container.Row>
                            <br />
                            <h6>3. Select Print Location</h6>
                            <div
                              className="row"
                              style={{ margin: "10px", color: "black" }}
                            >
                              <span style={{ fontWeight: "bold" }}>
                                On T-shirt:
                              </span>
                              <br />
                              <div>
                                <label
                                  className="form-check-label"
                                  style={{
                                    margin: "0px 8px 0px 8px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    value="left pocket"
                                    name="printLocation"
                                    onChange={(event) => {
                                      setPrintLocation(event.target.value);
                                      setUploadImageError();
                                    }}
                                  />
                                  Left Pocket
                                </label>
                                <label
                                  className="form-check-label"
                                  style={{
                                    margin: "0px 8px 0px 8px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    value="right pocket"
                                    name="printLocation"
                                    onChange={(event) => {
                                      setPrintLocation(event.target.value);
                                      setUploadImageError();
                                    }}
                                  />
                                  Right Pocket
                                </label>
                                <label
                                  className="form-check-label"
                                  style={{
                                    margin: "0px 8px 0px 8px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    value="left sleeve"
                                    name="printLocation"
                                    onChange={(event) => {
                                      setPrintLocation(event.target.value);
                                      setUploadImageError();
                                    }}
                                  />
                                  Left Sleeve
                                </label>
                                <label
                                  className="form-check-label"
                                  style={{
                                    margin: "0px 8px 0px 8px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    value="right sleeve"
                                    name="printLocation"
                                    onChange={(event) => {
                                      setPrintLocation(event.target.value);
                                      setUploadImageError();
                                    }}
                                  />
                                  Right Sleeve
                                </label>
                                <label
                                  className="form-check-label"
                                  style={{
                                    margin: "0px 8px 0px 8px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    value="front"
                                    name="printLocation"
                                    onChange={(event) => {
                                      setPrintLocation(event.target.value);
                                      setUploadImageError();
                                    }}
                                  />
                                  Front
                                </label>
                                <label
                                  className="form-check-label"
                                  style={{
                                    margin: "0px 8px 0px 8px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <input
                                    type="radio"
                                    value="back"
                                    name="printLocation"
                                    onChange={(event) => {
                                      setPrintLocation(event.target.value);
                                      setUploadImageError();
                                    }}
                                  />
                                  Back
                                </label>
                              </div>
                              <br />
                              <br />
                              <span style={{ fontWeight: "bold" }}>
                                OEM/Branding
                              </span>
                              <br />
                              <label
                                className="form-check-label"
                                style={{
                                  margin: "0px 8px 0px 8px",
                                  cursor: "pointer",
                                }}
                              >
                                <input
                                  type="radio"
                                  value="neck heat seal label"
                                  name="printLocation"
                                  onChange={(event) => {
                                    setPrintLocation(event.target.value);
                                    setUploadImageError();
                                  }}
                                />
                                Neck Heat Seal Label(OEM/Branding) / Label MOQ
                                500
                              </label>
                              <label
                                className="form-check-label"
                                style={{
                                  margin: "0px 8px 0px 8px",
                                  cursor: "pointer",
                                }}
                              >
                                <input
                                  type="radio"
                                  value="hang tag"
                                  name="printLocation"
                                  onChange={(event) => {
                                    setPrintLocation(event.target.value);
                                    setUploadImageError();
                                  }}
                                />
                                Hang Tag(OEM/Branding) / Tag MOQ 500
                              </label>
                            </div>
                            <br />
                            <h6>
                              4. Select Print Type{" "}
                              <a href="#">(Check Example)</a>
                            </h6>
                            <select
                              className="form-control type_select"
                              name="printType"
                              id="printType"
                              value={printType}
                              onChange={(event) => {
                                setPrintType(event.target.value);
                                setUploadImageError();
                              }}
                              disabled={
                                printLocation == "neck heat seal label" ||
                                printLocation == "hang tag"
                                  ? true
                                  : null
                              }
                            >
                              {printTypeList.map((item, index) => {
                                return (
                                  <option
                                    key={`printType${index}`}
                                    value={`${item}`}
                                  >
                                    {item}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </Container.Row>
                      )}
                    </Container.Row>
                    {quantityError && (
                      <div className="my-5 col-12 d-flex">
                        <p className="text-danger">{quantityError}</p>
                      </div>
                    )}
                    {uploadImageError && (
                      <div className="my-5 col-12 d-flex">
                        <p className="text-danger">{uploadImageError}</p>
                      </div>
                    )}
                    <div className="my-5 col-12 d-flex justify-content-end">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={backTab}
                      >
                        <i className="fa fa-arrow-circle-left"></i> Back
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        style={{ marginLeft: "5px" }}
                        onClick={() => {
                          let totalQuantity =
                            (XSQuantity ? parseInt(XSQuantity) : 0) +
                            (SQuantity ? parseInt(SQuantity) : 0) +
                            (MQuantity ? parseInt(MQuantity) : 0) +
                            (LQuantity ? parseInt(LQuantity) : 0) +
                            (XLQuantity ? parseInt(XLQuantity) : 0) +
                            (XXLQuantity ? parseInt(XXLQuantity) : 0) +
                            (XXXLQuantity ? parseInt(XXXLQuantity) : 0) +
                            (XXXXLQuantity ? parseInt(XXXXLQuantity) : 0);
                          if (
                            (!XSQuantity &&
                              !SQuantity &&
                              !MQuantity &&
                              !LQuantity &&
                              !XLQuantity &&
                              !XXLQuantity &&
                              !XXXLQuantity &&
                              !XXXXLQuantity) ||
                            totalQuantity < fabric.moq
                          ) {
                            setQuantityError(
                              `You can not proceed until you order atleast ${fabric.moq} items`
                            );
                          } else if (uploadImage && !designImage) {
                            setUploadImageError(
                              "You can not proceed until you select a image"
                            );
                          } else if (uploadImage && !printLocation) {
                            setUploadImageError("Please select a print type");
                          } else {
                            nextTab();
                          }
                        }}
                      >
                        Next <i className="fa fa-arrow-circle-right"></i>
                      </button>
                    </div>
                  </Container.Simple>
                </Tab>
                <Tab
                  eventKey={4}
                  title="Contact & Shipping Info"
                  disabled={tabKey != 4}
                  style={{ marginTop: "-1rem" }}
                >
                  {/* third section */}
                  <Container.Simple className="bg-white container py-2 mb-3">
                    <h3 className="text-center">
                      Contact and Shipping Information
                    </h3>

                    <p>Contact Info</p>
                    <p>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Full Name"
                        {...register("fullName")}
                      />
                      <Container.Row className="mt-2">
                        <Container.Column className="col-sm-6">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Email"
                            {...register("email", {
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              },
                            })}
                          />
                        </Container.Column>
                        <Container.Column className="col-sm-6">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Phone Number"
                            {...register("phone")}
                          />
                        </Container.Column>
                      </Container.Row>
                    </p>
                    <p>Shipping Info</p>
                    <input
                      className="form-control mb-2"
                      type="text"
                      placeholder="Business Name (Optional)"
                      {...register("businessName")}
                    />
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Detailed Address"
                      {...register("address")}
                    />
                    <Container.Row className="my-2">
                      <Container.Column className="col-sm-6">
                        <input
                          className="form-control width-half-left"
                          type="text"
                          placeholder="City"
                          {...register("city")}
                        />
                      </Container.Column>
                      <Container.Column className="col-sm-6">
                        <input
                          className="form-control width-half-right"
                          type="text"
                          placeholder="State/Province"
                          {...register("state")}
                        />
                      </Container.Column>
                    </Container.Row>

                    <input
                      className="form-control width-half-right mb-2"
                      type="text"
                      placeholder="Post/Zip Code"
                      {...register("postCode")}
                    />
                    <select
                      className="form-control width-half-left country_select"
                      id="country"
                      {...register("country")}
                    >
                      {countryList.map((item, index) => {
                        return (
                          <option key={`country${index}`} value={`${item}`}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                    <br />
                    <br />
                    <br />
                    <p className="mb-1">Mention Delivery Deadline</p>
                    <DateRangePicker
                      startDate={startDate}
                      endDate={endDate}
                      className="form-control-sm w-100 p-3"
                      dateRange={(dates) => setDateRange(dates)}
                      monthsShown={2}
                    />
                    <br />
                    <p className="mb-1">
                      Instructions regarding the Bulk Request
                    </p>
                    <textarea
                      className="form-control"
                      type="textarea"
                      rows="3"
                      placeholder="Note regarding the quotatation request (if any)"
                      {...register("note")}
                    ></textarea>
                    <div className="my-5 col-12 d-flex justify-content-end">
                      <div
                        className="btn btn-sm btn-secondary"
                        onClick={backTab}
                      >
                        <i className="fa fa-arrow-circle-left"></i> Back
                      </div>
                      <button
                        type="submit"
                        className="btn btn-sm btn-primary"
                        style={{ marginLeft: "5px" }}
                      >
                        Submit <i className="fa fa-arrow-circle-right"></i>
                      </button>
                    </div>
                  </Container.Simple>
                </Tab>
              </Tabs>
            </form>
          </Container.Column>
          {item && item?.sizeGuide ? (
            <PrimaryModal
              show={sizeguideshow}
              onHide={() => setSizeGuideShow(!sizeguideshow)}
              size="lg"
            >
              <img src={item.sizeGuide} alt="..." />
            </PrimaryModal>
          ) : null}
        </Container.Row>
      </Container.Simple>
    </Layout2>
  );
};

export default Index;
