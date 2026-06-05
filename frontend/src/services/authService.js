// src/services/authService.js
const urlUsers = "http://localhost:3000/users"

export async function loginUser(email, password) {
  const res = await fetch(urlUsers);
  const users = await res.json();

  const user = users.find(u => u.email === email && u.password === password);
  return user || null; // retorna el usuario o null si no existe
}