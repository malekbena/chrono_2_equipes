import React, { Component } from 'react';

export default class Timer extends Component {
    state = {
        progressBar: 0,
        startCount: 0
    }

    componentDidMount() {
        const { startCount } = this.props
        this.setState({
            startCount,
            progressBar: 0
        })
        this.intervalChange()
    }

    // progress bar
    intervalChange = () => {
        this.myInterval = setInterval(() => {
            if (this.props.counter <= 0) {
                this.setState({
                    progressBar: 0
                })
            } else {
                this.setState(prevState => ({
                    progressBar: prevState.progressBar + (100 / this.props.defaultCount)
                }))
                this.props.handleChangeCount()
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        return (
            <div className="timerOverlay" style={{ height: ` ${this.state.progressBar}% ` }} />
        );
    }
}