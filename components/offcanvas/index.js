import { Offcanvas } from "react-bootstrap";
import { Text } from "../text";

export const Canvas = (props) => {
  return (
    <Offcanvas
      show={props.show}
      onHide={() => props.setFabricOption(!props.show)}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <Text>{props.title}</Text>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{props.children}</Offcanvas.Body>
    </Offcanvas>
  );
};
