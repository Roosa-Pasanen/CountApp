import React from "react";

const SelectionContext = React.createContext({
  newTagState: "",
  setNewTagState: () => {},
  tagArrayState: [],
  setTagArrayState: () => {},
  globalTagState: [],
  setGlobalTagState: () => {},
});

export default SelectionContext;
