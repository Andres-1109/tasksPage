import { onEdit } from '../pages/editPage.js';
import { deleteTask } from '../services/taskService.js';

export function renderTasks(tasks, onDelete) {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  tasks.forEach(task => {
    const tr = document.createElement("tr");
    tr.className = 'border-b border-gray-400 hover:bg-gray-100';
    tr.innerHTML = `
      <td class="p-3 text-left">${task.taskId}</td>
      <td class="p-3 text-left">${task.title}</td>
      <td class="p-3 text-left">${task.completed ? '✅' : '❌'}</td>
      <td class="p-3 text-center align-middle">
        <button id="${task.id}-btn-edit" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">✏️</button>
        <button id="${task.id}-btn-delete" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);

    document.getElementById(`${task.id}-btn-delete`).addEventListener('click', async () => {
      await deleteTask(task.id);
      onDelete();
    });

    document.getElementById(`${task.id}-btn-edit`).addEventListener('click', async () => {
       await onEdit(task);
    });
  });
}