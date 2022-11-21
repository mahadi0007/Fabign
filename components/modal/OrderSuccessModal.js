import React, { useCallback, useEffect, useState } from "react";
import { X } from "react-feather";
import { Modal } from "react-bootstrap";
import { DangerButton, PrimaryButton } from "../button";
import { Text } from "../text";
import router from "next/router";
import { Requests } from "../../utils/Http";

export const OrderSuccessModal = (props) => {
  const [data, setData] = useState([]);

  // fetching main category
  const fetchCategory = useCallback(async () => {
    try {
      const response = await Requests.LandingPage.Category();
      if (response.status === 200 && response.data.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <Modal
      show={props.show}
      size={props.size}
      centered
      onHide={() => router.push("/")}
    >
      <Modal.Header className="border-0 px-1 py-1">
        <div className="d-flex w-100">
          <div>
            <Text className="fs-17 fw-bolder mt-2 mb-0">
              {props.title ? props.title : null}
            </Text>
          </div>
          <div className="ms-auto">
            <DangerButton
              onClick={() => router.push("/")}
              className="btn-circle"
            >
              <X size={18} />
            </DangerButton>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="text-center px-20">
          <img
            src="/assets/order-success.svg"
            width={100}
            height={100}
            className="img-fluid m-0"
            alt="Hiring tailor success"
          />

          <Text className="fs-25 fw-bolder mb-0">Thanks for your request!</Text>
          <Text className="fs-14 mt-3 mb-0">
            Thanks for submit the request!
          </Text>
          <Text className="fs-14 mb-0">
            We will contact with you as soon as possible.
          </Text>
          <Text className="fs-14 fw-bolder mt-3">
            If you want, you can tailor your own clothes and Become a Freelance
            designer.
          </Text>
        </div>
        <div
          className="text-center py-4 rounded-bottom"
          style={{ backgroundColor: "#e9ecef" }}
        >
          <PrimaryButton
            className="py-1 px-2"
            onClick={() => router.push(`/studio/${data && data[0]._id}`)}
          >
            <Text className="fs-15 mb-0">Start Tailoring</Text>
          </PrimaryButton>

          <PrimaryButton
            className="btn-dark-blue py-1 px-2 ms-3 border-0"
            onClick={() => router.push("/print-on-demand")}
          >
            <Text className="fs-15 mb-0">Start Designing</Text>
          </PrimaryButton>
        </div>
      </Modal.Body>
    </Modal>
  );
};
