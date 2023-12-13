import React from "react";

const NewContext = React.createContext({
  editState: false,
  setEditState: () => {},
  idState: undefined,
  nameState: "Name",
  setNameState: () => {},
  tagState: [],
  setTagState: () => {},
});

export default NewContext;
