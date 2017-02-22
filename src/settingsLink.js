import React from 'react';

class SettingsLink extends React.Component {
    render() {
        return (
            <div>
                <a href="#" className="settingsLink" onClick={(e) => this.buttonClicked(e)}>
                    <i className="fa fa-cog" aria-hidden="true"></i>
                </a>
            </div>
        )
    }

    buttonClicked(e) {
        this.props.onClick(e);
    }
}

export default SettingsLink
