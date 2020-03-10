import React from "react";
import { connect } from "react-redux";
import { resetErrorMessage } from "../actions";

const Error = ({ errorMessage, handleDismissClick }) => {
  if (!errorMessage) return null;
  return (
    <div
      className="container"
      style={{ border: "1px red solid", padding: "10px" }}
    >
      <p style={{ color: "red" }}>Error: {errorMessage}</p>
      <button onClick={handleDismissClick}>Dismiss</button>
    </div>
  );
};

const mapStateToProps = state => ({
  errorMessage: state.errorMessage
});

const mapDispatchToProps = dispatch => ({
  handleDismissClick: () => dispatch(resetErrorMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Error);
