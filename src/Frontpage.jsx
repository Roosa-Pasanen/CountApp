import React from "react";
import Task from "./task.jsx";

export default class Frontpage extends React.Component {
  constructor(props) {
    super(props);
    this.createTaskList = this.createTaskList.bind(this);
    this.state = {
      display: "",
    };
  }

  async componentDidMount() {
    try {
      const info = await fetch("http://localhost:3010/tasks");
      const infoparse = await info.json();
      this.setState({
        display: infoparse,
      });
      console.log(infoparse);
    } catch (err) {
      console.log(err);
    }
  }

  /*componentDidUpdate() {
  }*/

  createTaskList() {
    const info = this.state.display;
    let taskArray = [];
    for (let i = 0; i < info.length; i++) {
      console.log(info[i].name + ": " + info[i].tags);
      taskArray.push(
        <Task key={info[i].id} name={info[i].name} tags={info[i].tags} />
      );
    }
    return taskArray;
  }

  render() {
    return this.createTaskList();
  }
}
