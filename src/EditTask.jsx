import { useState, useEffect, useContext } from "react";
import EditContext from "./EditContext";
import TaskContext from "./TaskContext.jsx";
import connection from "./connection.js";
import TagList from "./TagList.jsx";
import SelectionContext from "./SelectionContext.jsx";

/**
 * React component for editing tasks
 */
export default function EditTask(props) {
  // EditContext variables
  const {
    EditState, //Should this component be shown?
    setEditState,
    idState, // Task's ID in database
    setIdState,
    nameState, // Task's name in database
    setNameState,
    tagState, // Task's tags in database
    setTagState,
  } = useContext(EditContext);

  // DeleteContext variables
  // ID is set to deleteId if user wants to delete the task from databse
  const { deleteId, setDeleteId } = useContext(TaskContext);

  // Stores current name
  const [newNameState, setNewNameState] = useState(props.name);
  // Stores current tags
  const [tagArrayState, setTagArrayState] = useState(props.tags);
  // Stores a possible new tag
  const [newTagState, setNewTagState] = useState("New tag");

  const { globalTagState, setGlobalTagState } = useContext(SelectionContext);

  const tagValue = {
    newTagState,
    setNewTagState,
    tagArrayState,
    setTagArrayState,
    globalTagState,
  };

  /**
   * Closes the element.
   * If the component is to be saved:
   *  -> If idState is undefined, the task is a new one
   *    -> Post request is made
   *  -> If idState is defined, the task already exists
   *    -> Put request with the new information is made
   * @param {*} save - Should changes made be kept?
   */
  const closeEditTask = async (save) => {
    if (save) {
      if (idState !== undefined) {
        try {
          setNameState(newNameState);
          setTagState(tagArrayState);
          addGlobalTags();
          await connection.putEntry(
            "http://localhost:3010/tasks",
            idState,
            newNameState,
            tagArrayState
          );
        } catch (err) {
          console.log("Connection error");
        }
      } else {
        try {
          setIdState(props.newID);
          setNameState(newNameState);
          setTagState(tagArrayState);
          addGlobalTags();
          await connection.postEntry(
            "http://localhost:3010/tasks",
            idState,
            newNameState,
            tagArrayState
          );
        } catch (err) {
          console.log(err);
          console.log("Connection error");
        }
      }
    }
    setEditState(false);
  };

  const addGlobalTags = () => {
    for (let i = 0; i < tagArrayState.length; i++) {
      let exists = false;
      for (let j = 0; j < globalTagState.length; j++) {
        if (tagArrayState[i] == globalTagState[j]) {
          exists = true;
        }
      }
      if (!exists) {
        let arr = globalTagState;
        arr.push(tagArrayState[i]);
        setGlobalTagState(arr);
      }
    }
  };

  /**
   * Returns a delete button to delete the task if the task already exists in
   * the database.
   * @returns A delete button
   */
  const deleteButton = () => {
    if (idState !== undefined) {
      return (
        <button
          onClick={() => {
            deleteTask();
          }}
        >
          Delete Task
        </button>
      );
    }
  };

  /**
   * Deletes the task in question.
   * Sends a delete request to the database and tells the local memory to remove
   * the current task.
   */
  const deleteTask = async () => {
    try {
      await connection.deleteEntry("http://localhost:3010/tasks", idState);
      setDeleteId(idState);
    } catch (err) {
      console.log("Connection error");
    }
    setEditState(false);
  };

  /**
   * Returns an object with
   *  - Task's name
   *  - Task's tags
   *  - A field for a new tag to be added (with the add button)
   *  - Cancel button (exit without saving)
   *  - Save button (exit with saving)
   *
   * If the task already exists in the database
   *  - Delete button
   */
  return (
    <>
      <input
        value={newNameState}
        onChange={(e) => setNewNameState(e.target.value)}
      />
      <div>
        <SelectionContext.Provider value={tagValue}>
          <TagList new={"Add new Tag"} />
        </SelectionContext.Provider>
      </div>
      <div>
        <button onClick={() => closeEditTask(false)}> Cancel </button>
        <button onClick={() => closeEditTask(true)}> Save </button>
        {deleteButton()}
      </div>
    </>
  );
}
