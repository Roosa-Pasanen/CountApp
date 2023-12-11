import { useEffect, useState } from "react";
import Task from "./task.jsx";

export default function TaskArray() {
  const [displayState, setDisplayState] = useState(null);

  useEffect(() => {
    async function dataFetch() {
      try {
        const info = await fetch("http://localhost:3010/tasks");
        const infoparse = await info.json();
        setDisplayState(infoparse);
      } catch (err) {
        console.log(err);
      }
    }
    dataFetch();
  }, []);

  function createTaskList() {
    try {
      const info = displayState;
      if (info == null) {
        return <p>Fetching database information, please wait a moment</p>;
      } else {
        let taskArray = [];
        for (let i = 0; i < info.length; i++) {
          taskArray.push(
            <Task key={info[i].id} name={info[i].name} tags={info[i].tags} />
          );
        }
        return taskArray;
      }
    } catch (err) {
      return <p>Something went wrong while fetching from database</p>;
    }
  }

  return createTaskList();
}
