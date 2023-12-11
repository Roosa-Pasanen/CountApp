import { useState, useEffect } from "react";

export default function EditTask(props) {
  const [nameState, setNameState] = useState(props.name);
  return (
    <>
      <input value={nameState} onChange={(e) => setNameState(e.target.value)} />
    </>
  );
}
