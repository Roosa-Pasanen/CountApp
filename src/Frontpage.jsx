import React, { useState, useEffect } from "react";
import TaskArray from "./TaskArray.jsx";
import EditTask from "./EditTask.jsx";
import EditContext from "./EditContext.jsx";

export default function Frontpage() {
  // Returns an array of tasks with a UI for adding a new task on top
  // TO DO: Add a button that opens the EditTask component
  const [editState, setEditState] = useState(false); //Stores editing state
  const editValue = { editState, setEditState }; //Passed through context

  return (
    <>
      <EditContext.Provider value={editValue}>
        <EditTask name={"New Task"} tags={["hi", "hello", "moi"]} />
      </EditContext.Provider>
      <TaskArray />
    </>
  );
}
