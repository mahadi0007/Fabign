// Primary button
export const PrimaryButton = (props) => {
  return (
    <button
      type={props.type}
      style={props.style}
      disabled={props.disabled}
      className={`btn btn-primary ${props.className} shadow-none`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

// Secondary button
export const SecondaryButton = (props) => {
  return (
    <button
      type={props.type}
      style={props.style}
      disabled={props.disabled}
      className={`btn btn-secondary ${props.className} shadow-none`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

// Danger circle button
export const DangerButton = (props) => {
  return (
    <button
      type={props.type}
      style={props.style}
      disabled={props.disabled}
      className={`btn btn-danger border-0 ${props.className} shadow-none`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

// Gray Button
export const GrayButton = (props) => {
  return (
    <button
      type={props.type}
      style={props.style}
      disabled={props.disabled}
      className={`btn btn-gray border-0 ${props.className} shadow-none`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
