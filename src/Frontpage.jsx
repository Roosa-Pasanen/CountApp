import TaskArray from "./TaskArray.jsx";
import EditTask from "./EditTask.jsx";

export default function Frontpage() {
  return (
    <>
      <EditTask name={"hello"} tags={["hi", "hello", "moi"]} />
      <TaskArray />
    </>
  );
}
