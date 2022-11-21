import React from "react";

const Display = (props) => {
  const { Canvas, onReady } = props;

  return (
    <>
      <div id="sshot" className="text-center" style={props.style}>
        {props.back === "front" ? (
          <div
            id="shirtDiv"
            className="page"
            style={{
              width: "530px",
              height: "630px",
              position: "relative",
              backgroundColor: props.color ? props.color : "white",
            }}
          >
            <img
              className="img-fluid"
              name="tshirtview"
              id="tshirtFacing"
              src={props.image && props.image.main_image}
              alt="dynamic"
            />
            {props.Canvas && (
              <div
                id="drawingArea"
                style={{
                  position: "absolute",
                  top: "100px",
                  left: "165px",
                  zIndex: "1",
                  width: "200px",
                  height: "400px",
                }}
              >
                <Canvas
                  width="200"
                  height="400"
                  style={{
                    webkitUserSelect: "none",
                  }}
                  className="sample-canvas"
                  onReady={onReady}
                />
              </div>
            )}
            {props.onDemand && (
              <span
                id="printable"
                style={{
                  position: "relative",
                  top: "-8rem",
                }}
              >
                Printable Area: 14&quot; X 16&quot;
              </span>
            )}
          </div>
        ) : props.back === "right" ? (
          <div
            id="shirtBack"
            className="page"
            style={{
              width: "530px",
              height: "630px",
              position: "relative",
              backgroundColor: props.color ? props.color : "white",
            }}
          >
            <img
              className="img-fluid"
              src={props.image && props.image.right_image}
              alt="dynamic"
            />
            {props.Canvas && (
              <div
                id="drawingArea"
                style={{
                  position: "absolute",
                  top: "210px",
                  left: "165px",
                  zIndex: "1",
                  width: "200px",
                  height: "400px",
                }}
              >
                <Canvas className="sample-canvas" onReady={onReady} />
              </div>
            )}
            {props.onDemand && (
              <span
                id="printable"
                style={{
                  position: "relative",
                  top: "-1rem",
                }}
              >
                Printable Area: 14&quot; X 16&quot;
              </span>
            )}
          </div>
        ) : props.back === "left" ? (
          <div
            id="shirtBack"
            className="page"
            style={{
              width: "530px",
              height: "630px",
              position: "relative",
              backgroundColor: props.color ? props.color : "white",
            }}
          >
            <img
              className="img-fluid"
              src={props.image && props.image.left_image}
              alt="dynamic"
            />
            {props.Canvas && (
              <div
                id="drawingArea"
                style={{
                  position: "absolute",
                  top: "210px",
                  left: "165px",
                  zIndex: "1",
                  width: "200px",
                  height: "400px",
                }}
              >
                <Canvas className="sample-canvas" onReady={onReady} />
              </div>
            )}
            {props.onDemand && (
              <span
                id="printable"
                style={{
                  position: "relative",
                  top: "-1rem",
                }}
              >
                Printable Area: 14&quot; X 16&quot;
              </span>
            )}
          </div>
        ) : (
          <div
            id="shirtBack"
            className="page"
            style={{
              width: "530px",
              height: "630px",
              position: "relative",
              backgroundColor: props.color ? props.color : "white",
            }}
          >
            <img
              className="img-fluid"
              src={props.image && props.image.back_image}
              alt="dynamic"
            />
            {props.Canvas && (
              <div
                id="drawingArea"
                style={{
                  position: "absolute",
                  top: "100px",
                  left: "165px",
                  zIndex: "1",
                  width: "200px",
                  height: "400px",
                }}
              >
                <Canvas className="sample-canvas" onReady={onReady} />
              </div>
            )}
            {props.onDemand && (
              <span
                id="printable"
                style={{
                  position: "relative",
                  top: "-8rem",
                }}
              >
                Printable Area: 14&quot; X 16&quot;
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Display;
