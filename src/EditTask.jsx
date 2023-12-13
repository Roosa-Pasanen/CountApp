import { useState, useEffect, useContext } from "react";
import EditContext from "./EditContext";
import DeleteContext from "./DeleteContext.jsx";
import connection from "./connection.js";

export default function EditTask(props) {
  const [newNameState, setNewNameState] = useState(props.name); // Stores current name
  const [editTagState, setEditTagState] = useState(props.tags); // Stores current tags
  const [newTagState, setNewTagState] = useState("New tag"); // Stores currently added tag
  const {
    EditState,
    setEditState,
    idState,
    setIdState,
    nameState,
    setNameState,
    tagState,
    setTagState,
  } = useContext(EditContext);
  const { deleteId, setDeleteId } = useContext(DeleteContext);

  //List of tags with delete buttons next to them
  function displayTags() {
    let tagArray = [];
    for (let i = 0; i < editTagState.length; i++) {
      tagArray.push(
        <li key={i}>
          {editTagState[i]}
          <button onClick={() => deleteTag(editTagState[i])}>Delete</button>
        </li>
      );
    }
    return tagArray;
  }

  useEffect(() => {}, [setEditTagState]);

  // Deletes tag from the object
  function deleteTag(name) {
    connection.deleteEntry();
    const newArray = editTagState.filter((tag) => tag !== name);
    setEditTagState(newArray);
  }

  //Adds a tag to the object and returns the tag UI to default
  function addTag() {
    const newArray = editTagState;
    newArray.push(newTagState);
    setEditTagState(newArray);
    setNewTagState("New tag");
  }

  const deleteTask = async () => {
    try {
      await connection.deleteEntry("http://localhost:3010/tasks", idState);
      setDeleteId(idState);
    } catch (err) {
      console.log("Connection error");
    }
    setEditState(false);
  };

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

  //Returns an input field, tags held in the object, tools for adding a new tag
  //and the options to cancel or save
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
