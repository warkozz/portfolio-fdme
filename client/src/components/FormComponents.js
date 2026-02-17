import React from 'react';
import { FORM_CLASSES } from '../utils/constants';

/**
 * Composant Input réutilisable pour les formulaires admin
 */
export const FormInput = ({ 
  label, 
  required = false, 
  helperText,
  error,
  type = "text",
  ...props 
}) => {
  return (
    <div>
      {label && (
        <label className={FORM_CLASSES.label}>
          {label} {required && <span className={FORM_CLASSES.requiredMark}>*</span>}
        </label>
      )}
      <input
        type={type}
        className={FORM_CLASSES.input}
        required={required}
        {...props}
      />
      {helperText && !error && (
        <p className={FORM_CLASSES.helperText}>{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

/**
 * Composant Textarea réutilisable
 */
export const FormTextarea = ({ 
  label, 
  required = false, 
  helperText,
  error,
  minHeight = "100px",
  ...props 
}) => {
  return (
    <div>
      {label && (
        <label className={FORM_CLASSES.label}>
          {label} {required && <span className={FORM_CLASSES.requiredMark}>*</span>}
        </label>
      )}
      <textarea
        className={`${FORM_CLASSES.textarea} min-h-[${minHeight}]`}
        required={required}
        {...props}
      />
      {helperText && !error && (
        <p className={FORM_CLASSES.helperText}>{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

/**
 * Composant Select réutilisable
 */
export const FormSelect = ({ 
  label, 
  required = false, 
  helperText,
  error,
  children,
  ...props 
}) => {
  return (
    <div>
      {label && (
        <label className={FORM_CLASSES.label}>
          {label} {required && <span className={FORM_CLASSES.requiredMark}>*</span>}
        </label>
      )}
      <select
        className={FORM_CLASSES.input}
        required={required}
        {...props}
      >
        {children}
      </select>
      {helperText && !error && (
        <p className={FORM_CLASSES.helperText}>{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

/**
 * Composant FileInput pour upload de fichiers
 */
export const FormFileInput = ({ 
  label, 
  required = false, 
  helperText,
  error,
  accept = "*",
  fileName,
  onRemove,
  ...props 
}) => {
  return (
    <div>
      {label && (
        <label className={FORM_CLASSES.label}>
          {label} {required && <span className={FORM_CLASSES.requiredMark}>*</span>}
        </label>
      )}
      <div className="mt-1 flex items-center gap-4">
        <label className="flex-1 cursor-pointer">
          <div className="px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-600 dark:hover:border-primary-400 transition-colors text-center">
            <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {fileName || helperText || 'Cliquez pour sélectionner un fichier'}
            </p>
          </div>
          <input
            type="file"
            accept={accept}
            className="hidden"
            required={required}
            {...props}
          />
        </label>
        {fileName && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-600 hover:text-red-700 text-sm"
          >
            Retirer
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
