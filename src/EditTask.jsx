import { useState, useEffect, useContext } from "react";
import EditContext from "./EditContext";

export default function EditTask(props) {
  const [nameState, setNameState] = useState(props.name); // Stores current name
  const [tagState, setTagState] = useState(props.tags); // Stores current tags
  const [newTagState, setNewTagState] = useState("New tag"); // Stores currently added tag
  const { EditState, setEditState } = useContext(EditContext);

  //List of tags with delete buttons next to them
  function displayTags() {
    let tagArray = [];
    for (let i = 0; i < tagState.length; i++) {
      tagArray.push(
        <li key={i}>
          {tagState[i]}
          <button onClick={() => deleteTag(tagState[i])}>Delete</button>
        </li>
      );
    }
    return tagArray;
  }

  useEffect(() => {}, [setTagState]);

  // Deletes tag from the object
  function deleteTag(name) {
    const newArray = tagState.filter((tag) => tag !== name);
    setTagState(newArray);
  }

  //Adds a tag to the object and returns the tag UI to default
  function addTag() {
    const newArray = tagState;
    newArray.push(newTagState);
    setTagState(newArray);
    setNewTagState("New tag");
  }

  const closeEditTask = (save) => {
    if (save) {
      /*fetch('/tasks' {
            method: "post",
            body: JSON.stringify({

            })
        })*/
    }
    setEditState(false);
  };

  //Returns an input field, tags held in the object, tools for adding a new tag
  //and the options to cancel or save
  return (
    <>
      <input value={nameState} onChange={(e) => setNameState(e.target.value)} />
      <ul>{displayTags()}</ul>
      <input
        value={newTagState}
        onChange={(e) => setNewTagState(e.target.value)}
      />
      <button onClick={() => addTag()}> Add new Tag </button> {"\n"}
      <div>
        <button onClick={() => closeEditTask(false)}> Cancel </button>
        <button onClick={() => closeEditTask(true)}> Save </button>
      </div>
    </>
  );
}
