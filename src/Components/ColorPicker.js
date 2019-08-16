import React, { Component } from "react";
import { BlockPicker } from "react-color";


class ColorPicker extends Component {
  state = {
    color: this.props.color,
    open: false
  }

  submitHandler = () => {
    this.props.action(this.state.color, this.props.team);
  }
  componentDidMount(){
    this.setState({
      color : this.props.color
    })
  }

  handleChangeComplete = async color => {
    await this.setState({ color: color.hex });
    this.submitHandler()
    this.toggle()
  };

  toggle = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };
  
  render() {
    return (
      <div className="App d-flex justify-content-center align-items-center flex-column" style={{zIndex:'9999'}}>
        <h1>{`Equipe ${this.props.team} `} </h1>
        <div className="dropdown">
          <button
            className="block-color"
            style={{ background: this.state.color }}
            onClick={this.toggle}
          >
          </button>
          {this.state.open && (
            <div className="dropdown-box">
              <BlockPicker
                color={this.state.color}
                onChangeComplete={this.handleChangeComplete}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ColorPicker;
