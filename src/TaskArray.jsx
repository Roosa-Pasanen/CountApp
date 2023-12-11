import { useEffect, useState } from "react";
import Task from "./task.jsx";

export default function TaskArray() {
  const [displayState, setDisplayState] = useState(null); // Current information in the system

  // Fetches and parses the information
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

  //Creates a task list out of the information in the database
  function createTaskList() {
    try {
      const info = displayState;
      if (info == null) {
        //Nothing has been loaded yet
        return <p>Fetching database information, please wait a moment</p>;
      } else {
        let taskArray = [];
        for (let i = 0; i < info.length; i++) {
          taskArray.push(
            //Create an array of tasks
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
