import React from 'react';

class PrioritySettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false,
            priorityOption: null,
            settingChanged: false
        };
    }

    render() {
        return (
            <div className="container">
                <h2 className="settings-heading">
                    Rename your piority headings?
                </h2>
                {
                    this.props.priorities.map((priority) => 
                        <div key={priority.priority} className="taskCard activeTaskCard">
                            <div className={priority.priority + " priorityColorBar"}>
                                <a href="#" className="taskStatusBtn" onClick={(e) => this.updatePriorityText(e, priority.priority)}>
                                    <i className="fa fa-check" aria-hidden="true"></i>
                                </a>
                                <input ref={priority.priority} type="text" defaultValue={priority.displayText}></input>
                            </div>
                        </div>
                    )
                }
                {
                    this.state.settingChanged ? (
                        <div className="alert alert-success priority-changed-alert" role="alert">
                            <strong>Well done!</strong> Priority heading has been renamed!
                        </div>
                    ) : null
                }
            </div>
        );
    }

    updatePriorityText(e, priority) {
        var priorityText;
        var priorityOrder;
        if(priority === "high") {
            priorityText = this.refs.high.value;
            priorityOrder = 0;
        } else if(priority === "med") {
            priorityText = this.refs.med.value;
            priorityOrder = 1;
        } else {
            priorityText = this.refs.low.value;
            priorityOrder = 2;
        }
        this.setState({settingChanged: true});
        this.props.changeSetting(priorityOrder, priorityText);
    }

}

export default PrioritySettings
