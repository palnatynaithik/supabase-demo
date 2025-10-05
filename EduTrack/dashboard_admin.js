import { supabase } from './supabaseClient.js'

const logoutBtn = document.getElementById('logoutBtn')
logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut()
  window.location.href = 'auth.html'
})

// Table bodies
const studentTableBody = document.getElementById('studentTableBody')
const teacherTableBody = document.getElementById('teacherTableBody')
const parentTableBody = document.getElementById('parentTableBody')

// Forms
const addStudentForm = document.getElementById('addStudentForm')
const addTeacherForm = document.getElementById('addTeacherForm')
const addParentForm = document.getElementById('addParentForm')

// CRUD functions
async function fetchStudents() {
  const { data, error } = await supabase.from('students').select('*')
  if(error) return console.error(error)
  studentTableBody.innerHTML = ''
  data.forEach(s=>{
    const row = document.createElement('tr')
    row.className = 'hover:bg-gray-50'
    row.innerHTML = `<td class="p-3">${s.id}</td><td class="p-3">${s.name}</td><td class="p-3">${s.grade}</td><td class="p-3">${new Date(s.created_at).toLocaleString()}</td>
    <td class="p-3 text-center space-x-2">
      <button onclick="editStudent(${s.id})" class="bg-[var(--primary-light)] text-white px-3 py-1 rounded-lg">Edit</button>
      <button onclick="deleteStudent(${s.id})" class="bg-[var(--accent-orange)] text-white px-3 py-1 rounded-lg">Delete</button>
    </td>`
    studentTableBody.appendChild(row)
  })
}

async function fetchTeachers() {
  const { data, error } = await supabase.from('teachers').select('*')
  if(error) return console.error(error)
  teacherTableBody.innerHTML = ''
  data.forEach(t=>{
    const row = document.createElement('tr')
    row.className = 'hover:bg-gray-50'
    row.innerHTML = `<td class="p-3">${t.id}</td><td class="p-3">${t.name}</td><td class="p-3">${t.phone || ''}</td><td class="p-3">${new Date(t.created_at).toLocaleString()}</td>
    <td class="p-3 text-center space-x-2">
      <button onclick="editTeacher('${t.id}')" class="bg-[var(--primary-light)] text-white px-3 py-1 rounded-lg">Edit</button>
      <button onclick="deleteTeacher('${t.id}')" class="bg-[var(--accent-orange)] text-white px-3 py-1 rounded-lg">Delete</button>
    </td>`
    teacherTableBody.appendChild(row)
  })
}

async function fetchParents() {
  const { data, error } = await supabase.from('parents').select('*')
  if(error) return console.error(error)
  parentTableBody.innerHTML = ''
  data.forEach(p=>{
    const row = document.createElement('tr')
    row.className = 'hover:bg-gray-50'
    row.innerHTML = `<td class="p-3">${p.id}</td><td class="p-3">${p.name}</td><td class="p-3">${p.phone || ''}</td><td class="p-3">${p.studentId || ''}</td><td class="p-3">${new Date(p.created_at).toLocaleString()}</td>
    <td class="p-3 text-center space-x-2">
      <button onclick="editParent('${p.id}')" class="bg-[var(--primary-light)] text-white px-3 py-1 rounded-lg">Edit</button>
      <button onclick="deleteParent('${p.id}')" class="bg-[var(--accent-orange)] text-white px-3 py-1 rounded-lg">Delete</button>
    </td>`
    parentTableBody.appendChild(row)
  })
}

// Add handlers
addStudentForm.addEventListener('submit', async (e)=>{
  e.preventDefault()
  const name = document.getElementById('addStudentName').value
  const grade = parseInt(document.getElementById('addStudentGrade').value)
  await supabase.from('students').insert([{name, grade}])
  addStudentForm.reset()
  fetchStudents()
})

addTeacherForm.addEventListener('submit', async (e)=>{
  e.preventDefault()
  const name = document.getElementById('addTeacherName').value
  const phone = document.getElementById('addTeacherPhone').value
  await supabase.from('teachers').insert([{name, phone}])
  addTeacherForm.reset()
  fetchTeachers()
})

addParentForm.addEventListener('submit', async (e)=>{
  e.preventDefault()
  const name = document.getElementById('addParentName').value
  const phone = document.getElementById('addParentPhone').value
  const studentId = parseInt(document.getElementById('addParentStudentId').value)
  await supabase.from('parents').insert([{name, phone, studentId}])
  addParentForm.reset()
  fetchParents()
})

// Delete / Edit functions
window.deleteStudent = async (id)=>{
  if(!confirm('Delete this student?')) return
  await supabase.from('students').delete().eq('id', id)
  fetchStudents()
}

window.deleteTeacher = async (id)=>{
  if(!confirm('Delete this teacher?')) return
  await supabase.from('teachers').delete().eq('id', id)
  fetchTeachers()
}

window.deleteParent = async (id)=>{
  if(!confirm('Delete this parent?')) return
  await supabase.from('parents').delete().eq('id', id)
  fetchParents()
}

// Edit functions can be implemented as modals or prompt dialogs
window.editStudent = async (id)=>{
  const { data } = await supabase.from('students').select('*').eq('id', id).single()
  const name = prompt("Student Name:", data.name)
  const grade = parseInt(prompt("Grade:", data.grade))
  if(name && grade) await supabase.from('students').update({name, grade}).eq('id', id)
  fetchStudents()
}

window.editTeacher = async (id)=>{
  const { data } = await supabase.from('teachers').select('*').eq('id', id).single()
  const name = prompt("Teacher Name:", data.name)
  const phone = prompt("Phone:", data.phone)
  if(name) await supabase.from('teachers').update({name, phone}).eq('id', id)
  fetchTeachers()
}

window.editParent = async (id)=>{
  const { data } = await supabase.from('parents').select('*').eq('id', id).single()
  const name = prompt("Parent Name:", data.name)
  const phone = prompt("Phone:", data.phone)
  const studentId = parseInt(prompt("Child Student ID:", data.studentId))
  if(name) await supabase.from('parents').update({name, phone, studentId}).eq('id', id)
  fetchParents()
}

// Initial load
fetchStudents()
fetchTeachers()
fetchParents()
