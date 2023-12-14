import { useContext } from "react";
import SelectionContext from "./SelectionContext";

export default function TagDropdown() {
  const { newTagState, setNewTagState } = useContext(SelectionContext);
  const createTagArray = () => {
    const tagArray = [];
    return tagArray;
  };

  return (
    <>
      <input
        list="tags"
        value={newTagState}
        onChange={(e) => setNewTagState(e.target.value)}
      />
      <datalist id="tags">
        <option value="Nuq" />
        <option value="Nuqquu" />
        <option value="Busy" />
        <option value="Koodaa" />
        <option value="Ok" />
      </datalist>
    </>
  );
}
