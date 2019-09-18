import React, { Component } from 'react';
import { Container, Button, Row } from 'reactstrap';
import Config from '../Config.json';

import ColorPicker from "../Components/ColorPicker";
import CardCustom from "../Components/CardCustom";
import DisplayTimer from "../Components/DisplayTimer";

export default class Home extends Component {
    state = {
        team1Color: Config.defaultColor1,
        team2Color: Config.defaultColor2,
        team1Pts: 0,
        team2Pts: 0,
        counter: Config.defaultCounter,
        displayTimer: false,
        level: 1,
        defaultCount: Config.defaultCounter,
        pts: 0,
        progress: 0,
        open: false,
        color: 'red',
        initGame: false,
        cardActive: false,
        selectedTeam: null
    }

    // lvl changing
    handleChangeLevel = async (level, counter) => {
        await this.setState({
            level,
            counter,
            defaultCount: counter,
            displayTimer: false,
            progress: null
        })
    }

    // color choice
    handleChangeColor = (value, team) => {
        team === 1 ? this.setState({ team1Color: value }) : this.setState({ team2Color: value })
    }

    // game init
    initGame = () => {
        this.setState({
            initGame: true
        })
    }

    // show or not timer
    displayTimer = () => {
        this.setState({
            displayTimer: !this.state.displayTimer,
            selectedTeam: null,
            counter : this.state.defaultCount
        })
    }

    // decremente counter
    handleChangeCount = () => {
        this.setState({
            counter: this.state.counter - 1
        })
        if (this.state.counter <= 0) {
            this.setState({
                displayTimer: false,
                progress: null,
            })
        }
    }

    // points count && attribution
    countPts = () => {
        const pts = this.state.counter
        this.setState({
            counter: this.state.level === 1 ? 5 : this.state.level === 2 ? 10 : 20,
            defaultCount: this.state.level === 1 ? 5 : this.state.level === 2 ? 10 : 20,
            displayTimer: false,
            pts,
            progress: 1

        })
    }
    attributePts = player => {
        this.setState({
            progress: 2
        })
        if (player === 1)
            this.setState({ team1Pts: this.state.team1Pts + this.state.pts, pts: 0, selectedTeam: 1 })
        else
            this.setState({ team2Pts: this.state.team2Pts + this.state.pts, pts: 0, selectedTeam: 2 })
    }

    // reset game
    reset = () => {
        this.setState({
            team1Color: Config.defaultColor1,
            team2Color: Config.defaultColor2,
            team1Pts: 0,
            team2Pts: 0,
            counter: 5,
            displayTimer: false,
            level: 1,
            defaultCount: 5,
            pts: 0,
            progress: 0,
            initGame: false,
        })
    }

    render() {
        const { progress, counter, initGame, displayTimer, team1Color, team2Color, team1Pts, team2Pts, pts, selectedTeam, defaultCount } = this.state
        if (!initGame) {
            return (
                <Container className="mx-auto m-5 shadowCustom pb-5">
                    <h1 className="text-center">Choix des couleurs</h1>
                    <Row className="justify-content-around mt-5">
                        <ColorPicker color={team1Color} team={1} action={this.handleChangeColor} />
                        <ColorPicker color={team2Color} team={2} action={this.handleChangeColor} />
                    </Row>
                    <Row className="col-6 mx-auto justify-content-center">
                        <h1>Choix du niveau</h1>
                        {
                            Config.levels.map((l, k) => {
                                return (
                                    <Button key={k} className="m-2 col-6" onClick={() => this.handleChangeLevel(l, Config.level[l].counter)}> niveau {l}</Button>
                                )
                            })
                        }
                    </Row>
                    <div className="justify-content-end d-flex mt-5">
                        {<Button onClick={this.initGame}>Commencer</Button>}
                    </div>
                </Container>
            )
        } else {
            return (
                <Container fluid className="position-relative vh-100">
                    <Button className="leaveBtn reset" onClick={this.reset}>
                        <img src="/img/symbolex.png" alt="reset icon" />
                    </Button>
                    <Container className="position-relative wrapperCustom h-100">
                        <CardCustom
                            progress={progress}
                            counter={counter}
                            displayTimer={displayTimer}
                            team1Color={team1Color}
                            team2Color={team2Color}
                            team1Pts={team1Pts}
                            team2Pts={team2Pts}
                            action={this.displayTimer}
                            attributePts={this.attributePts}
                            pts={pts}
                            selectedTeam={selectedTeam}
                        />
                        <DisplayTimer
                            displayTimer={displayTimer}
                            counter={counter}
                            handleChangeCount={this.handleChangeCount}
                            defaultCount={defaultCount}
                            pts={pts}
                            countPts={this.countPts}
                            team1Color={team1Color}
                            team2Color={team2Color}
                            selectedTeam={selectedTeam}
                        />
                    </Container>
                </Container >
            );
        }
    }
}