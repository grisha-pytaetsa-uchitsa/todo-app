/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
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
        <input className="toggle" checked={classNames === 'completed'} type="checkbox" onChange={onToggleCompleted} />
        <label onClick={onToggleCompleted}>
          <span className="description">{label}</span>
          <span className="created">{distanceToNow}</span>
        </label>
        <button className="icon icon-edit" type="button" disabled />
        <button className="icon icon-destroy" type="button" onClick={onDeleted} />
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
