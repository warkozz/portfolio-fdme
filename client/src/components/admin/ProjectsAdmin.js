import React, { useState } from 'react';
import AddProjectForm from './AddProjectForm';
import EditProjectForm from './EditProjectForm';
import Button from '../Button';
import { useAdminCRUD } from '../../hooks/useAdminCRUD';
import { VisibilityBadge, AdminActionButtons, CategoryBadge } from '../AdminComponents';

const CATEGORIES = [
  { value: 'all',   label: 'Tous',          color: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600' },
  { value: 'perso', label: 'Personnel',     color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300 dark:border-blue-700' },
  { value: 'ecole', label: 'Scolaire',      color: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-300 dark:border-green-700' },
  { value: 'pro',   label: 'Professionnel', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-300 dark:border-purple-700' },
];

const ProjectsAdmin = () => {
  const { items: projects, loading, error, fetchAll, handleDelete, handleToggleVisibility } = useAdminCRUD('projects', 'projects');
  const [editId, setEditId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterCat, setFilterCat] = useState('all');

  const categoryColors = {
    'perso': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'ecole': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'pro': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
  };

  const filteredProjects = filterCat === 'all' ? projects : projects.filter(p => p.category === filterCat);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-red-800 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Projets ({filteredProjects.length}{filterCat !== 'all' && ` / ${projects.length}`})
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Gérez vos projets personnels, scolaires et professionnels
          </p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} variant="primary">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {showAddForm ? 'Annuler' : 'Nouveau projet'}
        </Button>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => {
          const count = cat.value === 'all' ? projects.length : projects.filter(p => p.category === cat.value).length;
          const isActive = filterCat === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setFilterCat(cat.value)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                isActive
                  ? cat.color + ' ring-2 ring-offset-1 ring-current'
                  : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400'
              }`}
            >
              {cat.label}
              <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
                isActive ? 'bg-white/60 dark:bg-black/20' : 'bg-gray-100 dark:bg-gray-700'
              }`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-gradient-to-br from-primary-50 to-violet-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-primary-200 dark:border-gray-700">
          <AddProjectForm onAdded={() => { fetchAll(); setShowAddForm(false); }} />
        </div>
      )}

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Aucun projet</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Commencez par créer un nouveau projet</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Aucun projet dans cette catégorie</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredProjects.map(p => (
            <div key={p.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
              {editId === p.id ? (
                <div className="p-6">
                  <EditProjectForm
                    project={p}
                    onUpdated={() => { setEditId(null); fetchAll(); }}
                    onCancel={() => setEditId(null)}
                  />
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    {/* Project Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                          {p.title}
                        </h3>
                        <CategoryBadge category={p.category} colorMap={categoryColors} />
                        <VisibilityBadge visible={p.visible} />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                        {p.description}
                      </p>
                      {p.competencies && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {p.competencies.split(',').slice(0, 5).map((comp, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                              {comp.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      {p.github_link && (
                        <a href={p.github_link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                          </svg>
                          GitHub
                        </a>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <AdminActionButtons
                      onEdit={() => setEditId(p.id)}
                      onToggleVisibility={() => handleToggleVisibility(p.id, p.visible)}
                      onDelete={() => handleDelete(p.id)}
                      visible={p.visible}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsAdmin;
