/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
function Task({
  label,
  min,
  sec,
  id,
  done,
  timer,
  editing,
  onDeleted,
  onToggleCompleted,
  startTimer,
  onFormSubmit,
  distanceToNow,
  stopTimer,
}) {
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
    <li className={classNames}>
      <div className="view">
        <input
          className="toggle"
          checked={classNames === 'completed'}
          type="checkbox"
          onChange={onToggleCompleted}
          id={id}
        />
        <div className="label">
          <span className="title" onClick={onToggleCompleted} onKeyDown={onToggleCompleted}>
            {label}
          </span>
          <span className="description">
            <button className="icon icon-play" onClick={!timer ? startTimer : null} type="button" />
            <button className="icon icon-pause" onClick={timer ? stopTimer : null} type="button" />
            <span className="timer">
              {min}:{sec}
            </span>
          </span>
          <span className="description" onClick={onToggleCompleted} onKeyDown={onToggleCompleted}>
            {distanceToNow}
          </span>
        </div>
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
