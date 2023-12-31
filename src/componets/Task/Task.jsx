/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
function Task({ label, id, done, editing, onDeleted, onToggleCompleted, onFormSubmit, distanceToNow }) {
  let classNames = '';

  if (done) {
    classNames = '';
    classNames += 'completed';
  }

  if (editing) {
    classNames = '';
    classNames += 'editing';
  }

  return (
    <li className={classNames} key={id}>
      <div className="view">
        <input
          className="toggle"
          checked={classNames === 'completed'}
          type="checkbox"
          onChange={onToggleCompleted}
          id={id}
        />
        <label onClick={onToggleCompleted} onKeyDown={onToggleCompleted} htmlFor={id}>
          <span className="description">{label}</span>
          <span className="created">{distanceToNow}</span>
        </label>
        <button className="icon icon-edit" type="button" disabled aria-label="Edit task" />
        <button className="icon icon-destroy" type="button" onClick={onDeleted} aria-label="Delete task" />
      </div>
      {classNames === 'editing' && (
        <form onSubmit={onFormSubmit}>
          <input type="text" className="edit" value={label} readOnly />
        </form>
      )}
    </li>
  );
}

export default Task;
