import { useState, useContext } from "react";
import TagDropdown from "./TagDropdown";
import SelectionContext from "./SelectionContext";

export default function TagList() {
  const { newTagState, setNewTagState, tagArrayState, setTagArrayState } =
    useContext(SelectionContext);

  /**
   * Create an Array of the currently filtered tags and their delete buttons
   * @returns
   */
  const createTagArray = () => {
    const tagArray = [];
    for (let i = 0; i < tagArrayState.length; i++) {
      tagArray.push(
        <div key={i}>
          {tagArrayState[i]}{" "}
          <button
            onClick={() => {
              deleteTag(tagArrayState[i]);
            }}
          >
            {" "}
            Delete{" "}
          </button>
        </div>
      );
    }
    return tagArray;
  };

  /**
   * Sends filters out a tag and sets the filtered out array as the current state.
   * @param {String} name - The currently being filtered out tag's name
   */
  function deleteTag(name) {
    const newArray = tagArrayState.filter((tag) => tag !== name);
    setTagArrayState(newArray);
  }

  /**
   * Add a new tag to the editable object and return the UI to normal
   */
  const addTag = () => {
    let repeatTag = false;
    for (let i = 0; i < tagArrayState.length; i++) {
      if (newTagState == tagArrayState[i]) {
        repeatTag = true;
      }
    }
    if (!repeatTag) {
      const tagArray = tagArrayState;
      tagArray.push(newTagState);
      setNewTagState("");
      setTagArrayState(tagArray);
    }
  };

  return (
    <>
      {"Filter results:  "}
      <TagDropdown />
      <button
        onClick={() => {
          addTag();
        }}
      >
        {"Add filter tag"}
      </button>
      <div>{createTagArray()}</div>
    </>
  );
}
