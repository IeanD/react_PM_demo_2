import React from 'react';

class Heading extends React.Component {
    render() {
        return (
            <div>
                <a href="#" onClick={(e) => this.linkClicked(e)} className="heading-link">
                    <h1 className="heading">Finito.</h1>
                </a>
            </div>
        );
    }

    linkClicked(e) {
        this.props.onClick(e);
    }
}

export default Heading
