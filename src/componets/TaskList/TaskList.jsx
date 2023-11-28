import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Task from '../Task/Task';

function TaskList({ elements, onDeleted, onToggleCompleted, onToggleTimer, onToggleSeconds }) {
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
              id={el.id}
              key={el.id}
              done={el.done}
              timer={el.timer}
              onDeleted={() => onDeleted(el.id)}
              onToggleCompleted={() => onToggleCompleted(el.id)}
              onToggleTimer={onToggleTimer}
              onToggleSeconds={onToggleSeconds}
              distanceToNow={distanceToNow}
            />
          )
        );
      })}
    </ul>
  );
}

export default TaskList;
