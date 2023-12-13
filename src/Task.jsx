import { useState, useEffect } from "react";
import EditTask from "./EditTask";
import EditContext from "./EditContext.jsx";

export default function Task(props) {
  const [idState, setIdState] = useState(props.id);
  const [nameState, setNameState] = useState(props.name);
  const [tagState, setTagState] = useState(props.tags); //Stores tags
  const [tagElementState, setTagElementState] = useState(0);
  const [editState, setEditState] = useState(false); //Stores editing state
  const value = {
    editState,
    setEditState,
    idState,
    nameState,
    setNameState,
    tagState,
    setTagState,
  }; //Passed through context

  // Create a visual effect where you can see the tags
  useEffect(() => {
    try {
      let tagArray = [];
      for (let i = 0; i < tagState.length; i++) {
        tagArray.push(<li key={i}>{tagState[i]}</li>);
      }
      setTagElementState(<ul>Tags: {tagArray} </ul>);
    } catch (err) {
      console.log(err);
    }
  }, [editState, tagState]);

  // Returns either a UI for the Task or opens an EditTask object
  function editable() {
    if (!editState) {
      return (
        <div style={{ backgroundColor: "antiquewhite" }}>
          <b>{nameState}</b>
          <button onClick={() => setEditState(true)}> Edit </button>
          <div>{tagElementState}</div>
        </div>
      );
    } else {
      //console.log(props.id);
      return (
        <EditContext.Provider value={value}>
          <div>
            <EditTask name={nameState} tags={tagState} />
          </div>
        </EditContext.Provider>
      );
    }
  }

  return editable();
}
