import { loginPage } from '../views/loginPage.js'
import { tasksPage } from '../views/tasksPage.js'
import { editPage } from '../views/editPage.js'
import { visitorPage } from '../views/visitorPage.js'
import { authStore } from '../store/authStore.js'

authStore.loadData()

if (!authStore.isLogged) {
  window.history.pushState({}, '', '/login')
}

export const routes = [
  { path: '/login',   component: loginPage,   protected: false },
  { path: '/tasks',   component: tasksPage,   protected: true  },
  { path: '/edit',    component: editPage,    protected: true  },
  { path: '/visitor', component: visitorPage, protected: true  }
]

export function navigate() {
  const path = window.location.pathname
  const route = routes.find(r => r.path === path)
  const app = document.getElementById('app')

  if (!route) {
    app.innerHTML = '<h1>404 - Page not found</h1>'
    return
  }

  if (route.protected && !authStore.isLogged) {
    window.history.pushState({}, '', '/login')
    loginPage()
    return
  }

  route.component()
}

window.addEventListener('popstate', navigate)
navigate()

export function navigateTo(path) {
  window.history.pushState({}, '', path)
  navigate()
}