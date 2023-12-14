import React from "react";

const SelectionContext = React.createContext({
  newTagState: "",
  setNewTagState: () => {},
  tagArrayState: [],
  setTagArrayState: () => {},
});

export default SelectionContext;
