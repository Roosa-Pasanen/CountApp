import { useContext } from "react";
import SelectionContext from "./SelectionContext";

export default function TagDropdown() {
  const { newTagState, setNewTagState, globalTagState } =
    useContext(SelectionContext);

  const createTagArray = () => {
    const tagArray = [];
    if (globalTagState !== null) {
      for (let i = 0; i < globalTagState.length; i++) {
        tagArray.push(<option key={i} value={globalTagState[i]} />);
      }
    }
    return tagArray;
  };

  return (
    <>
      <input
        list="tags"
        value={newTagState}
        onChange={(e) => setNewTagState(e.target.value)}
      />
      <datalist id="tags">{createTagArray()}</datalist>
    </>
  );
}
