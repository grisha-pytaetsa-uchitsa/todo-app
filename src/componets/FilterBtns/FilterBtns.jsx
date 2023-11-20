function FilterBtns({ active, label, showAllItems, showActiveItems, showCompletedItems }) {
  let classNames = '';

  if (active) {
    classNames = '';
    classNames += 'completed';
  }

  const getLabel = (value) => {
    let fn;
    if (value === 'All') {
      fn = showAllItems();
    }
    if (value === 'Active') {
      fn = showActiveItems();
    }
    if (value === 'Completed') {
      fn = showCompletedItems();
    }
    return fn;
  };

  return (
    <li>
      <button type="button" className={classNames} onClick={() => getLabel(label)}>
        {label}
      </button>
    </li>
  );
}

export default FilterBtns;
