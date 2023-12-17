import { useContext } from "react";
import SelectionContext from "./SelectionContext";

/**
 * React component allowing you to pick options from a list
 * @returns Input object that accepts text and offers options
 */
export default function TagDropdown() {
  const { newTagState, setNewTagState, globalTagState } =
    useContext(SelectionContext);

  /**
   * Creates an option array out of the objects in globalTagState
   * @returns option array
   */
  const createTagArray = () => {
    const tagArray = [];
    if (globalTagState !== null) {
      for (let i = 0; i < globalTagState.length; i++) {
        tagArray.push(<option key={i} value={globalTagState[i]} />);
      }
    }
    return tagArray;
  };

  /**
   * Return an input field that suggests options
   */
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
