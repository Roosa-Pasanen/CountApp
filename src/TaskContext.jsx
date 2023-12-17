import React from "react";

const TaskContext = React.createContext({
  deleteId: undefined,
  setDeleteId: () => {},
  positionState: [undefined, undefined],
  setPositionState: () => {},
});

export default TaskContext;
