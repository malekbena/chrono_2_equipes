import React, { Component } from 'react';
import { Button } from 'reactstrap';

import "./RoundBtn.css";


export default class RoundBtn extends Component {
    render() {
        let { action, posTop, posRight } = this.props
        return (
            <Button className="roundBtn position-absolute" onClick={action} style={{top: posTop, right:posRight }}>
                <img src="/img/Checkbox.png" alt="checkBox" />
            </Button>
        );
    }
}