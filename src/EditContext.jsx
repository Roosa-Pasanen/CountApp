import React from "react";

const EditContext = React.createContext({
  editState: "false",
  setEditState: () => {},
});

export default EditContext;
