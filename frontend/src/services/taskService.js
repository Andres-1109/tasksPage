const urlDb = "http://localhost:3000/todos"

export async function getTasks() {
  const res = await fetch(urlDb);
  return res.json();
}

export async function deleteTask(id) {
  await fetch(`${urlDb}/${id}`, { method: 'DELETE' });
}

export async function createTask(task) {
  await fetch(urlDb, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
}

export async function updateTask(id, task){
  const res = await fetch(`${urlDb}/${id}`,{
    method : "PATCH",
    headers : {"Content-Type": "application/json"},
    body: JSON.stringify(task)
  })
  return res.json()
}

export async function generarId() {
  const tareas = await getTasks();
  if (tareas.length === 0) return 1;
  const maxId = Math.max(...tareas.map(t => Number(t.taskId)));
  return maxId + 1;
}