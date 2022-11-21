import React, { useState, useEffect, useCallback } from "react";
import { Layout2 } from "../../components/layout";
import { Container } from "../../components/container";
// icons
import Cover from "../../public/assets/bulk-img/wholesale-cover.png";
import Image1 from "../../public/assets/bulk-img/1.png";
import Image2 from "../../public/assets/bulk-img/2.png";
import Image3 from "../../public/assets/bulk-img/3.png";
import Image4 from "../../public/assets/bulk-img/4.png";
import Image5 from "../../public/assets/bulk-img/5.png";
import Image6 from "../../public/assets/bulk-img/6.png";
import Image7 from "../../public/assets/bulk-img/7.png";
import Skitto from "../../public/assets/bulk-img/skitto.png";
import Ygap from "../../public/assets/bulk-img/ygap.png";
import Kaspersky from "../../public/assets/bulk-img/kaspersky.png";
import Rotary from "../../public/assets/bulk-img/rotary.png";
import Paywell from "../../public/assets/bulk-img/paywell.png";
import Man from "../../public/assets/bulk-img/man.png";
import Iflix from "../../public/assets/bulk-img/iflix.png";
import Radionext from "../../public/assets/bulk-img/radionext.png";
import Wfp from "../../public/assets/bulk-img/wfp.png";
import Souls from "../../public/assets/bulk-img/souls.png";
import Crypticfate from "../../public/assets/bulk-img/crypticfate.png";
import Ccollective from "../../public/assets/bulk-img/ccollective.png";
import { Requests } from "../../utils/Http";
import { useRouter } from "next/dist/client/router";

const Index = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  // fetch bulkproducts
  const fetchProducts = useCallback(async () => {
    try {
      const response = await Requests.BulkProduct.Index();
      if (response && response.status === 200) {
        console.log(response.data);
        setData(response.data.data);
      }
    } catch (error) {
      if (error) {
        console.log("error");
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout2 title="Event tshirt - Wholesale | EFGFashion">
      <Container.Simple>
        <img className="img-fluid" src={Cover.src} alt="" />
        {/* <div>
          <div
            className="img-fluid"
            style={{ backgroundImage: `url('${Cover.src}')` }}
          >
            <p>EFG PREMIUM</p>
            <h1>BUY CUSTOM T-SHIRT</h1>
            <p>Print-on-demand (or POD) is an order fulfillment</p>
            <p>method where items are printed as soon as an order</p>
            <p>is made</p>
            <button className="btn btn-primary">SHOP NOW</button>
            <button className="btn btn-primary">VIEW</button>
          </div>
        </div> */}
        <h3 className="text-center mt-5 mb-3">Choose Your Preferred Tshirt</h3>
        <Container.Row className="justify-content-center">
          {data
            ? data.map((item, index) => {
                return (
                  <Container.Column
                    className="col-sm-3 text-center"
                    key={`bulkProduct${index}`}
                    onClick={() => {
                      router.push(`/corporate/${item._id}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img className="img-fluid" src={item.main_image} alt="" />
                    <h5>{item.product_name}</h5>
                  </Container.Column>
                );
              })
            : null}
        </Container.Row>
        <Container.Row className="text-center mt-5">
          <h3 className="text-center">
            Boost your brand with Custom t-shirts.
          </h3>
          <p>
            Improve Your Brand Value & Identity With Corporate Clothing. It is a
            huge marketing strategy that needs to be taken seriously in the
            current digital age. Managing and nurturing your corporate brand
            goes beyond just marketing as it will be the overarching idea that
            ties your whole company together. <br />
          </p>
        </Container.Row>
        <Container.Row>
          <Container.Column className="col-sm-2 offset-sm-5 text-center">
            {/* <a href={"/corporate/1"}> */}
            <button className="btn btn-primary">Order Now!</button>
            {/* </a> */}
          </Container.Column>
        </Container.Row>
        <Container.Row>
          <Container.Column className="col-sm-4 text-center">
            <img
              className="border p-3 rounded-circle"
              src={Image5.src}
              alt=""
            />
            <h4>Premium Quality Tshirt</h4>
            <p>
              We only produce premium blend which is cozy, comfortable yet lasts
              the test of time. Our products are manufactured at a high level of
              quality and attention-to-detail..
            </p>
          </Container.Column>
          <Container.Column className="col-sm-4 text-center">
            <img
              className="border p-3 rounded-circle"
              src={Image6.src}
              alt=""
            />
            <h4>Trusted by Consumers</h4>
            <p>
              Fabrilife is trusted by organizations, businesses and individuals.
              We have over 95% customer satisfication rate. Our incredible
              customer service will make you feel safe.
            </p>
          </Container.Column>
          <Container.Column className="col-sm-4 text-center">
            <img
              className="border p-3 rounded-circle"
              src={Image7.src}
              alt=""
            />
            <h4>Faster Shipment</h4>
            <p>
              We know time is important for you and you just have to tell us
              your deadline, even it is within overnight. You sleep sound and
              let us handle your headache.
            </p>
          </Container.Column>
        </Container.Row>
        <Container.Row className="mt-5 text-center">
          <h3>Work with us Today</h3>
          <p>
            We are proud to work with over thousand customers that we call
            friends. As your partner, we value long-term relationships and
            collaborate toward results.
          </p>
          <Container.Column className="col-sm-3 text-center">
            <img className="px-5 py-3 img-fluid" src={Skitto.src} alt="" />
          </Container.Column>
          <Container.Column className="col-sm-3 text-center">
            <img className="px-5 py-3 img-fluid" src={Ygap.src} alt="" />
          </Container.Column>
          <Container.Column className="col-sm-3 text-center">
            <img className="px-5 py-3 img-fluid" src={Kaspersky.src} alt="" />
          </Container.Column>
          <Container.Column className="col-sm-3 text-center">
            <img className="px-5 py-3 img-fluid" src={Rotary.src} alt="" />
          </Container.Column>
          <Container.Column className="col-sm-3 text-center">
            <img className="px-5 py-3 img-fluid" src={Paywell.src} alt="" />
          </Container.Column>
          <Container.Column className="col-sm-3 text-center">
            <img className="px-5 py-3 img-fluid" src={Man.src} alt="" />
          </Container.Column>
          <Container.Column className="col-sm-3 text-center">
            <img className="px-5 py-3 img-fluid" src={Iflix.src} alt="" />
          </Container.Column>
          <Container.Column className="col-sm-3 text-center">
            <img className="px-5 py-3 img-fluid" src={Radionext.src} alt="" />
          </Container.Column>
          <Container.Column className="col-sm-3 text-center">
            <img className="px-5 py-3 img-fluid" src={Wfp.src} alt="" />
          </Container.Column>
          <Container.Column className="col-sm-3 text-center">
            <img className="px-5 py-3 img-fluid" src={Souls.src} alt="" />
          </Container.Column>
          <Container.Column className="col-sm-3 text-center">
            <img className="px-5 py-3 img-fluid" src={Crypticfate.src} alt="" />
          </Container.Column>
          <Container.Column className="col-sm-3 text-center">
            <img className="px-5 py-3 img-fluid" src={Ccollective.src} alt="" />
          </Container.Column>
        </Container.Row>
      </Container.Simple>
    </Layout2>
  );
};

export default Index;
