import React from "react";

const EditContext = React.createContext({
  editState: "false",
  setEditState: () => {},
  idState: undefined,
  nameState: "Name",
  setNameState: () => {},
  tagState: [],
  setTagState: () => {},
});

export default EditContext;
