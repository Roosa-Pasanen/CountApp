import { useState, useEffect } from "react";
import EditTask from "./EditTask";

export default function Task(props) {
  const [tagState, setTagState] = useState(0);
  const [editState, setEditState] = useState(false);

  useEffect(() => {
    let tagArray = [];
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
          <EditTask name={props.name} tags={props.tags} />
        </div>
      );
    }
  }

  return editable();
}
