import { useState, useEffect } from "react";

export default function Task(props) {
  const [tagState, setTagState] = useState(0);
  const [editState, setEditState] = useState(false);

  useEffect(() => {
    let tagArray = props.tags.map((tag) => <li>{tag}</li>);
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
