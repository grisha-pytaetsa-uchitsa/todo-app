import TaskFilter from '../TasksFilter/TaskFilter';

function Footer({ doneCount, clearCompletedItems, showActiveItems, showCompletedItems, showAllItems, filterBtns }) {
  return (
    <footer className="footer">
      <span className="todo-count">{doneCount} items left</span>
      <TaskFilter
        showActiveItems={showActiveItems}
        showCompletedItems={showCompletedItems}
        showAllItems={showAllItems}
        filterBtns={filterBtns}
      />
      <button className="clear-completed" type="button" onClick={clearCompletedItems}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
