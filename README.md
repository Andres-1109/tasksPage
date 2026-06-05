# TasksApp

Aplicación web de gestión de tareas con sistema de autenticación por roles. Construida con JavaScript vanilla, Vite y Tailwind CSS v4 en el frontend, y json-server como API REST en el backend.

---

## Características

- Autenticación de usuarios con sesión persistente en `localStorage`
- Dos roles diferenciados: **admin** y **visitante**
- El admin puede crear, visualizar y eliminar tareas
- El visitante solo puede visualizar y buscar tareas
- Búsqueda en tiempo real por título de tarea
- Interfaz completamente responsiva con Tailwind CSS v4
- API REST local simulada con json-server

---

## Estructura del proyecto

```
project/
├── backend/
│   └── db.json              # Base de datos de json-server (usuarios y tareas)
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.js                      # Punto de entrada — enruta según rol
        ├── style.css                    # Estilos globales con Tailwind
        ├── store/
        │   └── authStore.js             # Estado de autenticación global
        ├── services/
        │   ├── authService.js           # Lógica de login contra la API
        │   └── taskService.js           # CRUD de tareas contra la API
        ├── pages/
        │   ├── loginPage.js             # Vista de inicio de sesión
        │   ├── tasksPage.js             # Vista del admin
        │   └── visitorPage.js           # Vista del visitante
        └── components/
            └── taskTable.js             # Componente reutilizable de tabla
```

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm (incluido con Node.js)

---

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd project
```

### 2. Instalar dependencias del frontend

```bash
cd frontend
npm install
```

---

## Levantar el proyecto

El proyecto requiere ejecutar **dos servidores en paralelo**: el backend con json-server y el frontend con Vite. Abre dos terminales.

### Terminal 1 — Backend (json-server)

```bash
# Desde la carpeta raíz del proyecto
npx json-server backend/db.json
```

El servidor quedará disponible en: `http://localhost:3000`

Endpoints disponibles:
- `GET /users` — Lista de usuarios
- `GET /todos` — Lista de tareas
- `POST /todos` — Crear tarea
- `DELETE /todos/:id` — Eliminar tarea

### Terminal 2 — Frontend (Vite)

```bash
# Desde la carpeta frontend/
cd frontend
npm run dev
```

La aplicación quedará disponible en: `http://localhost:5173`

---

## Usuarios de prueba

Estos usuarios están precargados en `backend/db.json`:

| Email                  | Contraseña | Rol       |
|------------------------|------------|-----------|
| admin@mail.com         | 1234       | admin     |
| visitante@mail.com     | 1234       | visitor   |

---

## Vistas y funcionalidades

### Login (`loginPage.js`)
- Formulario de email y contraseña
- Valida credenciales contra el endpoint `/users`
- Redirige automáticamente según el rol del usuario
- Muestra mensaje de error si las credenciales son incorrectas

### Vista Admin (`tasksPage.js`)
- Carga y muestra todas las tareas desde `/todos`
- Búsqueda en tiempo real por título
- Formulario para agregar nuevas tareas (título + estado)
- Botón de eliminar por tarea (ícono 🗑️)
- Botón de cerrar sesión

### Vista Visitante (`visitorPage.js`)
- Muestra todas las tareas en modo solo lectura
- Búsqueda en tiempo real por título
- Botón de cerrar sesión

---

## Tecnologías utilizadas

| Herramienta      | Versión  | Uso                              |
|------------------|----------|----------------------------------|
| Vite             | ^8.0.12  | Bundler y servidor de desarrollo |
| Tailwind CSS     | ^4.3.0   | Estilos utilitarios              |
| @tailwindcss/vite| ^4.3.0   | Plugin de integración con Vite   |
| json-server      | —        | API REST simulada                |
| JavaScript ES6+  | —        | Lógica de la aplicación          |

---

## Scripts disponibles

Desde la carpeta `frontend/`:

```bash
npm run dev       # Inicia el servidor de desarrollo
npm run build     # Genera el build de producción
npm run preview   # Previsualiza el build de producción
```

---

## Notas de desarrollo

- La sesión del usuario se persiste en `localStorage` bajo la clave `user`, por lo que al recargar la página el usuario permanece autenticado.
- El enrutamiento es manual: `main.js` evalúa el estado de `authStore` al cargar y renderiza la página correspondiente.
- json-server no implementa autenticación real — este proyecto es de propósito educativo.
