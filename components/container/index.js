// Simple Container
const Simple = (props) => {
  return (
    <div
      className={props.className ? props.className + " container" : "container"}
      style={props.style}
      id={props.id && props.id}
    >
      {props.children}
    </div>
  );
};

// Fluid Container
const Fluid = (props) => {
  return (
    <div
      className={
        props.className
          ? props.className + " container-fluid"
          : "ms-5 me-5 ps-5 pe-5 px-lg-5"
      }
      style={props.style}
    >
      {props.children}
    </div>
  );
};

// Row
const Row = (props) => {
  return (
    <div
      className={props.className ? props.className + " row" : "row"}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

// Column
const Column = (props) => {
  return (
    <div
      className={props.className ? props.className + " col-12" : "col-12"}
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export const Container = { Simple, Fluid, Row, Column };
