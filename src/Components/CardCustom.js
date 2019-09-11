import React, { Component } from 'react';
import { Col, Button, Row } from 'reactstrap';
import { CSSTransition } from 'react-transition-group';
import RoundBtn from "../Components/RoundBtn";

import "../Components/animationCard.css";


export default class CardCustom extends Component {

    displayProgressBottom = (progress, action) => {
        switch (progress) {
            case 0:
                return (
                    <>
                        <p>Prêt ?</p>
                        <RoundBtn action={action} posRight={'1%'} />
                    </>
                )
            case null:
                return (
                    <>
                        <p>Une autre question ?</p>
                        <RoundBtn action={action} posRight={'1%'} />
                    </>
                )
            default:
                break;
        }
    }

    displayProgressTop = (progress, action) => {
        switch (progress) {
            case 1:
                return (
                    <Row className="justify-content-center d-flex">
                        <p>Qui a buzzé cette réponse ?</p>
                        <button className="leaveBtn position-absolute" style={{ top: '1%', right: '1%' }} onClick={action}>
                            <img src="/img/symbolex.png" alt="leave icon" />
                        </button>
                    </Row>
                )
            case 2:
                return (

                    <Row className="justify-content-center d-flex">
                        <p>Passer à une autre question ?</p>
                        <RoundBtn posTop={'1%'} posRight={'1%'} action={action} />
                    </Row>
                )
            default:
                break;
        }
    }

    render() {
        let { progress,
            displayTimer,
            team1Color,
            team2Color,
            team1Pts,
            team2Pts,
            action,
            attributePts,
            pts,
            selectedTeam
        } = this.props
        return (
            <CSSTransition
                in={!displayTimer}
                classNames="card"
                unmountOnExit
                timeout={1000}
            >
                <div className="shadowCustom cardCustom">
                    {this.displayProgressTop(progress, action)}
                    <Row className="justify-content-center">
                        <Col sm={6} className={`flex-column align-items-center d-flex ${selectedTeam === 1 && 'selectedTeam'} teamCard p-5`}>
                            <p style={{ color: team1Color, opacity: selectedTeam === 1 ? 1 : 0 }}>Bravo</p>
                            <Button className="roundIcon" onClick={() => pts && attributePts(1)} style={{ backgroundColor: team1Color }} >
                                <img src="/img/Union49.png" alt="icon" />
                            </Button>
                            <p style={{ color: `${team1Color}` }}>{team1Pts}pts</p>
                        </Col>
                        <Col sm={6} className={`flex-column align-items-center d-flex ${selectedTeam === 2 && 'selectedTeam'} teamCard p-5`}>
                            <p style={{ color: team2Color, opacity: selectedTeam === 2 ? 1 : 0 }}>Bravo</p>
                            <Button className="roundIcon" onClick={() => pts && attributePts(2)} style={{ backgroundColor: team2Color }} >
                                <img src="/img/Union49.png" alt="icon" />
                            </Button>
                            <p style={{ color: `${team2Color}` }}>{team2Pts}pts</p>
                        </Col>
                    </Row>
                    <Row className="p-4 justify-content-center">
                        {this.displayProgressBottom(progress, action)}
                    </Row>
                </div>
            </CSSTransition>
        );
    }
}