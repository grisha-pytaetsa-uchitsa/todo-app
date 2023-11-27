import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Task from '../Task/Task';

function TaskList({ elements, onDeleted, onToggleCompleted, startTimer, stopTimer }) {
  return (
    <ul className="todo-list">
      {elements.map((el) => {
        const now = new Date();
        const distanceToNow = formatDistanceToNow(now, {
          includeSeconds: true,
        });
        return (
          el !== undefined && (
            <Task
              label={el.label}
              min={el.min}
              sec={el.sec}
              key={el.id}
              done={el.done}
              timer={el.timer}
              editing={el.editing}
              onDeleted={() => onDeleted(el.id)}
              onToggleCompleted={() => onToggleCompleted(el.id)}
              startTimer={() => startTimer(el.id)}
              distanceToNow={distanceToNow}
              stopTimer={() => stopTimer(el.id)}
            />
          )
        );
      })}
    </ul>
  );
}

export default TaskList;
