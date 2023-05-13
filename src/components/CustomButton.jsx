import React from "react";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import PropTypes from "prop-types";

const CustomButton = ({ loading, text, ...props }) => {
  return <Button {...props} loading={loading} disabled={loading} />;
};

CustomButton.defaultProps = {
  loading: false,
  text: "",
};

CustomButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
};

export default CustomButton;
