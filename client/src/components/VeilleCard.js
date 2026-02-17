import React from 'react';

const VeilleCard = ({ veille }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-5 max-w-md border border-gray-100 dark:border-gray-700">
    <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{veille.title}</h3>
    <p className="mb-3 text-gray-700 dark:text-gray-300">{veille.content}</p>
    {veille.url && (
      <a href={veille.url} className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">Lien source</a>
    )}
    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{new Date(veille.created_at).toLocaleDateString()}</div>
  </div>
);

export default VeilleCard;
