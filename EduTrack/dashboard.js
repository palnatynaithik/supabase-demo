import { supabase } from './supabaseClient.js'

const studentTableBody = document.getElementById('studentTableBody')
const logoutBtn = document.getElementById('logoutBtn')

logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut()
  window.location.href='auth.html'
})

async function loadData() {
  const { data: sessionData } = await supabase.auth.getSession()
  if(!sessionData.session) window.location.href='auth.html'
  const userId = sessionData.session.user.id

  let students = []

  // Check role
  const { data: adminData } = await supabase.from('admins').select('*').eq('id', userId).single()
  if(adminData) students = (await supabase.from('students').select('*')).data

  const { data: teacherData } = await supabase.from('teachers').select('*').eq('id', userId).single()
  if(teacherData) students = (await supabase.from('students').select('*')).data

  const { data: studentData } = await supabase.from('students').select('*').eq('id', userId).single()
  if(studentData) students = [studentData]

  const { data: parentData } = await supabase.from('parents').select('*').eq('id', userId).single()
  if(parentData) {
    students = (await supabase.from('students').select('*').eq('id', parentData.studentId)).data
  }

  studentTableBody.innerHTML = ''
  students.forEach(s=>{
    const row = document.createElement('tr')
    row.className="hover:bg-gray-50"
    row.innerHTML=`<td class="p-4">${s.id}</td><td class="p-4">${s.name}</td><td class="p-4">${s.grade}</td><td class="p-4">${new Date(s.created_at).toLocaleString()}</td>`
    studentTableBody.appendChild(row)
  })
}

loadData()
