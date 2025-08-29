import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '../components/Layout';

const Contact = () => {
  const formik = useFormik({
    initialValues: { name: '', email: '', message: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Nom requis'),
      email: Yup.string().email('Email invalide').required('Email requis'),
      message: Yup.string().required('Message requis'),
    }),
    onSubmit: (values, { resetForm }) => {
      alert('Message envoyé !');
      resetForm();
    },
  });

  return (
    <Layout>
      <div className="max-w-lg mx-auto mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Contact</h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <input name="name" placeholder="Nom" className="w-full border rounded-md p-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600" {...formik.getFieldProps('name')} />
            {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>}
          </div>
          <div>
            <input name="email" placeholder="Email" className="w-full border rounded-md p-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600" {...formik.getFieldProps('email')} />
            {formik.touched.email && formik.errors.email && <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>}
          </div>
          <div>
            <textarea name="message" placeholder="Message" rows="5" className="w-full border rounded-md p-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600" {...formik.getFieldProps('message')} />
            {formik.touched.message && formik.errors.message && <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>}
          </div>
          <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium self-start">Envoyer</button>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
