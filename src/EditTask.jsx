import { useState, useEffect } from "react";

export default function EditTask(props) {
  const [nameState, setNameState] = useState(props.name);
  const [tagState, setTagState] = useState(props.tags);
  const [newTagState, setNewTagState] = useState("New tag");

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

  function deleteTag(name) {
    const newArray = tagState.filter((tag) => tag !== name);
    console.log(newArray);
    setTagState(newArray);
  }

  function addTag() {
    const newArray = tagState;
    newArray.push(newTagState);
    setTagState(newArray);
    setNewTagState("New tag");
  }

  return (
    <>
      <input value={nameState} onChange={(e) => setNameState(e.target.value)} />
      {displayTags()}
      <input
        value={newTagState}
        onChange={(e) => setNewTagState(e.target.value)}
      />
      <button onClick={() => addTag()}> Add new Tag </button> {"\n"}
      <div>
        <button> Cancel </button>
        <button> Save </button>
      </div>
    </>
  );
}
