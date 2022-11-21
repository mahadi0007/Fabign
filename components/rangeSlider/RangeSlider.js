import React from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 1;
const MIN = 0;
const MAX = 400;

class Slider extends React.Component {
  state = {
    values: [10],
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "2em",
        }}
      >
        <Range
          values={this.state.values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => {
            this.setState({ values });
            this.props.setOutput(values[0]);
            if (this.props.setEstimatedProfit) {
              this.props.setEstimatedProfit(values[0] * 100);
            }
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: this.state.values,
                    colors: ["rgb(247, 168, 50)", "#ccc"],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "42px",
                width: "12px",
                borderRadius: "2px",
                border: "1px solid rgb(247, 168, 50)",
                backgroundColor: "#F7A832f",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              <div
                style={{
                  height: "16px",
                  width: "5px",
                  backgroundColor: isDragged ? "rgb(247, 168, 50)" : "#CCC",
                }}
              />
            </div>
          )}
        />
        {/* <output style={{ marginTop: "30px" }} id="output">
          {this.state.values[0].toFixed(1)}
        </output> */}
      </div>
    );
  }
}

export default Slider;
