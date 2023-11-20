import FilterBtns from '../FilterBtns/FilterBtns';

function TaskFilter({ showActiveItems, showCompletedItems, showAllItems, filterBtns }) {
  return (
    <ul className="filters">
      {filterBtns.map((el) => (
        <FilterBtns
          label={el.label}
          key={el.id}
          showActiveItems={showActiveItems}
          showCompletedItems={showCompletedItems}
          showAllItems={showAllItems}
        />
      ))}
    </ul>
  );
}

export default TaskFilter;
