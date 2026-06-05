// src/pages/visitorPage.js
import { getTasks } from '../services/taskService.js'
import { authStore } from '../store/authStore.js'
import { loginPage } from './loginPage.js'

export async function visitorPage() {
  document.getElementById('app').innerHTML = `
    <div class="bg-slate-50 min-h-screen flex flex-col">
      <div class="flex items-center justify-between p-4 bg-gray-800 text-white">
        <h1 class="text-xl font-bold">TasksApp — Visitante</h1>
        <button id="btn-logout"
          class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Cerrar sesión
        </button>
      </div>
      <div class="p-6">
        <input type="text" placeholder="🔍 Buscar tarea..."
          class="w-full p-3 rounded-lg border border-gray-300 outline-none mb-6"
          id="input-buscar"/>
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-800 text-white">
              <th class="p-3 text-left">ID</th>
              <th class="p-3 text-left">Title</th>
              <th class="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody id="tbody"></tbody>
        </table>
      </div>
    </div>
  `;

  let globalTasks = [];

  async function uploadTasks() {
    const tasks = await getTasks();
    globalTasks = tasks;
    renderTasks(tasks);
  }

  function renderTasks(tasks) {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    tasks.forEach(task => {
      const tr = document.createElement('tr');
      tr.className = 'border-b border-gray-400 hover:bg-gray-100';
      tr.innerHTML = `
        <td class="p-3">${task.taskId}</td>
        <td class="p-3">${task.title}</td>
        <td class="p-3">${task.completed ? '✅' : '❌'}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  await uploadTasks();

  document.getElementById('input-buscar').addEventListener('input', (e) => {
    const texto = e.target.value.trim().toLowerCase();
    const filtradas = !texto ? globalTasks : globalTasks.filter(t => t.title.toLowerCase().includes(texto));
    renderTasks(filtradas);
  });

  document.getElementById('btn-logout').addEventListener('click', () => {
    authStore.onLogout(loginPage);
  });
}