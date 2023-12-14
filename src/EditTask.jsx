import { useState, useEffect, useContext } from "react";
import EditContext from "./EditContext";
import DeleteContext from "./DeleteContext.jsx";
import connection from "./connection.js";

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
  const { deleteId, setDeleteId } = useContext(DeleteContext);

  // Stores current name
  const [newNameState, setNewNameState] = useState(props.name);
  // Stores current tags
  const [editTagState, setEditTagState] = useState(props.tags);
  // Stores a possible new tag
  const [newTagState, setNewTagState] = useState("New tag");

  /**
   * List of tags with a delete button next to them corresponding to each tag.
   * @returns - The array with the list
   */
  function displayTags() {
    let tagArray = [];
    for (let i = 0; i < editTagState.length; i++) {
      tagArray.push(
        // Tag name + delete button for the tag
        <li key={i}>
          {editTagState[i]}
          <button onClick={() => deleteTag(editTagState[i])}>Delete</button>
        </li>
      );
    }
    return tagArray;
  }

  /**
   * Add a new tag to the editable object and return the UI to normal
   */
  function addTag() {
    const newArray = editTagState;
    newArray.push(newTagState);
    setEditTagState(newArray);
    setNewTagState("New tag");
  }

  /**
   * Sends filters out a tag and sets the filtered out array as the current state.
   * @param {String} name - The currently being filtered out tag's name
   */
  function deleteTag(name) {
    const newArray = editTagState.filter((tag) => tag !== name);
    setEditTagState(newArray);
  }

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
          setTagState(editTagState);
          await connection.putEntry(
            "http://localhost:3010/tasks",
            idState,
            newNameState,
            editTagState
          );
        } catch (err) {
          console.log("Connection error");
        }
      } else {
        try {
          setIdState(props.newID);
          setNameState(newNameState);
          setTagState(editTagState);
          await connection.postEntry(
            "http://localhost:3010/tasks",
            idState,
            newNameState,
            editTagState
          );
        } catch (err) {
          console.log(err);
          console.log("Connection error");
        }
      }
    }
    setEditState(false);
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
      <ul>{displayTags()}</ul>
      <input
        value={newTagState}
        onChange={(e) => setNewTagState(e.target.value)}
      />
      <button onClick={() => addTag()}> Add new Tag </button> {"\n"}
      <div>
        <button onClick={() => closeEditTask(false)}> Cancel </button>
        <button onClick={() => closeEditTask(true)}> Save </button>
        {deleteButton()}
      </div>
    </>
  );
}
