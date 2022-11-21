
import Offcanvas from 'react-bootstrap/Offcanvas'
import { X } from 'react-feather'
import { Text } from '../text'
import { DangerButton } from '../button'

export const Drawer = (props) => {
  return (
    <>
      <Offcanvas
        show={props.show}
        onHide={props.onHide}
        placement={props.placement}
        style={{ width: props.width, border: 0 }}
      >
        {props.isHeader ?
          <Offcanvas.Header className="d-flex">
            <Text className="fs-20 mb-0 fw-bolder">{props.title}</Text>
            <DangerButton className="btn-circle" onClick={props.onHide}>
              <X size={18} />
            </DangerButton>
          </Offcanvas.Header>
          : null
        }
        <Offcanvas.Body>
          {props.children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}