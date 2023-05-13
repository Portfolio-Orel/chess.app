import React from "react";
import { View, Picker } from "react-native";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Dropdown = ({ items, onItemSelected }) => {
  const initialValues = {
    selected: items && items.length > 0 ? items[0].value : "",
  };

  useEffect(() => {
    onItemSelected(initialValues.selected);
  }, []);

  const onSubmit = (values) => {
    onItemSelected(values.selected);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View>
      <Picker
        selectedValue={formik.values.clubId}
        onValueChange={formik.handleChange("selected")}
      >
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

Dropdown.defaultProps = {
  items: [],
};

Dropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  onItemSelected: PropTypes.func.isRequired,
};

export default Dropdown;
