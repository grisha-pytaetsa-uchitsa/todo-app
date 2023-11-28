import { useState } from 'react';

import './App.css';
import Header from './componets/Header/Header';
import Footer from './componets/Footer/Footer';
import TaskList from './componets/TaskList/TaskList';

export default function App() {
  const [itemId, setItemId] = useState(100);

  const [state, setState] = useState({
    elements: [],
    currentItems: [],
  });

  const [filters, setFilter] = useState([
    { active: true, label: 'All', id: 0 },
    { active: false, label: 'Active', id: 1 },
    { active: false, label: 'Completed', id: 2 },
  ]);

  const createItem = (label, minStr, secStr) => {
    const min = Number(minStr);
    const sec = Number(secStr);
    setItemId(itemId + 1);
    const newItem = {
      label,
      min,
      sec,
      done: false,
      timer: false,
      id: itemId,
    };
    return newItem;
  };

  const addItem = (text, min, sec) => {
    const newText = text.trim();
    const newItem = createItem(newText, min, sec);

    setState(({ elements }) => {
      const newElements = [...elements, newItem];
      return {
        elements: newElements,
        currentItems: newElements,
      };
    });
  };

  const deleteItem = (id) => {
    setState(({ elements }) => {
      const idx = elements.findIndex((el) => el.id === id);
      const newArray = [...elements.slice(0, idx), ...elements.slice(idx + 1)];
      const activeFilter = filters.filter((el) => el.active);
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

  const onToggleCompleted = (id) => {
    setState(({ elements }) => {
      const idx = elements.findIndex((el) => el.id === id);
      const oldItem = elements[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArray = [...elements.slice(0, idx), newItem, ...elements.slice(idx + 1)];
      const activeFilter = filters.filter((el) => el.active);
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

  const onToggleTimer = (id) => {
    setState(({ elements }) => {
      const idx = elements.findIndex((el) => el.id === id);
      const oldItem = elements[idx];
      const newItem = { ...oldItem, timer: !oldItem.timer };
      const newArray = [...elements.slice(0, idx), newItem, ...elements.slice(idx + 1)];
      const activeFilter = filters.filter((el) => el.active);
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

  const clearCompletedItems = () => {
    setState(({ elements }) => {
      const newArr = elements.filter((el) => !el.done);
      return {
        elements: newArr,
        currentItems: newArr,
      };
    });
  };

  const showAllItems = () => {
    setState(({ elements }) => {
      const allItemsArr = elements;
      setFilter(
        filters.map((el) => {
          const newEl = el;
          newEl.active = false;
          if (newEl.label === 'All') {
            newEl.active = true;
          }
          return newEl;
        })
      );

      return {
        elements,
        currentItems: allItemsArr,
      };
    });
  };

  const showActiveItems = () => {
    setState(({ elements }) => {
      const activeArr = elements.filter((el) => !el.done);
      setFilter(
        filters.map((el) => {
          const newEl = el;
          newEl.active = false;
          if (newEl.label === 'Active') {
            newEl.active = true;
          }
          return newEl;
        })
      );

      return {
        elements,
        currentItems: activeArr,
      };
    });
  };

  const showCompletedItems = () => {
    setState(({ elements }) => {
      const activeArr = elements.filter((el) => el.done);
      setFilter(
        filters.map((el) => {
          const newEl = el;
          newEl.active = false;
          if (newEl.label === 'Completed') {
            newEl.active = true;
          }
          return newEl;
        })
      );

      return {
        elements,
        currentItems: activeArr,
      };
    });
  };

  const onToggleSeconds = (id) => {
    setState(({ elements }) => {
      const idx = elements.findIndex((el) => el.id === id);
      const oldItem = elements[idx];
      let newItem;
      if (oldItem.sec > 0) {
        newItem = { ...oldItem, sec: oldItem.sec - 1 };
      } else if (oldItem.sec === 0 && oldItem.min > 0) {
        newItem = { ...oldItem, min: oldItem.min - 1, sec: oldItem.sec + 59 };
      } else if (oldItem.min === 0) {
        newItem = { ...oldItem, min: 0, sec: 0 };
      }
      const newArray = [...elements.slice(0, idx), newItem, ...elements.slice(idx + 1)];
      const activeFilter = filters.filter((el) => el.active);
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

  const { elements, currentItems } = state;

  const doneCount = elements.filter((el) => !el.done).length;

  return (
    <div className="App">
      <section className="todoapp">
        <Header onAddItem={addItem} />
        <section className="main">
          <TaskList
            label={currentItems.label}
            elements={currentItems}
            onDeleted={deleteItem}
            onToggleCompleted={onToggleCompleted}
            onToggleTimer={onToggleTimer}
            onToggleSeconds={onToggleSeconds}
          />

          <Footer
            doneCount={doneCount}
            filterBtns={filters}
            clearCompletedItems={clearCompletedItems}
            showActiveItems={showActiveItems}
            showCompletedItems={showCompletedItems}
            showAllItems={showAllItems}
          />
        </section>
      </section>
    </div>
  );
}
