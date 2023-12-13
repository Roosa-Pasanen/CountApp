import { useContext, useEffect, useState } from "react";
import Task from "./task.jsx";
import DatabaseContext from "./DatabaseContext.jsx";
import EditTask from "./EditTask.jsx";
import EditContext from "./EditContext.jsx";
import connection from "./connection.js";

export default function TaskArray() {
  const [displayState, setDisplayState] = useState(null);
  const { dbState, setDbState } = useContext(DatabaseContext);
  const [editState, setEditState] = useState(false); //Stores editing state
  const [idState, setIdState] = useState(undefined);
  const [nameState, setNameState] = useState("New Task");
  const [tagState, setTagState] = useState([]); //Stores tags
  const editValue = {
    editState,
    setEditState,
    idState,
    setIdState,
    nameState,
    setNameState,
    tagState,
    setTagState,
  }; //Passed through context

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

  useEffect(() => {
    if (idState !== undefined) {
      try {
        let info = displayState;
        console.log(info);
        info.push(JSON.stringify({ idState, nameState, tagState }));
        setDisplayState(info);
        setIdState(undefined);
        setNameState("New Task");
        setTagState([]);
      } catch (error) {}
    }
  }, [editValue]);

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
            <Task
              key={info[i].id}
              id={info[i].id}
              name={info[i].name}
              tags={info[i].tags}
            />
          );
        }
        return (
          <div>
            <EditContext.Provider value={editValue}>
              <EditTask newID={info.length} name={nameState} tags={tagState} />
            </EditContext.Provider>
            <div>{taskArray}</div>
          </div>
        );
      }
    } catch (err) {
      return <p>Something went wrong while fetching from database</p>;
    }
  }

  return createTaskList();
}
