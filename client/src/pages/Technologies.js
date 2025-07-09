import React from 'react';
import Layout from '../components/Layout';

const technologies = [
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'MariaDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
];

const Technologies = () => (
  <Layout>
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Technologies</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {technologies.map((tech) => (
          <div key={tech.name} className="flex flex-col items-center">
            <img src={tech.logo} alt={tech.name} className="w-16 h-16 mb-2" />
            <span className="text-lg font-medium text-gray-900 dark:text-white">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export default Technologies;
