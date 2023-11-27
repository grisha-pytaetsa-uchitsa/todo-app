import { Component } from 'react';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      min: '',
      sec: '',
    };
  }

  onLabelChange = (event) => {
    let newStr;
    if (!event.target.value.trim()) {
      newStr = '';
    } else {
      newStr = event.target.value;
    }
    this.setState({
      label: newStr,
    });
  };

  onMinChange = (event) => {
    let newMin;
    if (!event.target.value.trim()) {
      newMin = '';
    } else {
      newMin = event.target.value;
    }
    this.setState({
      min: newMin,
    });
  };

  onSecChange = (event) => {
    let newSec;
    if (!event.target.value.trim()) {
      newSec = '';
    } else {
      newSec = event.target.value;
    }
    this.setState({
      sec: newSec,
    });
  };

  onFormSubmit = (event) => {
    const { onAddItem } = this.props;
    const { label, min, sec } = this.state;
    event.preventDefault();
    onAddItem(label, min, sec);
    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  render() {
    const { label, min, sec } = this.state;
    return (
      <form className="new-todo-form" onSubmit={this.onFormSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          onSubmit={this.onFormSubmit}
          type="text"
          value={label}
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onMinChange}
          type="number"
          value={min}
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onSecChange}
          type="number"
          value={sec}
          required
        />
        <button className="submitButton" type="submit">
          nenuzhnaya dlya otobrazheniya knopka, nichego lichnogo
        </button>
      </form>
    );
  }
}
