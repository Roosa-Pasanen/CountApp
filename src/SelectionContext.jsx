import React from "react";

const SelectionContext = React.createContext({
  newTagState: "",
  setNewTagState: () => {},
  tagArray: [],
  setTagArray: () => {},
});

export default SelectionContext;
