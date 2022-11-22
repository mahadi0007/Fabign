import React, { useState, useEffect } from "react";
import { Container } from "../container";
import { useWindowSize } from "../window/windowSize";
import Image from "next/image";
import { Requests } from "../../utils/Http";

export const Gallery = (props) => {
  const size = useWindowSize();
  const [largeImage, setLargeImage] = useState();

  useEffect(() => {
    setLargeImage(
      props.variant && Object.keys(props.variant).length > 0
        ? props.variant.images[0]
        : props.product && props.product.featuredImage
        ? props.product.featuredImage.large
        : ""
    );
  }, [props]);

  return (
    <Container.Row>
      {/* Large images container */}
      <Container.Column className="mb-2">
        {largeImage ? (
          <Image
            src={Requests.HostUrl + largeImage}
            alt=".."
            height={1000}
            width={1000}
          />
        ) : null}
      </Container.Column>
      {/* Small images container */}
      <Container.Column>
        {props &&
        props.product.variation &&
        props.product.variation.parents.length > 0 ? (
          <div className="d-flex justify-content-start me-3">
            {props &&
              props.variant &&
              props.variant.images &&
              props.variant.images.map((item, i) => (
                <div
                  key={i}
                  className="border float-left m-1"
                  onClick={() => setLargeImage(item)}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    src={Requests.HostUrl + item}
                    className="img-fluid"
                    alt="..."
                    height={100}
                    width={120}
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className="d-flex justify-content-start me-3">
            {props &&
              props.product &&
              props.product.galleryImages &&
              props.product.galleryImages.map((item, i) => (
                <div
                  key={i}
                  className="border float-left m-1"
                  onClick={() => setLargeImage(item.large)}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    src={Requests.HostUrl + item.large}
                    className="img-fluid"
                    alt="..."
                    height={100}
                    width={120}
                  />
                </div>
              ))}
          </div>
        )}
      </Container.Column>
    </Container.Row>
  );
};
