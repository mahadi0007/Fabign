import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import { Modal } from "react-bootstrap";
import { DangerButton, PrimaryButton } from "../button";
import { Text } from "../text";
import router from "next/router";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton,
  PinterestShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  WhatsappIcon,
  FacebookMessengerIcon,
  PinterestIcon,
} from "react-share";

export const CampaignSuccessModal = (props) => {
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

          <Text className="fs-25 fw-bolder mb-0">
            Thanks for creating your campaign!
          </Text>
          <div className="my-3">
            <input
              type="text"
              readOnly
              value={`${"https://efgtailor.com/odp/" + props.url}`}
              style={{ width: "70%" }}
            />
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${"https://efgtailor.com/odp/" + props.url}`
                );
              }}
            >
              Copy
            </button>
          </div>
          <div className="d-flex justify-content-evenly">
            <EmailShareButton
              title={"E-Mail"}
              url={`${"https://efgtailor.com/odp/" + props.url}`}
              hashtags={["efg"]}
            >
              <EmailIcon size={32} round />
              <br />
              <p>E-Mail</p>
            </EmailShareButton>
            <FacebookShareButton
              title={"Facebook"}
              url={`${"https://efgtailor.com/odp/" + props.url}`}
              hashtags={["efg"]}
            >
              <FacebookIcon size={32} round />
              <br />
              <p>Facebook</p>
            </FacebookShareButton>
            <TwitterShareButton
              title={"Twitter"}
              url={`${"https://efgtailor.com/odp/" + props.url}`}
              hashtags={["efg"]}
            >
              <TwitterIcon size={32} round />
              <br />
              <p>Twitter</p>
            </TwitterShareButton>
          </div>
          <div className="d-flex justify-content-evenly">
            <WhatsappShareButton
              title={"WhatsApp"}
              url={`${"https://efgtailor.com/odp/" + props.url}`}
              hashtags={["efg"]}
            >
              <WhatsappIcon size={32} round />
              <br />
              <p>WhatsApp</p>
            </WhatsappShareButton>
            <FacebookMessengerShareButton
              title={"Messenger"}
              url={`${"https://efgtailor.com/odp/" + props.url}`}
              hashtags={["efg"]}
            >
              <FacebookMessengerIcon size={32} round />
              <br />
              <p>Messenger</p>
            </FacebookMessengerShareButton>
            <PinterestShareButton
              title={"Pinterest"}
              url={`${"https://efgtailor.com/odp/" + props.url}`}
              media={`${"https://efgtailor.com/odp/" + props.url}`}
              hashtags={["efg"]}
            >
              <PinterestIcon size={32} round />
              <br />
              <p>Pinterest</p>
            </PinterestShareButton>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
