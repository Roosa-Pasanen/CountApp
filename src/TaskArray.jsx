import { useContext, useEffect, useState } from "react";
import Task from "./task.jsx";
import DatabaseContext from "./DatabaseContext.jsx";
import connection from "./connection.js";

export default function TaskArray() {
  const [displayState, setDisplayState] = useState(null);
  const { dbState, setDbState } = useContext(DatabaseContext);

  // Fetches and parses the information

  useEffect(() => {
    async function dataFetch() {
      try {
        const info = await connection.fetchAll("http://localhost:3010/tasks");
        setDisplayState(info);
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
