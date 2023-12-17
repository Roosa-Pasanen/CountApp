import { useState, useEffect, useContext } from "react";
import EditTask from "./EditTask";
import EditContext from "./EditContext.jsx";
import TaskContext from "./TaskContext.jsx";

/*React component for individual task elements. */
export default function Task(props) {
  //States passed through context to the EditTask.jsx for
  const [editState, setEditState] = useState(false); // Can component be edited?
  const [idState, setIdState] = useState(props.id); //Task's database id
  const [nameState, setNameState] = useState(props.name); //Task's name
  const [tagState, setTagState] = useState(props.tags); //Task's tags
  const value = {
    editState,
    setEditState,
    idState,
    nameState,
    setNameState,
    tagState,
    setTagState,
  };

  const { setPositionState } = useContext(TaskContext);

  // Used for the currently shown tags wrapped in <li> form
  const [tagElementState, setTagElementState] = useState(0);

  /**
   * Used for creating a <li> list of tags.
   *
   * tagArray = the list of <li> form tags
   * tagState = the list of plaintext tags
   */
  useEffect(() => {
    try {
      let tagArray = [];
      for (let i = 0; i < tagState.length; i++) {
        tagArray.push(<li key={i}>{tagState[i]}</li>);
      }
      setTagElementState(<ul>Tags: {tagArray} </ul>);
    } catch (err) {
      console.log(err);
    }
  }, [editState, tagState]);

  /**
   * props.first = whether the object is the first one in an array
   * props.last = whether the object is the last one in an array
   *
   * Logic checks that the topmost and bottom-most objects aren't given
   * unallowed movement options
   *
   * @returns movement buttons
   */
  const movement = () => {
    if (props.first) {
      return (
        <button
          onClick={() => {
            setPositionState([idState, -1]);
          }}
        >
          {"Down"}
        </button>
      );
    } else if (props.last) {
      return (
        <button
          onClick={() => {
            setPositionState([idState, 1]);
          }}
        >
          {"Up"}
        </button>
      );
    } else {
      return (
        <>
          <button
            onClick={() => {
              setPositionState([idState, 1]);
            }}
          >
            {"Up"}
          </button>
          <button
            onClick={() => {
              setPositionState([idState, -1]);
            }}
          >
            {"Down"}
          </button>
        </>
      );
    }
  };

  /**
   * If editState is false (the component isn't in an editable state)
   *  => Return a <div> element with the name, editing button, component movement
   * buttons and a list of tags
   *
   * If editState is true => Return an EditTask component
   *
   * States can be switched by pressing the "Edit" button
   */

  function editable() {
    if (!editState) {
      return (
        <div style={{ backgroundColor: "antiquewhite" }}>
          <b>{nameState}</b>
          <button onClick={() => setEditState(true)}> Edit </button>
          {movement()}
          <div>{tagElementState}</div>
        </div>
      );
    } else {
      return (
        <EditContext.Provider value={value}>
          <div>
            <EditTask name={nameState} tags={tagState} />
          </div>
        </EditContext.Provider>
      );
    }
  }

  return editable();
}
