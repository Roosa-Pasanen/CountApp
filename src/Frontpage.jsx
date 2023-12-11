import TaskArray from "./TaskArray.jsx";
import EditTask from "./EditTask.jsx";

export default function Frontpage() {
  // Returns an array of tasks with a UI for adding a new task on top
  // TO DO: Add a button that opens the EditTask component
  return (
    <>
      <EditTask name={"New Task"} tags={["hi", "hello", "moi"]} />
      <TaskArray />
    </>
  );
}
