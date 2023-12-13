import { useEffect, useState } from "react";
import Task from "./task.jsx";
import DeleteContext from "./DeleteContext.jsx";
import EditTask from "./EditTask.jsx";
import EditContext from "./EditContext.jsx";
import connection from "./connection.js";

export default function TaskArray() {
  const [displayState, setDisplayState] = useState(null);
  const [deleteId, setDeleteId] = useState(undefined);
  const deleteValue = { deleteId, setDeleteId };
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
    if (deleteId !== undefined) {
      const newInfo = displayState.filter((task) => task.id !== deleteId);
      setDisplayState(newInfo);
      setDeleteId(undefined);
    }
  }, [deleteId, displayState]);

  useEffect(() => {
    if (idState !== undefined) {
      let info = displayState;
      info.push({
        id: idState,
        name: nameState,
        tags: tagState,
      });
      setDisplayState(info);
      setIdState(undefined);
    }
  }, [idState, displayState, nameState, tagState]);

  const newTask = () => {
    if (displayState != null) {
      if (editState) {
        return (
          <div>
            <div>
              <EditContext.Provider value={editValue}>
                <EditTask
                  newID={displayState[displayState.length - 1].id + 1}
                  name={"New Task"}
                  tags={[]}
                />
              </EditContext.Provider>
            </div>
            <div>{createTaskList()}</div>
          </div>
        );
      } else {
        return (
          <div>
            <div>
              <button
                onClick={() => {
                  setEditState(true);
                }}
              >
                Create new task
              </button>
            </div>
            <div>{createTaskList()}</div>
          </div>
        );
      }
    } else {
      return <></>;
    }
  };

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
            <DeleteContext.Provider key={info[i].id} value={deleteValue}>
              <Task id={info[i].id} name={info[i].name} tags={info[i].tags} />
            </DeleteContext.Provider>
          );
        }
        return taskArray;
      }
    } catch (err) {
      console.log(err);
      return <p>Something went wrong while fetching from database</p>;
    }
  }

  return (
    <div>
      <div>{newTask()}</div>
    </div>
  );
}
