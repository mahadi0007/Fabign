import React from "react";
import { X } from "react-feather";
import { Modal } from "react-bootstrap";
import { DangerButton } from "../button";
import { Text } from "../text";
import router from "next/router";

export const OrderSuccessModal = (props) => {
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
      </Modal.Body>
    </Modal>
  );
};
