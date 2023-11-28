import { useState } from 'react';

export default function NewTaskForm({ onAddItem }) {
  const [state, setState] = useState({
    label: '',
    min: '',
    sec: '',
  });

  const onLabelChange = (event) => {
    setState(({ min, sec }) => {
      let newStr;
      if (!event.target.value.trim()) {
        newStr = '';
      } else {
        newStr = event.target.value;
      }
      return {
        label: newStr,
        min,
        sec,
      };
    });
  };

  const onMinChange = (event) => {
    setState(({ label, sec }) => {
      let newMin;
      if (!event.target.value.trim()) {
        newMin = '';
      } else {
        newMin = event.target.value;
      }
      return {
        label,
        min: newMin,
        sec,
      };
    });
  };

  const onSecChange = (event) => {
    setState(({ label, min }) => {
      let newSec;
      if (!event.target.value.trim()) {
        newSec = '';
      } else {
        newSec = event.target.value;
      }
      return {
        label,
        min,
        sec: newSec,
      };
    });
  };

  const onFormSubmit = (event) => {
    const { label, min, sec } = state;
    event.preventDefault();
    onAddItem(label, min, sec);
    setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  const { label, min, sec } = state;

  return (
    <form className="new-todo-form" onSubmit={onFormSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onLabelChange}
        onSubmit={onFormSubmit}
        type="text"
        value={label}
        required
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onMinChange}
        type="number"
        value={min}
        required
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onSecChange}
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
