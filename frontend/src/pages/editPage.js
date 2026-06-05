
import { navigateTo } from '../router/router.js';
import { updateTask } from '../services/taskService.js';
import { tasksPage } from './tasksPage.js'

export async function onEdit(data){
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
    <div class="flex gap-3 items-center">
      <input value="${data.title}" type="text" placeholder="Título" id="input-title"
        class="flex-1 p-3 rounded-lg border border-gray-300 outline-none w-2/3"/>
      <select id="select-completed"
        class="flex-1 p-3 rounded-lg border border-gray-300 outline-none w-1/3">
        <option value="false">Pendiente</option>
        <option value="true">Completada</option>
      </select>
      <button id="btn-editar"
        class="bg-green-500 text-white p-3 px-6 rounded-lg font-semibold hover:bg-green-600">
        + Editar tarea
      </button>
    </div>
  </div>
`
  document.getElementById("btn-editar").addEventListener("click", async(e)=>{
    e.preventDefault()
    const title = document.getElementById('input-title').value.trim();
    const completed = document.getElementById('select-completed').value === 'true';
    if (!title) return;

    await updateTask(data.id,{title, completed})
    navigateTo('/tasks')
  })
}