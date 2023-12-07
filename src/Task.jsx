import React, { useState, useEffect } from "react";

export default function Task(props) {
  const [tagState, setTagState] = useState(0);

  useEffect(() => {
    let tagArray = [];
    console.log(props.name + " (task.jsx): " + props.tags);
    for (let i = 0; i < props.tags.length; i++) {
      tagArray.push(<li key={i}>{props.tags[i]}</li>);
    }
    setTagState(<ul>Tags: {tagArray} </ul>);
  }, [props.tags]);

  return (
    <div style={{ backgroundColor: "antiquewhite" }}>
      <b>{props.name}</b>
      <div>{tagState}</div>
    </div>
  );
}
