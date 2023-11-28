/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect } from 'react';

function Task({
  label,
  min,
  sec,
  id,
  done,
  timer,
  onDeleted,
  onToggleCompleted,
  onToggleTimer,
  onToggleSeconds,
  onFormSubmit,
  distanceToNow,
}) {
  useEffect(() => {
    const interval = setInterval(() => {
      timer && onToggleSeconds(id);
    }, 1000);
    return () => clearInterval(interval);
  }, [id, onToggleSeconds, timer]);

  const handleStart = (idx) => {
    onToggleTimer(idx);
  };

  const handleStop = (idx) => {
    onToggleTimer(idx);
  };

  let classNames = '';

  if (done) {
    classNames = '';
    classNames += 'completed';
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
            <button className="icon icon-play" onClick={!timer ? () => handleStart(id) : null} type="button" />
            <button className="icon icon-pause" onClick={timer ? () => handleStop(id) : null} type="button" />
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
