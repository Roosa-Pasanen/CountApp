import { useState, useEffect } from "react";

export default function Task(props) {
  const [tagState, setTagState] = useState(0);
  const [editState, setEditState] = useState(false);

  useEffect(() => {
    let tagArray = [];
    console.log(props.name + " (task.jsx): " + props.tags);
    for (let i = 0; i < props.tags.length; i++) {
      tagArray.push(<li key={i}>{props.tags[i]}</li>);
    }
    setTagState(<ul>Tags: {tagArray} </ul>);
  }, [props.tags, props.name]);

  useEffect(() => {}, [setEditState]);

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
        <div>
          <p>Bop</p>
          <button onClick={() => setEditState(false)}> oops </button>
        </div>
      );
    }
  }

  return editable();
}
