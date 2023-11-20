import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Task from '../Task/Task';

function TaskList({ elements, onDeleted, onToggleCompleted }) {
  return (
    <ul className="todo-list">
      {elements.map((el) => {
        const now = new Date();
        const distanceToNow = formatDistanceToNow(now, {
          includeSeconds: true,
        });
        return (
          <Task
            label={el.label}
            key={el.id}
            done={el.done}
            editing={el.editing}
            onDeleted={() => onDeleted(el.id)}
            onToggleCompleted={() => onToggleCompleted(el.id)}
            distanceToNow={distanceToNow}
          />
        );
      })}
    </ul>
  );
}

export default TaskList;
