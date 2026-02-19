import React, { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import usePageMeta from '../hooks/usePageMeta';

const Contact = () => {
  usePageMeta('Contact', 'Contactez Rayane Hakim pour tout projet ou opportunité professionnelle.');
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const endpoint = useMemo(() => process.env.REACT_APP_CONTACT_ENDPOINT || '', []);

  const formik = useFormik({
    initialValues: { name: '', email: '', message: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Nom requis'),
      email: Yup.string().email('Email invalide').required('Email requis'),
      message: Yup.string().required('Message requis'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setStatus({ type: 'loading', message: '' });
      try {
        if (endpoint) {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          });
          if (!res.ok) throw new Error('Erreur serveur');
          setStatus({ type: 'success', message: 'Message envoyé, merci !' });
          resetForm();
        } else {
          const params = new URLSearchParams({
            subject: `Contact depuis le portfolio — ${values.name}`,
            body: `Nom: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`,
          }).toString();
          window.location.href = `mailto:hakimrayane@hotmail.fr?${params}`;
          setStatus({ type: 'success', message: 'Ouverture de votre client mail…' });
          resetForm();
        }
      } catch (e) {
        setStatus({ type: 'error', message: "Impossible d'envoyer le message. Réessayez plus tard." });
      }
    },
  });

  return (
    <Layout containerSize="default">
      <section className="relative mb-10 md:mb-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-10 h-56 w-56 bg-primary-400/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-10 h-64 w-64 bg-violet-400/20 blur-3xl rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Infos */}
          <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-primary-600/90 text-white grid place-items-center" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59c.5.23 1.09.14 1.48-.25l1.94-1.94a1 1 0 0 1 1.05-.24l3.06 1.02a1 1 0 0 1 .66.94v2.49a2 2 0 0 1-2 2c-9.39 0-17-7.61-17-17a2 2 0 0 1 2-2h2.49a1 1 0 0 1 .94.66l1.02 3.06c.14.44.03.93-.24 1.28l-1.94 1.94c-.4.4-.5.99-.25 1.48Z" fill="currentColor"/>
                </svg>
              </div>
              <PageTitle title="Contact" className="mb-0" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-4">
              Une idée, un projet ou une question ? Écrivez-moi, je réponds rapidement.
            </p>
            <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><span className="font-medium">Email:</span> <a className="text-primary-600 hover:underline" href="mailto:hakimrayane@hotmail.fr">hakimrayane@hotmail.fr</a></p>
              <p><span className="font-medium">LinkedIn:</span> <a className="text-primary-600 hover:underline" href="https://www.linkedin.com/in/rayane-hakim-5849bb218/" target="_blank" rel="noreferrer">Profil</a></p>
            </div>
          </div>

          {/* Formulaire */}
          <div className="md:col-span-3 bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6">
            {status.type !== 'idle' && (
              <div className={`mb-4 rounded-md px-3 py-2 text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200' : status.type === 'error' ? 'bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200' : 'bg-gray-50 text-gray-700 dark:bg-gray-700/50 dark:text-gray-200'}`}>
                {status.message || 'Envoi en cours…'}
              </div>
            )}
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                <input id="name" name="name" placeholder="Votre nom" className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600" {...formik.getFieldProps('name')} />
                {formik.touched.name && formik.errors.name && <div className="text-rose-600 text-xs mt-1">{formik.errors.name}</div>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input id="email" name="email" type="email" placeholder="votre@email.com" className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email && <div className="text-rose-600 text-xs mt-1">{formik.errors.email}</div>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Votre message…" className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600" {...formik.getFieldProps('message')} />
                {formik.touched.message && formik.errors.message && <div className="text-rose-600 text-xs mt-1">{formik.errors.message}</div>}
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit" disabled={status.type === 'loading'} className="gap-2">
                  <svg className="-ml-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 3v12m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {status.type === 'loading' ? 'Envoi…' : 'Envoyer'}
                </Button>
                {!endpoint && (
                  <a href="mailto:hakimrayane@hotmail.fr" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">Ou m'écrire directement</a>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
