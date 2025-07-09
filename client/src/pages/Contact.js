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
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Contact</h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <input name="name" placeholder="Nom" className="border p-2" {...formik.getFieldProps('name')} />
          {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}
          <input name="email" placeholder="Email" className="border p-2" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email && <div className="text-red-500 text-sm">{formik.errors.email}</div>}
          <textarea name="message" placeholder="Message" className="border p-2" {...formik.getFieldProps('message')} />
          {formik.touched.message && formik.errors.message && <div className="text-red-500 text-sm">{formik.errors.message}</div>}
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">Envoyer</button>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
