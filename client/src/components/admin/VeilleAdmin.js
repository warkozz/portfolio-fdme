import React, { useState } from 'react';
import AddVeilleForm from './AddVeilleForm';
import EditVeilleForm from './EditVeilleForm';
import Button from '../Button';
import { useAdminCRUD } from '../../hooks/useAdminCRUD';
import { VisibilityBadge, AdminActionButtons, CategoryBadge } from '../AdminComponents';

const VeilleAdmin = () => {
  const { items: veille, loading, error, fetchAll, handleDelete, handleToggleVisibility } = useAdminCRUD('veille', 'veille');
  const [editId, setEditId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const categoryColors = {
    'automatique': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
    'forum': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
  };

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
            Veille Technologique ({veille.length})
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Gérez vos articles de veille automatique et forum
          </p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} variant="primary">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {showAddForm ? 'Annuler' : 'Nouvel article'}
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-gradient-to-br from-primary-50 to-violet-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-primary-200 dark:border-gray-700">
          <AddVeilleForm onAdded={() => { fetchAll(); setShowAddForm(false); }} />
        </div>
      )}

      {/* Veille List */}
      {veille.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Aucun article</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Commencez par créer un nouvel article de veille</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {veille.map(v => (
            <div key={v.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
              {editId === v.id ? (
                <div className="p-6">
                  <EditVeilleForm
                    veille={v}
                    onUpdated={() => { setEditId(null); fetchAll(); }}
                    onCancel={() => setEditId(null)}
                  />
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    {/* Veille Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                          {v.title}
                        </h3>
                        <CategoryBadge category={v.category} colorMap={categoryColors} />
                        <VisibilityBadge visible={v.visible} />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-1">
                        {v.content}
                      </p>
                      {v.analysis && (
                        <p className="text-xs text-primary-700 dark:text-primary-400 line-clamp-1 mb-3 italic">
                          📊 {v.analysis}
                        </p>
                      )}
                      {!v.analysis && (
                        <p className="text-xs text-amber-500 dark:text-amber-400 mb-3">⚠️ Analyse personnelle non renseignée</p>
                      )}
                      {v.url && (
                        <a href={v.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Lire l'article
                        </a>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Publié le {new Date(v.created_at).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <AdminActionButtons
                      onEdit={() => setEditId(v.id)}
                      onToggleVisibility={() => handleToggleVisibility(v.id, v.visible)}
                      onDelete={() => handleDelete(v.id)}
                      visible={v.visible}
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

export default VeilleAdmin;

