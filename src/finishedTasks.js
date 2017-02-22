import React from 'react';

class FinishedTasks extends React.Component {
    render() {
        if(!this.props.tasks) {
            return null;
        }

        var finishedTasksArray = this.makeFinishedArray();

        return (
            finishedTasksArray.length > 0 ? (
                    <div id="finishedTaskContainer">
                        <h1>Finished.</h1>
                        <div>
                            {
                                finishedTasksArray.map((task) => (
                                    <div key={task.id} className="taskCard finishedTaskCard">
                                        <div className={task.priority + "-finished priorityColorBar"}>
                                            <a href="#" className="taskStatusBtn" onClick={(e) => this.removeTask(e, task)}>
                                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                                            </a>
                                            <a href="#" className="taskStatusBtn" onClick={(e) => this.restoreTask(e, task)}>
                                                <i className="fa fa-undo" aria-hidden="true"></i>
                                            </a>
                                            <h3>{task.text}</h3>
                                            {
                                                task.due !== "" ? (
                                                    <p className="dueDate"><b>Due:</b> {task.due}</p>
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            ) : null
        );
    }

    removeTask(e, task) {
        e.preventDefault();

        // update localStorage
        var taskList = JSON.parse(localStorage.tasks);
        var index = taskList.findIndex((currTask) => {
            return currTask.id === task.id;
        });
        taskList.splice(index, 1);

        var taskListString = JSON.stringify(taskList);
        localStorage.setItem("tasks", taskListString);

        // update state
        this.props.onChange(taskList);
    }

    restoreTask(e, task) {
        e.preventDefault();

        // update localStorage
        var taskList = JSON.parse(localStorage.tasks);
        taskList.find((currTask) => {
            return currTask.id === task.id;
        })
        .finished = false;

        var taskListString = JSON.stringify(taskList);
        localStorage.setItem("tasks", taskListString);

        // update state
        this.props.onChange(taskList);
    }

    makeFinishedArray() {
        var finishedArray = this.props.tasks.filter((task) => {
            return task.finished === true;
        });
        finishedArray.sort(function(a,b) {
            return a.id - b.id;
        });

        return finishedArray;
    }
}

export default FinishedTasks
