import React from 'react'
import { X } from 'react-feather'
import { Modal } from 'react-bootstrap'
import { DangerButton } from '../button'
import { Text } from '../text'

export const PrimaryModal = (props) => {
    return (
        <Modal
            show={props.show}
            size={props.size}
            centered
            onHide={props.onHide}
        >
            <Modal.Header className="border-0 ">
                <div className="d-flex w-100">
                    <div><Text className="fs-17 fw-bolder mt-2 mb-0">{props.title}</Text></div>
                    <div className="ms-auto">
                        <DangerButton
                            type="button"
                            onClick={props.onHide}
                            className="btn-circle"
                        >
                            <X size={18} />
                        </DangerButton>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body className="px-20 pb-4 pt-0">
                {props.children}
            </Modal.Body>
        </Modal>
    );
};

