import React from 'react';
import logo from './logo.svg';
import SettingsLink from './settingsLink.js'
import Heading from './header.js'
import NewTask from './newTask.js'
import TaskList from './taskList.js'
import FinishedTasks from './finishedTasks.js'
import Footing from './footer.js'
import './style.css';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        var priorities;
        if(localStorage.priorities) {
            priorities = JSON.parse(localStorage.getItem("priorities"));
        } else {
            window.location.href="./index.html";
        }

        this.state = {
            priorities: priorities
        };
    }

    render() {
        return (
            <div>
                <Heading />
                <PrioritySettings
                    priorities={this.state.priorities}
                    changeSetting={(order, newSetting) => this.changeSetting(order, newSetting)}
                />
            </div>
        );
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
}

export default Settings
