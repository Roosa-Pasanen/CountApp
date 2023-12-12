import { React, useState } from "react";
import TaskArray from "./TaskArray.jsx";
import EditTask from "./EditTask.jsx";

export default function Frontpage() {
  // Returns an array of tasks with a UI for adding a new task on top
  // TO DO: Add a button that opens the EditTask component
  const [editState, setEditState] = useState(false); //Stores editing state
  const value = { editState, setEditState }; //Passed through context
  const EditContext = React.createContext({
    editState: "false",
    setEditState: () => {},
  });

  return (
    <>
      <EditContext.Provider value={value}>
        <EditTask name={"New Task"} tags={["hi", "hello", "moi"]} />
      </EditContext.Provider>
      <TaskArray />
    </>
  );
}
