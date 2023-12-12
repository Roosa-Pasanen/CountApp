import { useState, useEffect } from "react";
import EditTask from "./EditTask";
import EditContext from "./EditContext.jsx";

export default function Task(props) {
  const [tagState, setTagState] = useState(0); //Stores tags
  const [editState, setEditState] = useState(false); //Stores editing state
  const value = { editState, setEditState }; //Passed through context

  // Create a visual effect where you can see the tags
  useEffect(() => {
    let tagArray = [];
    for (let i = 0; i < props.tags.length; i++) {
      tagArray.push(<li key={i}>{props.tags[i]}</li>);
    }
    setTagState(<ul>Tags: {tagArray} </ul>);
  }, [props.tags, props.name]);

  useEffect(() => {}, [setEditState]);

  // Returns either a UI for the Task or opens an EditTask object
  function editable() {
    if (!editState) {
      return (
        <div style={{ backgroundColor: "antiquewhite" }}>
          <b>{props.name}</b>
          <button onClick={() => setEditState(true)}> Edit </button>
          <div>{tagState}</div>
        </div>
      );
    } else {
      return (
        <EditContext.Provider value={value}>
          <div>
            <EditTask name={props.name} tags={props.tags} />
          </div>
        </EditContext.Provider>
      );
    }
  }

  return editable();
}
