import React from 'react';

class TaskList extends React.Component {
    render() {
        if(!this.props.tasks) {
            return null;
        }
        var sortedTasksArray = [];
        sortedTasksArray.push(this.props.priorities[0].displayText);
        sortedTasksArray.push(this.makeTaskCategory("high", true));
        sortedTasksArray.push(this.makeTaskCategory("high", false));
        sortedTasksArray.push(this.props.priorities[1].displayText);
        sortedTasksArray.push(this.makeTaskCategory("med", true));
        sortedTasksArray.push(this.makeTaskCategory("med", false));
        sortedTasksArray.push(this.props.priorities[2].displayText);
        sortedTasksArray.push(this.makeTaskCategory("low", true));
        sortedTasksArray.push(this.makeTaskCategory("low", false));

        return (
            <div>
                {
                    sortedTasksArray.map((taskArrayItem, index) => (
                        typeof(taskArrayItem) === "string" ? (
                            sortedTasksArray[index + 1].length > 0 || sortedTasksArray[index + 2].length > 0 ? (
                                <div key={taskArrayItem}>
                                    <h1>{taskArrayItem}.</h1>
                                </div>
                            ) : null
                        ) : (
                            taskArrayItem.map((task) => (
                                <div key={task.id} className="taskCard activeTaskCard">
                                    <div className={task.priority + " priorityColorBar"}>
                                        <a href="#" className="taskStatusBtn" onClick={(e) => this.finishTask(e, task)}>
                                            <i className="fa fa-check" aria-hidden="true"></i>
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
                        )
                    ))
                }
            </div>
        );
    }

    makeTaskCategory(priority, due) {

        var taskArrayItem = this.props.tasks.filter((task) => {
                return task.priority === priority && task.finished === false && Boolean(task.due) === due;
        });
        
        if(due) {
            taskArrayItem.sort(function(a,b){
                return a.due - b.due;
            });
        } else {
            taskArrayItem.sort(function(a,b) {
                return a.id - b.id;
            });
        }
        return taskArrayItem;
    }

    finishTask(e, task) {
        e.preventDefault();

        // update localStorage
        var taskList = JSON.parse(localStorage.tasks);
        for(var i = 0; i < taskList.length; i++) {
            if(taskList[i].id === task.id) {
                taskList[i].finished = true;
            }
        }
        var taskListString = JSON.stringify(taskList);
        localStorage.setItem("tasks", taskListString);

        // update state
        this.props.onChange(taskList);

        // scroll to bottom after finishing task
        window.scrollTo(0, document.body.scrollHeight);
    }
}

export default TaskList
