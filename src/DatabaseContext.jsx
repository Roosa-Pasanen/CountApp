import React from "react";

const DatabaseContext = React.createContext({
  DbState: null,
  setDbState: () => {},
});

export default DatabaseContext;
