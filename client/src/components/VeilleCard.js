import React, { useState } from 'react';

const Section = ({ text, limit = 220 }) => {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;
  const isLong = text.length > limit;
  return (
    <>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        {isLong && !expanded ? text.slice(0, limit) + '…' : text}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-primary-600 dark:text-primary-400 hover:underline mt-1 text-left"
        >
          {expanded ? 'Voir moins ▲' : 'Voir plus ▼'}
        </button>
      )}
    </>
  );
};

const VeilleCard = ({ veille }) => {
  const date = new Date(veille.created_at).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="text-xs font-medium text-primary-600 dark:text-primary-400 mb-2">📅 {date}</div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">{veille.title}</h3>
      </div>

      {/* Informations collectées */}
      <div className="px-5 pb-3">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">🧠 Informations collectées</p>
        <Section text={veille.content} />
      </div>

      {/* Analyse personnelle */}
      {veille.analysis && (
        <>
          <div className="mx-5 border-t border-gray-100 dark:border-gray-700" />
          <div className="px-5 py-3 bg-primary-50 dark:bg-gray-700/40 flex-1">
            <p className="text-xs font-semibold text-primary-700 dark:text-primary-400 uppercase tracking-wide mb-1">📊 Analyse personnelle</p>
            <Section text={veille.analysis} />
          </div>
        </>
      )}

      {/* Footer */}
      {veille.url && (
        <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700 mt-auto">
          <a
            href={veille.url}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 Voir la source
          </a>
        </div>
      )}
    </div>
  );
};

export default VeilleCard;
