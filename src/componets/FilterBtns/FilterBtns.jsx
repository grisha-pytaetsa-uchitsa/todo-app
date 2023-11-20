function FilterBtns({ active, label, showAllItems, showActiveItems, showCompletedItems }) {
  let classNames = '';

  if (active) {
    classNames = '';
    classNames += 'completed';
  }

  // eslint-disable-next-line consistent-return
  const getLabel = (value) => {
    if (value === 'All') {
      return showAllItems();
    }
    if (value === 'Active') {
      return showActiveItems();
    }
    if (value === 'Completed') {
      return showCompletedItems();
    }
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
