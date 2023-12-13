import React, { useState, useEffect } from "react";
import TaskArray from "./TaskArray.jsx";

export default function Frontpage() {
  // Returns an array of tasks with a UI for adding a new task on top
  return (
    <>
      <TaskArray />
    </>
  );
}
