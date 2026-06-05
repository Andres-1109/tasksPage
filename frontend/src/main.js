// src/main.js
import './style.css'
import { authStore } from './store/authStore.js'
import { loginPage } from './pages/loginPage.js'
import { tasksPage } from './pages/tasksPage.js'
import { visitorPage } from './pages/visitorPage.js'

authStore.loadData();

if (!authStore.isLoged) {
  loginPage();
} else if (authStore.user.role === 'admin') {
  tasksPage();
} else {
  visitorPage();
}
