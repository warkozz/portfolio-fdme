import React from 'react';

const VeilleCard = ({ veille }) => (
  <div className="bg-white dark:bg-gray-800 rounded shadow p-4 m-2 max-w-md border border-gray-200 dark:border-gray-700">
    <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{veille.title}</h3>
    <p className="mb-2 text-gray-700 dark:text-gray-300">{veille.content}</p>
    {veille.url && (
      <a href={veille.url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Lien source</a>
    )}
    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{new Date(veille.created_at).toLocaleDateString()}</div>
  </div>
);

export default VeilleCard;
