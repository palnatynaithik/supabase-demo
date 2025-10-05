// app/page.tsx
import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';

interface Student {
  student_id: number;
  name: string;
  grade: number;
}

export default function HomePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase
        .from('students')
        .select('*');

      if (error) {
        console.error('Error fetching students:', error);
      } else {
        setStudents(data as Student[]);
      }
      setLoading(false);
    };

    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Portal</h1>

      {loading ? (
        <p className="text-center">Loading students...</p>
      ) : (
        <table className="mx-auto w-full max-w-3xl border-collapse border border-gray-300 shadow-md">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Grade</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.student_id} className="text-center hover:bg-gray-100">
                <td className="border px-4 py-2">{s.student_id}</td>
                <td className="border px-4 py-2">{s.name}</td>
                <td className="border px-4 py-2">{s.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

