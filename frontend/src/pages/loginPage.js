// src/pages/loginPage.js
import { loginUser } from '../services/authService.js'
import { authStore } from '../store/authStore.js'
import { tasksPage } from './tasksPage.js'
import { visitorPage } from './visitorPage.js'

export function loginPage() {
  document.getElementById('app').innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-slate-50">
      <div class="bg-white p-8 rounded-xl shadow w-96 flex flex-col gap-4">
        <h2 class="text-2xl font-bold text-gray-800">Iniciar sesión</h2>
        <input id="input-email" type="email" placeholder="Email"
          class="p-3 border border-gray-300 rounded-lg outline-none"/>
        <input id="input-password" type="password" placeholder="Contraseña"
          class="p-3 border border-gray-300 rounded-lg outline-none"/>
        <p id="error-msg" class="text-red-500 text-sm hidden">Email o contraseña incorrectos</p>
        <button id="btn-login"
          class="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700">
          Entrar
        </button>
      </div>
    </div>
  `;

  document.getElementById('btn-login').addEventListener('click', async () => {
    const email = document.getElementById('input-email').value.trim();
    const password = document.getElementById('input-password').value.trim();

    const user = await loginUser(email, password);

    if (!user) {
      document.getElementById('error-msg').classList.remove('hidden');
      return;
    }

    authStore.onLogin(user);

    if (user.role === 'admin') {
      tasksPage();
    } else {
      visitorPage();
    }
  });
}