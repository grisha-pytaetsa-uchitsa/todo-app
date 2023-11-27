/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-class-component-methods */
import React from 'react';

import './App.css';
import Header from './componets/Header/Header';
import Footer from './componets/Footer/Footer';
import TaskList from './componets/TaskList/TaskList';

export default class App extends React.Component {
  itemId = 100;

  constructor() {
    super();
    this.state = {
      elements: [],
      currentItems: [],
      filter: [
        { active: true, label: 'All', id: 0 },
        { active: false, label: 'Active', id: 1 },
        { active: false, label: 'Completed', id: 2 },
      ],
    };
  }

  addItem = (text, min, sec) => {
    const newText = text.trim();
    const newItem = this.createItem(newText, min, sec);

    this.setState(({ elements }) => {
      const newElements = [...elements, newItem];
      return {
        elements: newElements,
        currentItems: newElements,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ elements, filter }) => {
      const idx = elements.findIndex((el) => el.id === id);
      const newArray = [...elements.slice(0, idx), ...elements.slice(idx + 1)];
      const activeFilter = filter.filter((el) => el.active);
      const newArrayFilter = newArray.map((el) => {
        let newEl;
        if (activeFilter[0].label === 'All') {
          newEl = el;
        }
        if (activeFilter[0].label === 'Active') {
          if (!el.done) {
            newEl = el;
          }
        }
        if (activeFilter[0].label === 'Completed') {
          if (el.done) {
            newEl = el;
          }
        }
        return newEl;
      });

      return {
        elements: newArray,
        currentItems: newArrayFilter,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ elements, filter }) => {
      const idx = elements.findIndex((el) => el.id === id);
      const oldItem = elements[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArray = [...elements.slice(0, idx), newItem, ...elements.slice(idx + 1)];
      const activeFilter = filter.filter((el) => el.active);
      const newArrayFilter = newArray.map((el) => {
        let newEl;
        if (activeFilter[0].label === 'All') {
          newEl = el;
        }
        if (activeFilter[0].label === 'Active') {
          if (!el.done) {
            newEl = el;
          }
        }
        if (activeFilter[0].label === 'Completed') {
          if (el.done) {
            newEl = el;
          }
        }
        return newEl;
      });
      return {
        elements: newArray,
        currentItems: newArrayFilter,
      };
    });
  };

  onToggleTimer = (id) => {
    this.setState(({ elements, filter }) => {
      const idx = elements.findIndex((el) => el.id === id);
      const oldItem = elements[idx];
      const newItem = { ...oldItem, timer: !oldItem.timer };
      const newArray = [...elements.slice(0, idx), newItem, ...elements.slice(idx + 1)];
      const activeFilter = filter.filter((el) => el.active);
      const newArrayFilter = newArray.map((el) => {
        let newEl;
        if (activeFilter[0].label === 'All') {
          newEl = el;
        }
        if (activeFilter[0].label === 'Active') {
          if (!el.done) {
            newEl = el;
          }
        }
        if (activeFilter[0].label === 'Completed') {
          if (el.done) {
            newEl = el;
          }
        }
        return newEl;
      });
      return {
        elements: newArray,
        currentItems: newArrayFilter,
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
    this.setState(({ elements, filter }) => {
      const allItemsArr = elements;
      const newFilter = filter.map((el) => {
        const newEl = el;
        newEl.active = false;
        if (newEl.label === 'All') {
          newEl.active = true;
        }
        return newEl;
      });

      return {
        currentItems: allItemsArr,
        filter: newFilter,
      };
    });
  };

  showActiveItems = () => {
    this.setState(({ elements, filter }) => {
      const activeArr = elements.filter((el) => !el.done);
      const newFilter = filter.map((el) => {
        const newEl = el;
        newEl.active = false;
        if (newEl.label === 'Active') {
          newEl.active = true;
        }
        return newEl;
      });

      return {
        currentItems: activeArr,
        filter: newFilter,
      };
    });
  };

  showCompletedItems = () => {
    this.setState(({ elements, filter }) => {
      const activeArr = elements.filter((el) => el.done);
      const newFilter = filter.map((el) => {
        const newEl = el;
        newEl.active = false;
        if (newEl.label === 'Completed') {
          newEl.active = true;
        }
        return newEl;
      });

      return {
        currentItems: activeArr,
        filter: newFilter,
      };
    });
  };

  createItem = (label, minStr, secStr) => {
    const min = Number(minStr);
    const sec = Number(secStr);
    const newItem = {
      label,
      min,
      sec,
      done: false,
      timer: false,
      // editing: false,
      id: (this.itemId += 1),
    };
    return newItem;
  };

  stopTimer = (id) => {
    this.onToggleTimer(id);
    this.startTimer(id);
  };

  startTimer = (id) => {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
    const timerIdx = this.state.elements.findIndex((el) => el.id === id);
    const { timer } = this.state.elements[timerIdx];
    if (!timer) {
      this.onToggleTimer(id);
      this.timerId = setInterval(() => {
        this.setState(({ elements, filter }) => {
          const idx = elements.findIndex((el) => el.id === id);
          const oldItem = elements[idx];
          let newItem;
          if (oldItem.sec > 0) {
            newItem = { ...oldItem, sec: oldItem.sec - 1 };
          } else if (oldItem.sec === 0 && oldItem.min > 0) {
            newItem = { ...oldItem, min: oldItem.min - 1, sec: oldItem.sec + 59 };
          } else if (oldItem.min === 0) {
            newItem = { ...oldItem, min: 0, sec: 0 };
            clearInterval(this.timerId);
          }
          const newArray = [...elements.slice(0, idx), newItem, ...elements.slice(idx + 1)];
          const activeFilter = filter.filter((el) => el.active);
          const newArrayFilter = newArray.map((el) => {
            let newEl;
            if (activeFilter[0].label === 'All') {
              newEl = el;
            }
            if (activeFilter[0].label === 'Active') {
              if (!el.done) {
                newEl = el;
              }
            }
            if (activeFilter[0].label === 'Completed') {
              if (el.done) {
                newEl = el;
              }
            }
            return newEl;
          });
          return {
            elements: newArray,
            currentItems: newArrayFilter,
          };
        });
      }, 1000);
    } else if (timer) {
      clearInterval(this.timerId);
    }
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
              startTimer={this.startTimer}
              stopTimer={this.stopTimer}
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
