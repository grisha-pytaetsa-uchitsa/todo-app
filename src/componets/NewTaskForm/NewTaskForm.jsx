import { Component } from 'react';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
  }

  onLabelChange = (event) => {
    console.log(event.target.value);
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

  onFormSubmit = (event) => {
    const { onAddItem } = this.props;
    const { label } = this.state;
    event.preventDefault();
    onAddItem(label);
    this.setState({
      label: '',
    });
  };

  render() {
    const { label } = this.state;
    return (
      <form className="new-todo-form" onSubmit={this.onFormSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          // autoFocus
          onChange={this.onLabelChange}
          value={label}
          required
        />
        <input className="new-todo-form__timer" placeholder="Min" />
        <input className="new-todo-form__timer" placeholder="Sec" />
      </form>
    );
  }
}
