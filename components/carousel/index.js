import React, { useState, useEffect, useCallback } from "react";
import { Carousel } from "react-bootstrap";
import { Container } from "../container";
import Icon from "react-icons-kit";
import { chevronLeft, chevronRight } from "react-icons-kit/feather";
import { Text } from "../text";
import { Requests } from "../../utils/Http/index";
import parse from "html-react-parser";

export const CarouselDev = () => {
  const [sliders, setSliders] = useState([]);
  // fetching carousel data
  const fetchCarouselData = useCallback(async () => {
    try {
      const response = await Requests.Slider.Index();
      setSliders(response.data.body);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    fetchCarouselData();
  }, []);

  return (
    <div className="custom-slider-container">
      <div className="slider-container">
        <Carousel
          nextIcon={
            <Icon icon={chevronRight} className="next-icon" size={25} />
          }
          prevIcon={<Icon icon={chevronLeft} className="prev-icon" size={25} />}
        >
          {sliders.map((item, index) => (
            <Carousel.Item key={index}>
              <div className="slider-card">
                <a href={item.hyperlink}>
                  <img
                    src={Requests.HostUrl + item.banner}
                    className="img-fluid img"
                    alt="..."
                  />
                </a>
                <Container.Simple className="contents">
                  <div className="carouselbar_section">
                    <div className="text-start container ps-5 ms-lg-5">
                      <Text className="text-white fs-22 pb-0 mb-0 text-decoration-none d-none d-md-block">
                        {parse(item.title)}
                      </Text>
                      <Text className="text-white fs-18 d-none d-md-block">
                        {parse(item.details)}
                      </Text>
                    </div>
                  </div>
                </Container.Simple>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
