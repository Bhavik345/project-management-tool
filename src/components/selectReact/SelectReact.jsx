import React from "react";
import Select from "react-select";

const SelectReact = ({ options, placeholder, onChangeHandle }) => {
  return (
    <>
      <div className="mb-5">
        <Select
          options={options}
          placeholder={placeholder}
          onChange={onChangeHandle}
        />
      </div>
    </>
  );
};

export default SelectReact;
