import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const columns = {
  todo: {
    title: 'To Do',
    items: [
      {
        id: 't1',
        title: 'Complete Privacy Quiz',
        course: 'Digital Safety',
        dueDate: 'Tomorrow'
      },
      {
        id: 't2',
        title: 'AI Ethics Worksheet',
        course: 'AI for Kids',
        dueDate: 'Next Week'
      }
    ]
  },
  inProgress: {
    title: 'In Progress',
    items: [
      {
        id: 'p1',
        title: 'Online Safety Project',
        course: 'Digital Safety',
        dueDate: 'Friday'
      }
    ]
  },
  blocked: {
    title: 'Blocked',
    items: [
      {
        id: 'b1',
        title: 'Machine Learning Exercise',
        course: 'AI for Kids',
        dueDate: 'Pending Help'
      }
    ]
  },
  done: {
    title: 'Done',
    items: [
      {
        id: 'd1',
        title: 'Password Security Task',
        course: 'Digital Safety',
        dueDate: 'Completed'
      }
    ]
  }
};

export function StudentAssignments() {
  const [tasks, setTasks] = React.useState(columns);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId === destination.droppableId) {
      const items = Array.from(tasks[source.droppableId].items);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      setTasks({
        ...tasks,
        [source.droppableId]: {
          ...tasks[source.droppableId],
          items
        }
      });
    } else {
      const sourceItems = Array.from(tasks[source.droppableId].items);
      const destItems = Array.from(tasks[destination.droppableId].items);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);

      setTasks({
        ...tasks,
        [source.droppableId]: {
          ...tasks[source.droppableId],
          items: sourceItems
        },
        [destination.droppableId]: {
          ...tasks[destination.droppableId],
          items: destItems
        }
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <ClipboardList className="w-5 h-5 text-blue-500" />
        My Assignments
      </h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Object.entries(tasks).map(([columnId, column]) => (
            <div key={columnId} className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-4">{column.title}</h3>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-3"
                  >
                    {column.items.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-3 rounded-lg shadow-sm"
                          >
                            <h4 className="font-medium mb-2">{task.title}</h4>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-blue-500">{task.course}</span>
                              <div className="flex items-center gap-1 text-gray-500">
                                <Clock className="w-4 h-4" />
                                {task.dueDate}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </motion.div>
  );
}