import React from "react";

export class MyButton extends React.Component {
    constructor(props) {
        super(props);
        this.r = React.createRef();
    }

    getTitle() {
    }

    handleOnClick() {
    }

    setContent(content) {
        this.props.setData(content);
    }

    render() {
        return <button className={'btn'} onClick={() => this.handleOnClick()} ref={this.r}>{this.getTitle()}</button>;
    }
}