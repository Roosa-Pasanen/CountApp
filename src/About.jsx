export default function About() {
  return (
    <div>
      <b>Instructions:</b>
      <p>The app displays tasks saved in the database.</p>
      <p>
        You may edit the saved data by pressing the "Edit" button. You may
        change the task name and add/delete tags in the edit view. Modifications
        aren't automatically saved - you may back out by pressing "Cancel."
        "Save" saves the given information locally and to the database. "Delete
        Task" deletes the task both locally and from the database.
      </p>
      <p>
        You may create a new task by pressing the "Create new task" button.
        "Save" saves the task locally and to the database.
      </p>
      <p>
        You may filter tasks by their tags by typing in "Filtered tags" and
        pressing "Add new filter". Only tasks that have all the tags in the
        filter will be displayed
      </p>
      <p>
        You may move the tasks up and down the screen by pressing the "up" and
        "down buttons". Note that these changes are only local, because the
        instructions didn't ask them to be saved to the database.
      </p>

      <p>There is no time-taking functionality.</p>

      <b>Code info</b>
      <p>Used external libraries: React, json-server </p>
      <p>Usage of AI: none</p>
      <p>Total coding time: 21h</p>
      <ul>
        Biggest obstacles while coding:
        <li>Figuring out how react context works</li>
        <li>Contacting json-server</li>
        <li>Getting the app to render locally saved information</li>
      </ul>
      <b>App and code made by Roosa Pasanen</b>
      <p>(The cat picture was also taken by Roosa Pasanen)</p>
    </div>
  );
}
