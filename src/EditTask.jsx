import { useState, useEffect } from "react";

export default function EditTask(props) {
  const [nameState, setNameState] = useState("Default");
  return (
    <>
      <input value={nameState} onChange={(e) => setNameState(e.target.value)} />
    </>
  );
}
