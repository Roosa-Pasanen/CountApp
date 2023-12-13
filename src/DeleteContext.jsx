import React from "react";

const EditContext = React.createContext({
  deleteId: undefined,
  setDeleteId: () => {},
});

export default EditContext;
