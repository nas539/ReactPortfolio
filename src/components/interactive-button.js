import React, { Component } from "react"

export default class InteractiveButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            color: props.color
        }
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }

    handleButtonClick() {
        console.log(this.state)
        this.setState({ color: "green"})
        console.log(this.state)

    }
    render() {
        return (
            <div>
                <button onClick={this.handleButtonClick}
                 style={{backgroundcolor: this.state.color}}>Click me!</button>

            </div>
        )
    }
}