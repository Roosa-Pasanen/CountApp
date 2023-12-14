import { useEffect, useState } from "react";
import Task from "./task.jsx";
import DeleteContext from "./DeleteContext.jsx";
import EditTask from "./EditTask.jsx";
import EditContext from "./EditContext.jsx";
import connection from "./connection.js";
import TagList from "./TagList.jsx";

export default function TaskArray() {
  // Stores the current database information
  const [displayState, setDisplayState] = useState(null);

  // Holds the task id of a task that should be deleted
  const [deleteId, setDeleteId] = useState(undefined);
  const deleteValue = { deleteId, setDeleteId };

  // Stores if a new task UI should be shown and the default values for it
  const [editState, setEditState] = useState(false); //Stores editing state
  const [idState, setIdState] = useState(undefined); //Stores tag
  const [nameState, setNameState] = useState("New Task"); //Stores nane
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

  // Stores currently filtered results
  const [filterState, setFilterState] = useState([]);

  /**
   * Fetches and parses the information from the database
   * Sets that information in a state
   */
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

  /**
   * If a new task is added, it is pushed to the list of displayed tasks
   */
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

  /**
   * If there's something in the deleteId, the task corresponding to that id
   * gets filtered out of the list of displayed tasks
   */
  useEffect(() => {
    if (deleteId !== undefined) {
      const newInfo = displayState.filter((task) => task.id !== deleteId);
      setDisplayState(newInfo);
      setDeleteId(undefined);
    }
  }, [deleteId, displayState]);

  /**
   * If the data
   *  - has been fetched
   *      - If a new task is being edited
   *          -> Editing UI for the new task + list of all the tasks
   *      - If no edited task
   *          -> A button for opening the new task + list of all the tasks
   *  - hasn't been fetched -> return that the information is being fetched
   *
   * -> If something goes wrong, show error
   */
  const newTask = () => {
    try {
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
        return <p>Fetching database information, please wait a moment</p>;
      }
    } catch (err) {
      console.log(err);
      return <p>Something went wrong while fetching from database</p>;
    }
  };

  /**
   *  Create a list of the tasks in the database
   * @returns - The created list
   */
  function createTaskList() {
    const info = displayState;
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

  const filterResults = () => {};

  /**
   * Returns the entire UI
   */
  return (
    <div>
      <div>
        <TagList />
      </div>
      <div>{newTask()}</div>
    </div>
  );
}
