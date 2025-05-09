import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ConfirmationDialog from './ConfirmationDialog';

const AdminDashboard = () => {
  // Auth token header for admin API calls
  const token = localStorage.getItem('token');
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
  const [activeTab, setActiveTab] = useState('formações');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Courses state
  const [courses, setCourses] = useState([]);
  // initial state for a new course including extra fields and lessons
  const initialCourseState = { title: '', studentDescription: '', description: '', instructor: '', price: '', thumbnail: '', discount: '', previousPrice: '', lessons: [], duration: '' };
  const [newCourse, setNewCourse] = useState(initialCourseState);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null); // State for the course being edited

  // Users state
  const [users, setUsers] = useState([]);

  // Stats state
  const [stats, setStats] = useState(null);

  // Confirmation dialog state
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);

  // Fetch functions
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/courses', { headers: authHeaders });
      if (!res.ok) throw new Error('Failed to load courses');
      setCourses(await res.json());
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users', { headers: authHeaders });
      if (!res.ok) throw new Error('Failed to load users');
      setUsers(await res.json());
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/stats', { headers: authHeaders });
      if (!res.ok) throw new Error('Failed to load stats');
      setStats(await res.json());
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchCourses(); }, []);
  useEffect(() => { if (activeTab === 'utilizadores') fetchUsers(); }, [activeTab]);
  useEffect(() => { if (activeTab === 'estatísticas') fetchStats(); }, [activeTab]);

  // Course actions
  const handleCreateCourse = async (e) => {
    e.preventDefault();

    // Clean the newCourse object by removing empty string fields
    const cleanedCourse = { ...newCourse };
    Object.keys(cleanedCourse).forEach((key) => {
      if (cleanedCourse[key] === "") {
        cleanedCourse[key] = null; // Or delete cleanedCourse[key];
      }
    });

    try {
      const res = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify(cleanedCourse),
      });
      if (!res.ok) throw new Error('Create failed');
      // Reset form and close modal
      setNewCourse(initialCourseState);
      setShowAddCourse(false);
      fetchCourses();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditCourse = async (id, updatedCourse) => {
    try {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify(updatedCourse),
      });
      if (!res.ok) throw new Error('Update failed');
      fetchCourses(); // Refresh the courses list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    await fetch(`/api/admin/courses/${id}`, { method: 'DELETE', headers: authHeaders });
    fetchCourses();
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
  };

  const closeEditModal = () => {
    setEditingCourse(null);
  };

  // User actions
  const handleDeleteUser = (id) => {
    setConfirmationAction(() => async () => {
      await fetch(`/api/admin/users/${id}`, { method: 'DELETE', headers: authHeaders });
      fetchUsers();
      setShowConfirmation(false);
    });
    setShowConfirmation(true);
  };

  const handleMakeAdmin = (id) => {
    setConfirmationAction(() => async () => {
      await fetch(`/api/admin/users/${id}/admin`, { method: 'POST', headers: authHeaders });
      fetchUsers();
      setShowConfirmation(false);
    });
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-[#DEA54B]">Admin Dashboard</h1>
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 ">
          <nav className="-mb-px flex space-x-4">
            {['Formações','Utilizadores','Estatísticas'].map((tab,index) => {
              const key = tab.toLowerCase();
              const isActive = activeTab === key;
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-2 font-medium text-sm ${isActive ? 'border-b-2 border-[#DEA54B] text-[#DEA54B]' : 'text-gray-600 hover:text-gray-800'}`}>
                  {tab}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="bg-white p-6 rounded shadow">
          {loading && <LoadingSpinner />}
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {activeTab === 'formações' && (
            <div className="space-y-4">
              {/* Button to open the Add Course modal */}
              <button onClick={() => setShowAddCourse(true)} className="bg-gradient-to-r from-[#DEA54B]/70 to-[#D27D2D]/60 text-white font-semibold rounded-lg px-4 py-2 hover:opacity-90">
                Adicionar Formação
              </button>

              {/* Add Course Modal */}
              {showAddCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
                    <div className="max-h-[90vh] overflow-y-auto">
                      <h3 className="text-xl font-semibold mb-4 text-[#DEA54B]">Adicionar Formação</h3>
                      <form onSubmit={handleCreateCourse} className="space-y-4">
                        {/* Title */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Titulo da formação</label>
                          <input type="text" value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500" required />
                        </div>
                        {/* Description */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Descrição (Publica)</label>
                          <textarea value={newCourse.description} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500" rows={3} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Descrição (Alunos)</label>
                          <textarea value={newCourse.studentDescription} onChange={e => setNewCourse({ ...newCourse, studentDescription: e.target.value })} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500" rows={3} />
                        </div>
                        {/* Instructor */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Instrutor</label>
                          <input type="text" value={newCourse.instructor} onChange={e => setNewCourse({ ...newCourse, instructor: e.target.value })} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500" required />
                        </div>
                        {/* Price */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Preço</label>
                          <input type="number" value={newCourse.price} onChange={e => setNewCourse({ ...newCourse, price: e.target.value })} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500" required />
                        </div>
                        {/* Thumbnail URL */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
                          <input type="text" value={newCourse.thumbnail} onChange={e => setNewCourse({ ...newCourse, thumbnail: e.target.value })} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500" />
                        </div>
                        {/* Discount & Previous Price */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Desconto (%)</label>
                            <input type="number" value={newCourse.discount} onChange={e => setNewCourse({ ...newCourse, discount: e.target.value })} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500" />
                          </div>
                        </div>
                        {/* Duration */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Duração (em minutos)</label>
                          <input
                            type="number"
                            value={newCourse.duration}
                            onChange={e => setNewCourse({ ...newCourse, duration: e.target.value })}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        {/* Lessons */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-gray-700">Aulas</label>
                            <button type="button" onClick={() => setNewCourse({ ...newCourse, lessons: [...newCourse.lessons, { title: '', studentDescription: '', description: '',videoUrl: '', order: newCourse.lessons.length }] })} className="text-[#DEA54B] hover:underline text-sm">
                              + Adicionar aula
                            </button>
                          </div>
                          {newCourse.lessons.map((lesson, idx) => (
                            <div key={idx} className="p-4 border rounded-lg space-y-2">
                              {/* Lesson Title */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Titulo da Aula</label>
                                <input type="text" value={lesson.title} onChange={e => {
                                  const updated = [...newCourse.lessons];
                                  updated[idx].title = e.target.value;
                                  setNewCourse({ ...newCourse, lessons: updated });
                                }} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2" required />
                              </div>
                              {/* Description */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Descrição (Publica)</label>
                                <textarea value={lesson.description} onChange={e => {
                                  const updated = [...newCourse.lessons];
                                  updated[idx].description = e.target.value;
                                  setNewCourse({ ...newCourse, lessons: updated });
                                }} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2" rows={2} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Descrição (Alunos)</label>
                                <textarea value={lesson.studentDescription} onChange={e => {
                                  const updated = [...newCourse.lessons];
                                  updated[idx].studentDescription = e.target.value;
                                  setNewCourse({ ...newCourse, lessons: updated });
                                }} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2" rows={2} />
                              </div>
                              {/* Video URL */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Video URL</label>
                                <input type="text" value={lesson.videoUrl} onChange={e => {
                                  const updated = [...newCourse.lessons];
                                  updated[idx].videoUrl = e.target.value;
                                  setNewCourse({ ...newCourse, lessons: updated });
                                }} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2" />
                              </div>
                              {/* Remove Lesson */}
                              <button type="button" onClick={() => {
                                const filtered = newCourse.lessons.filter((_, i) => i !== idx);
                                setNewCourse({ ...newCourse, lessons: filtered });
                              }} className="text-red-500 hover:underline text-sm">
                                Remover Aula
                              </button>
                            </div>
                          ))}
                        </div>
                        {/* Modal Actions */}
                        <div className="flex justify-end space-x-4 pt-4 border-t">
                          <button type="button" onClick={() => { setShowAddCourse(false); setNewCourse(initialCourseState); }} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg px-4 py-2">
                            Cancelar
                          </button>
                          <button type="submit" className="bg-gradient-to-r from-[#DEA54B]/70 to-[#D27D2D]/60 text-white font-semibold rounded-lg px-4 py-2 hover:opacity-90">
                            Guardar Formação
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* Close Icon */}
                    <button type="button" onClick={() => setShowAddCourse(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">
                      &times;
                    </button>
                  </div>
                </div>
              )}
              {/* Existing Courses Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titulo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instrutor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alunos</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {courses.map((c,index) => (
                      <tr key={c._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">€{c.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.instructor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.enrolledStudents?.length || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button onClick={() => openEditModal(c)} className="text-blue-500 hover:text-blue-700">Editar</button>
                          <button onClick={()=>handleDeleteCourse(c._id)} className="text-red-500 hover:text-red-700">Apagar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {editingCourse && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
                <div className="max-h-[90vh] overflow-y-auto">
                  <h3 className="text-xl font-semibold mb-4 text-[#DEA54B]">Editar Formação</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEditCourse(editingCourse._id, editingCourse);
                      closeEditModal();
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Titulo</label>
                      <input
                        type="text"
                        value={editingCourse.title}
                        onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                        className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Descrição Publica</label>
                      <textarea
                        value={editingCourse.description}
                        onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                        className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Descrição Alunos</label>
                      <textarea
                        value={editingCourse.studentDescription}
                        onChange={(e) => setEditingCourse({ ...editingCourse, studentDescription: e.target.value })}
                        className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Preço</label>
                      <input
                        type="number"
                        value={editingCourse.price}
                        onChange={(e) => setEditingCourse({ ...editingCourse, price: e.target.value })}
                        className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Aulas</label>
                      {editingCourse.lessons.map((lesson, index) => (
                        <div key={index} className="border p-4 rounded-lg mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Titulo Aula</label>
                            <input
                              type="text"
                              value={lesson.title}
                              onChange={(e) => {
                                const updatedLessons = [...editingCourse.lessons];
                                updatedLessons[index].title = e.target.value;
                                setEditingCourse({ ...editingCourse, lessons: updatedLessons });
                              }}
                              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Descrição Aula Publica</label>
                            <textarea
                              value={lesson.description}
                              onChange={(e) => {
                                const updatedLessons = [...editingCourse.lessons];
                                updatedLessons[index].description = e.target.value;
                                setEditingCourse({ ...editingCourse, lessons: updatedLessons });
                              }}
                              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                              rows={2}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Descrição Aula Alunos</label>
                            <textarea
                              value={lesson.studentDescription}
                              onChange={(e) => {
                                const updatedLessons = [...editingCourse.lessons];
                                updatedLessons[index].studentDescription = e.target.value;
                                setEditingCourse({ ...editingCourse, lessons: updatedLessons });
                              }}
                              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                              rows={2}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Video URL</label>
                            <input
                              type="text"
                              value={lesson.videoUrl}
                              onChange={(e) => {
                                const updatedLessons = [...editingCourse.lessons];
                                updatedLessons[index].videoUrl = e.target.value;
                                setEditingCourse({ ...editingCourse, lessons: updatedLessons });
                              }}
                              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updatedLessons = editingCourse.lessons.filter((_, i) => i !== index);
                              setEditingCourse({ ...editingCourse, lessons: updatedLessons });
                            }}
                            className="mt-2 text-red-500 hover:underline text-sm"
                          >
                            Remover Aula
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const newLesson = { title: '', description: '', videoUrl: '' };
                          setEditingCourse({ ...editingCourse, lessons: [...editingCourse.lessons, newLesson] });
                        }}
                        className="text-blue-500 hover:underline text-sm"
                      >
                        Adicionar Aula
                      </button>
                    </div>
                    <div className="flex justify-end space-x-4 pt-4 border-t">
                      <button
                        type="button"
                        onClick={closeEditModal}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg px-4 py-2"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-[#DEA54B]/70 to-[#D27D2D]/60 text-white font-semibold rounded-lg px-4 py-2 hover:opacity-90"
                      >
                        Guardar alterações
                      </button>
                    </div>
                  </form>
                </div>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                >
                  &times;
                </button>
              </div>
            </div>
          )}

          {activeTab === 'utilizadores' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((u,index) => (
                    <tr key={u._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.isAdmin ? '✓' : '✕'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        {!u.isAdmin && <button onClick={()=>handleMakeAdmin(u._id)} className="text-[#DEA54B] hover:text-primary-700">Tornar Admin</button>}
                        <button onClick={()=>handleDeleteUser(u._id)} className="text-red-500 hover:text-red-700">Apagar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'estatísticas' && stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Valor Total</h4>
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Total de Alunos</h4>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEnrollments}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Formações</h4>
                <p className="text-2xl font-bold text-gray-900">{stats.courseCount}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationDialog
          message="Tem certeza de que deseja realizar esta ação?"
          onConfirm={confirmationAction}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;