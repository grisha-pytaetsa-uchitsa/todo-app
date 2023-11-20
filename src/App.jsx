import React from 'react';

import './App.css';
import Header from './componets/Header/Header';
import Footer from './componets/Footer/Footer';
import TaskList from './componets/TaskList/TaskList';

export default class App extends React.Component {
  // eslint-disable-next-line react/no-unused-class-component-methods
  itemId = 100;

  // eslint-disable-next-line react/state-in-constructor
  state = {
    elements: [],
    currentItems: [],
    filter: [
      { active: false, label: 'All', id: 0 },
      { active: false, label: 'Active', id: 1 },
      { active: false, label: 'Completed', id: 2 },
    ],
  };

  addItem = (text) => {
    const newText = text.trim();
    const newItem = this.createItem(newText);

    this.setState(({ elements }) => {
      const newElements = [...elements, newItem];
      return {
        elements: newElements,
        currentItems: newElements,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ elements }) => {
      const idx = elements.findIndex((el) => el.id === id);
      const newArray = [...elements.slice(0, idx), ...elements.slice(idx + 1)];

      return {
        elements: newArray,
        currentItems: newArray,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ elements }) => {
      const idx = elements.findIndex((el) => el.id === id);
      const oldItem = elements[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArray = [...elements.slice(0, idx), newItem, ...elements.slice(idx + 1)];
      return {
        elements: newArray,
        currentItems: newArray,
      };
    });
  };

  // onToggleEditing = (id) => {
  //   this.setState(({ elements }) => {
  //     const idx = elements.findIndex((el) => el.id === id);
  //     const oldItem = elements[idx];
  //     const newItem = { ...oldItem, editing: !oldItem.editing };
  //     const newArray = [...elements.slice(0, idx), newItem, ...elements.slice(idx + 1)];
  //     return {
  //       elements: newArray,
  //       currentItems: newArray,
  //     };
  //   });
  // };

  clearCompletedItems = () => {
    this.setState(({ elements }) => {
      const newArr = elements.filter((el) => !el.done);
      return {
        elements: newArr,
        currentItems: newArr,
      };
    });
  };

  showAllItems = () => {
    this.setState(({ elements }) => {
      const allItemsArr = elements;

      return {
        currentItems: allItemsArr,
      };
    });
  };

  showActiveItems = () => {
    this.setState(({ elements }) => {
      const activeArr = elements.filter((el) => !el.done);

      return {
        currentItems: activeArr,
      };
    });
  };

  showCompletedItems = () => {
    this.setState(({ elements }) => {
      const activeArr = elements.filter((el) => el.done);

      return {
        currentItems: activeArr,
      };
    });
  };

  createItem = (label) => {
    const newItem = {
      label,
      done: false,
      // editing: false,
      // eslint-disable-next-line react/no-unused-class-component-methods
      id: (this.itemId += 1),
    };
    return newItem;
  };

  render() {
    const { elements, currentItems, filter } = this.state;

    const doneCount = elements.filter((el) => !el.done).length;

    return (
      <div className="App">
        <section className="todoapp">
          <Header onAddItem={this.addItem} />
          <section className="main">
            <TaskList
              label={currentItems.label}
              elements={currentItems}
              onDeleted={this.deleteItem}
              onToggleCompleted={this.onToggleCompleted}
              // onToggleEditing={this.onToggleEditing}
            />
            <Footer
              doneCount={doneCount}
              filterBtns={filter}
              clearCompletedItems={this.clearCompletedItems}
              showActiveItems={this.showActiveItems}
              showCompletedItems={this.showCompletedItems}
              showAllItems={this.showAllItems}
            />
          </section>
        </section>
      </div>
    );
  }
}
