const tutorials_list = [
  {
    id: 1,
    date: '2022',
    author: 'David Deras',
    online: true,
    technologies: 'Linux, Azure',
    image: '/img/tutos/azure-vm.jpeg',
    link: 'https://musycharts-dcdv.vercel.app/',
    color: 'blue-grey-lighten-5',
    translations: {
      es: {
        name: 'VM Linux en Azure',
        description: 'Crea una máquina virtual desde cero en Azure.',
        category: 'Cloud',
        tags: ['Azure', 'Cloud', 'Máquina virtual', 'Linux'],
      },
      en: {
        name: 'Linux VM on Azure',
        description: 'Spin up a virtual machine from scratch on Azure.',
        category: 'Cloud',
        tags: ['Azure', 'Cloud', 'Virtual machine', 'Linux'],
      },
    },
  },
  {
    id: 2,
    date: '2022',
    author: 'David Deras',
    online: true,
    technologies: 'Azure',
    image: '/img/tutos/azure-account.png',
    link: 'https://musycharts-dcdv.vercel.app/',
    color: 'blue-grey-lighten-4',
    translations: {
      es: {
        name: 'Cuenta .edu en Azure',
        description: 'Activa una cuenta con email .edu y recibe $100 USD de crédito sin tarjeta.',
        category: 'Cloud',
        tags: ['Azure', 'Cloud'],
      },
      en: {
        name: '.edu account on Azure',
        description:
          'Create an Azure account with your .edu email and claim $100 credit with no card.',
        category: 'Cloud',
        tags: ['Azure', 'Cloud'],
      },
    },
  },
  {
    id: 3,
    date: '2022',
    author: 'David Deras',
    online: true,
    technologies: 'Linux, Azure, RedHat 7',
    image: '/img/tutos/hdp-herramientas.png',
    link: 'https://musycharts-dcdv.vercel.app/',
    color: 'blue-grey-lighten-3',
    translations: {
      es: {
        name: 'Guía herramientas HDP v5.2',
        description: 'Instala cada componente del stack HDP sobre RHEL 7 paso a paso.',
        category: 'Cloud',
        tags: ['Azure', 'RedHat 7', 'RHEL 7', 'Máquina virtual', 'Linux'],
      },
      en: {
        name: 'HDP tools guide v5.2',
        description: 'Configure every HDP stack component on RHEL 7 step by step.',
        category: 'Cloud',
        tags: ['Azure', 'RedHat 7', 'RHEL 7', 'Virtual machine', 'Linux'],
      },
    },
  },
  {
    id: 4,
    date: '2022',
    author: 'David Deras',
    online: true,
    technologies: 'Linux, Azure, RedHat 7',
    image: '/img/tutos/rhel7-lampp56.png',
    link: 'https://musycharts-dcdv.vercel.app/',
    color: 'blue-grey-lighten-2',
    translations: {
      es: {
        name: 'LAMPP 5 en RHEL 7',
        description: 'Instala un servidor LAMPP (PHP 5.6) optimizado para RedHat 7.',
        category: 'Cloud',
        tags: ['Azure', 'RedHat 7', 'RHEL 7', 'Máquina virtual', 'Linux'],
      },
      en: {
        name: 'LAMPP 5 on RHEL 7',
        description: 'Deploy a tuned LAMPP stack (PHP 5.6) on RedHat 7.',
        category: 'Cloud',
        tags: ['Azure', 'RedHat 7', 'RHEL 7', 'Virtual machine', 'Linux'],
      },
    },
  },
  {
    id: 5,
    date: '2023',
    author: 'David Deras',
    online: true,
    technologies: 'Railway, Laravel, API',
    image: '/img/tutos/laravel-railway.png',
    link: 'https://musycharts-dcdv.vercel.app/',
    color: 'blue-grey-lighten-3',
    translations: {
      es: {
        name: 'Desplegando una API Laravel',
        description: 'Publica una API Laravel 10 en Railway usando MySQL administrado.',
        category: 'Cloud',
        tags: ['Railway', 'Laravel', 'API'],
      },
      en: {
        name: 'Deploying a Laravel API',
        description: 'Ship a Laravel 10 API to Railway with a managed MySQL database.',
        category: 'Cloud',
        tags: ['Railway', 'Laravel', 'API'],
      },
    },
  },
  {
    id: 6,
    date: '2023',
    author: 'David Deras',
    online: true,
    technologies: 'Vue.js, Vercel',
    image: '/img/tutos/vue-vercel.png',
    link: 'https://musycharts-dcdv.vercel.app/',
    color: 'blue-grey-lighten-4',
    translations: {
      es: {
        name: 'Desplegando Vue.js App',
        description: 'Automatiza el despliegue de una SPA en Vercel con variables seguras.',
        category: 'Cloud',
        tags: ['Vue.js', 'Vercel'],
      },
      en: {
        name: 'Deploying a Vue.js app',
        description: 'Automate the rollout of a SPA on Vercel with secure envs.',
        category: 'Cloud',
        tags: ['Vue.js', 'Vercel'],
      },
    },
  },
];

export default tutorials_list;
