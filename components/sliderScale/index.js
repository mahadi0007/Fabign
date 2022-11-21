import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

const SliderScale = forwardRef((props, ref) => {
  const slots = 40;
  const [end, setEnd] = useState(10);
  const [scale, setScale] = useState([]);
  const [slider, setSlider] = useState([]);

  useImperativeHandle(ref, () => ({
    endValueChange(value) {
      setEnd(Math.ceil(value / 10));
    },
  }));

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    let slot = Number(e.target.dataset.slot);

    if (isNaN(slot)) return;

    if (slot <= 0) return;
    setEnd(slot);
    props.outputChange(slot * 10);
  };

  const MaxSlider = () => {
    return (
      <div
        data-slider="max"
        draggable="true"
        className="slider-thumb slider-thumb-max"
      ></div>
    );
  };

  useEffect(() => {
    let scale = [];
    let slider = [];
    let maxThumb = null;

    for (let i = 0; i <= slots; i++) {
      let label = "";

      if (i == 0 || i == 10 || i == 20 || i == 30 || i == 40) {
        label = i * 10;
      }

      scale.push(
        <div key={i} className="slot-scale">
          {label}
        </div>
      );

      if (i === end) {
        maxThumb = <MaxSlider />;
      } else {
        maxThumb = null;
      }

      let lineClass = "";
      if (i === slots) {
        lineClass += "";
      } else {
        lineClass += "line";
      }
      if (i >= 0 && i < end) {
        lineClass += " line-selected";
      }
      slider.push(
        <div
          data-slot={i}
          onDragOver={onDragOver}
          onTouchMove={onDragOver}
          onTouchEnd={onDrop}
          onDrop={onDrop}
          onDragEnter={onDrop}
          onDragLeave={onDrop}
          key={i}
          className="slot"
        >
          <div data-slot={i} className={lineClass} />
          <span className="scale-mark"></span>
          {maxThumb}
        </div>
      );
    }

    setScale(scale);
    setSlider(slider);
  }, [end]);

  return (
    <div className="mb-3">
      <div className="example-1">
        <div className="slider-container">
          <div className="slider-scale">{scale}</div>
          <div className="slider">{slider}</div>
        </div>
      </div>
    </div>
  );
});

SliderScale.displayName = "SliderScale";

export default SliderScale;
