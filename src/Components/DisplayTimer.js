import React, { Component } from 'react';
import { Col, Button, Row } from 'reactstrap';
import Timer from '../Components/Timer';
import { CSSTransition } from 'react-transition-group';
import "../Components/animationTimer.css";

class DisplayTimer extends Component {
    render() {
        let { displayTimer,
            counter,
            handleChangeCount,
            initLevelDefault,
            defaultCount,
            pts,
            countPts,
            team1Color,
            team2Color,
            selectedTeam 
        } = this.props
        return (
            <>
                {
                    displayTimer &&
                    <Timer
                        startCount={counter}
                        handleChangeCount={handleChangeCount}
                        counter={counter}
                        initLevelDefault={initLevelDefault}
                        defaultCount={defaultCount}
                    />
                }
                <Row className="h-100 position-relative">
                    <div className="timerCounter w-100 justify-content-center d-flex">
                        <h1 className="time">{
                            displayTimer ?
                                counter
                                :
                                pts
                        }</h1>

                        <CSSTransition
                            in={displayTimer}
                            classNames="timer"
                            timeout={300}
                        >
                            <div className="animationTimer" style={{ backgroundColor: `${selectedTeam !== null ? selectedTeam === 1 ? team1Color : team2Color : 'white'}` }} />
                        </CSSTransition>
                        <Button className="stopTimer" style={{ zIndex: displayTimer ? '9900' : '5' }} onClick={countPts}></Button>
                    </div>
                    <Col sm={6} className="h-100" style={{ backgroundColor: team1Color }} />
                    
                    <Col sm={6} className="h-100" style={{ backgroundColor: team2Color }} />
                    
                </Row>
            </>
        );
    }
}

export default DisplayTimer;