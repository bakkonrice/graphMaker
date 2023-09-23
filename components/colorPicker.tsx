import React from 'react';
import { ChromePicker } from 'react-color';
import styles from '../styles/Home.module.scss'

class ColorPicker extends React.Component {
  state = {
    background: localStorage.getItem("color"),
  };

  handleChange = (color) => {
    localStorage.setItem("color", color.hex)
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <ChromePicker
        color={ this.state.background }
        onChange={ this.handleChange }
        disableAlpha={true}
      />
    );
  }
}

export default ColorPicker