// src/pages/tasksPage.js
import { getTasks, createTask, generarId } from '../services/taskService.js'
import { renderTasks } from '../components/taskTable.js'
import { authStore } from '../store/authStore.js'
import { loginPage } from './loginPage.js'

export async function tasksPage() {
  document.getElementById('app').innerHTML = `
    <div class="bg-slate-50 min-h-screen flex flex-col">
  
  <!-- Navbar -->
  <div class="flex items-center justify-between p-4 bg-gray-800 text-white">
    <h1 class="text-xl font-bold">TasksApp — Admin</h1>
    <button id="btn-logout"
      class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
      Cerrar sesión
    </button>
  </div>

  <!-- Formulario -->
  <div class="flex gap-3 w-full mb-6 flex-col p-10 border-2">
    <input type="text" placeholder="🔍 Buscar tarea..."
      class="p-3 rounded-lg border border-gray-300 outline-none"
      id="input-buscar"/>
    <div class="flex gap-3 items-center">
      <input type="text" placeholder="Título" id="input-title"
        class="flex-1 p-3 rounded-lg border border-gray-300 outline-none w-2/3"/>
      <select id="select-completed"
        class="flex-1 p-3 rounded-lg border border-gray-300 outline-none w-1/3">
        <option value="false">Pendiente</option>
        <option value="true">Completada</option>
      </select>
      <button id="btn-anadir"
        class="bg-green-500 text-white p-3 px-6 rounded-lg font-semibold hover:bg-green-600">
        + Añadir tarea
      </button>
    </div>
  </div>

  <!-- Tabla -->
  <div class="flex-1 overflow-auto px-10">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-800 text-white">
          <th class="p-3 text-left">ID</th>
          <th class="p-3 text-left">Title</th>
          <th class="p-3 text-left">Status</th>
          <th class="p-3 text-center">Delete</th>
        </tr>
      </thead>
      <tbody id="tbody"></tbody>
    </table>
  </div>

</div>
  `;

  let globalTasks = []

  async function uploadTasks() {
    globalTasks = await getTasks();
    renderTasks(globalTasks, uploadTasks);
  }

  await uploadTasks();

  document.getElementById("input-buscar").addEventListener("input", (e) => {
    const texto = e.target.value.trim().toLowerCase();
    const filtradas = !texto ? globalTasks : globalTasks.filter(t => t.title.toLowerCase().includes(texto));
    renderTasks(filtradas, uploadTasks);
  });

  document.getElementById('btn-anadir').addEventListener('click', async () => {
    const title = document.getElementById('input-title').value.trim();
    const completed = document.getElementById('select-completed').value === 'true';
    if (!title) return;

    const id = await generarId();
    await createTask({ taskId: String(id), title, completed });

    document.getElementById('input-title').value = '';
    document.getElementById('select-completed').value = 'false';
    uploadTasks();
  });
  document.getElementById('btn-logout').addEventListener('click', () => {
  authStore.onLogout(loginPage);
  });
}