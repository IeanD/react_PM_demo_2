import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SettingsLink from './settingsLink.js'
import Heading from './header.js'
import NewTask from './newTask.js'
import TaskList from './taskList.js'
import FinishedTasks from './finishedTasks.js'
import PrioritySettings from './prioritySettings.js'
import './style.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        var priorities;
        if(localStorage.priorities) {
            priorities = JSON.parse(localStorage.getItem("priorities"));
        } else {
            priorities = [
                {
                    priority: "high",
                    displayText: "1-2 days",
                },
                {
                    priority: "med",
                    displayText: "3-5 days",
                },
                {
                    priority: "low",
                    displayText: "On the Backburner",
                }
            ]
            var stringedPriorities = JSON.stringify(priorities);
            localStorage.setItem("priorities", stringedPriorities);
        }

        this.state = {
            tasks: [],
            priorities: priorities,
            settings: false
        };
    }

    componentDidMount() {
        var taskListJson = localStorage.getItem('tasks');
        var taskList = JSON.parse(taskListJson);

        if (taskList) {
            this.setState({
                tasks: taskList
            });
        }
    }

    render() {
        return (
            <div className="container">
                {
                    !this.state.settings ? (
                        <SettingsLink 
                            onClick={(e) => this.changeToSettings(true)}
                        />
                    ) : null
                }
                <Heading 
                    onClick={(e) => this.changeToSettings(false)}
                />
                {
                    !this.state.settings ? (
                        <div>
                            <NewTask
                                onAdd={(taskList) => this.updateTasks(taskList)}
                            /> 
                            
                            <ReactCSSTransitionGroup
                                transitionName="tasks"
                                transitionAppear={true}
                                transitionAppearTimeout={500}
                                transitionEnter={false}
                                transitionLeave={false}>
                                    <TaskList 
                                        tasks={this.state.tasks}
                                        onChange={(taskList) => this.updateTasks(taskList)}
                                        priorities={this.state.priorities}
                                    />
                            </ReactCSSTransitionGroup>

                            <FinishedTasks
                                tasks={this.state.tasks}    
                                onChange={(taskList) => this.updateTasks(taskList)}            
                            />
                        </div>
                    ) : (
                            <div>
                                <ReactCSSTransitionGroup
                                    transitionName="tasks"
                                    transitionAppear={true}
                                    transitionAppearTimeout={500}
                                    transitionEnter={false}
                                    transitionLeave={false}>
                                        <PrioritySettings
                                            priorities={this.state.priorities}
                                            changeSetting={(order, newSetting) => this.changeSetting(order, newSetting)}
                                        />
                                </ReactCSSTransitionGroup>
                            </div>
                    )
                }
            </div> // container
        );
    }

    updateTasks(taskList) {
        this.setState({
            tasks: taskList
        });
    }

    changeSetting(order, newSetting) {
        var newPriorities = this.state.priorities;
        newPriorities[order].displayText = newSetting;

        this.setState ({
            priorities: newPriorities
        });

        var stringedPriorities = JSON.stringify(newPriorities);
        localStorage.setItem("priorities", stringedPriorities);
    }

    changeToSettings(trueFalse) {

        this.setState({
            settings: trueFalse
        });
    }

}

export default App;
