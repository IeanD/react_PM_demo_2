import React from 'react';

class NewTask extends React.Component {
    render() {
        return (
            <form onSubmit={(e) => {this.saveTask(e)}}>
                <div className="newTaskForm container">
                    <div className="col-md-10">
                        <input ref="task" className="taskNameInput form-control" type="text" placeholder="New Task" required />
                        <select ref="priority" className="form-control priorityInput" defaultValue="med">
                            <option value="high">High</option>
                            <option value="med">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <div className="formDueDate">
                            <b>Due Date (opt.):</b>
                            <input ref="deadline" className="form-control dueDateInput" type="date" />
                        </div>
                    </div>
                    <div className="col-md-2 addTaskBtn-container">
                        <button type="submit" className="addTaskBtn">
                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </form>
        );
    }

    saveTask(e) {
        e.preventDefault();

        var taskText = this.refs.task.value;
        var priority = this.refs.priority.value;
        var deadline = this.refs.deadline.value;

        var task = {
            text: taskText,
            due: deadline,
            finished: false,
            priority: priority,
            id: Date.now()
        };

        var taskList;
        if (localStorage.tasks) {
            taskList = JSON.parse(localStorage.tasks);
        } else {
            taskList = [];
        }
        taskList.push(task);
        var taskListString = JSON.stringify(taskList);
        localStorage.setItem("tasks", taskListString);

        // update this.state
        this.props.onAdd(taskList);

        // clear task form after adding task
        this.refs.task.value = "";
        this.refs.priority.value = "med";
        this.refs.deadline.value = "";
    }
}

export default NewTask
