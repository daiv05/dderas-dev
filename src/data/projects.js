const project_list = [
  {
    id: 1,
    date: '2023',
    tags: ['Vue.js', 'Vuetify', 'Spotify API', 'amCharts 5', 'OAuth 2.0'],
    online: true,
    repo: true,
    images: {
      0: '/img/projects/musycharts-pics/0.jpeg',
      1: '/img/projects/musycharts-pics/1.jpeg',
      2: '/img/projects/musycharts-pics/2.jpeg',
      3: '/img/projects/musycharts-pics/3.jpeg',
    },
    link: 'https://musycharts-dcdv.vercel.app/',
    link_repo: 'https://github.com/daiv05/musycharts-dcdv',
    translations: {
      es: {
        name: 'MusyCharts',
        description:
          'Aplicación web interactiva que transforma tus datos de Spotify en visualizaciones dinámicas y atractivas.',
        longDescription:
          'MusyCharts conecta con la API de Spotify para extraer estadísticas personalizadas y mostrarlas con amCharts 5 en dashboards interactivos que revelan hábitos musicales y géneros predominantes.',
        client: 'Proyecto personal',
        category: 'Visualización de datos',
        technologies: 'Vue.js, Vuetify, Spotify API, amCharts 5, OAuth 2.0',
        features: [
          'Autenticación OAuth 2.0 con Spotify',
          'Top tracks y artistas por períodos personalizados',
          'Visualización de géneros con gráficos dinámicos',
          'Dashboard interactivo con múltiples vistas',
          'Diseño responsive y moderno',
        ],
      },
      en: {
        name: 'MusyCharts',
        description:
          'Interactive web app that turns your Spotify data into dynamic visualizations.',
        longDescription:
          'MusyCharts connects to the Spotify API to fetch personalized listening stats and renders them with amCharts 5 in interactive dashboards that expose habits, favorite genres and yearly trends.',
        client: 'Personal project',
        category: 'Data visualization',
        technologies: 'Vue.js, Vuetify, Spotify API, amCharts 5, OAuth 2.0',
        features: [
          'OAuth 2.0 authentication with Spotify',
          'Top tracks and artists by custom ranges',
          'Genre analysis with dynamic charts',
          'Multi-view interactive dashboard',
          'Responsive, modern UI',
        ],
      },
    },
  },
  {
    id: 2,
    date: '2023',
    tags: ['Vue.js', 'Laravel', 'MySQL', 'TailwindCSS', 'REST API', 'JWT'],
    online: false,
    repo: false,
    images: {
      0: '/img/projects/carmencita-pics/0.png',
      1: '/img/projects/carmencita-pics/1.jpeg',
      2: '/img/projects/carmencita-pics/2.png',
      3: '/img/projects/carmencita-pics/3.png',
      4: '/img/projects/carmencita-pics/4.png',
      5: '/img/projects/carmencita-pics/5.jpeg',
    },
    link: '#',
    link_repo: '#',
    translations: {
      es: {
        name: 'Sistema de Gestión Carmencita',
        description:
          'Plataforma integral para inventario, facturación, RRHH y delivery pensada para tiendas de barrio.',
        longDescription:
          'ERP desarrollado a medida con módulos conectados: inventario en tiempo real, POS con facturación, gestión de planillas y control de pedidos a domicilio con seguimiento GPS.',
        client: 'Tienda y Depósito “Carmencita”',
        category: 'Software empresarial',
        technologies: 'Vue.js, TailwindCSS, Laravel, MySQL, Redis',
        features: [
          'Inventario con alertas de stock bajo',
          'Punto de venta con impresión de facturas',
          'Planillas automáticas y gestión de RRHH',
          'Pedidos delivery con tracking en tiempo real',
          'Panel administrativo con reportes',
          'Roles y permisos granulares',
          'Notificaciones en tiempo real',
        ],
      },
      en: {
        name: 'Carmencita Management System',
        description:
          'End-to-end management platform for inventory, invoicing, HR and delivery built for local stores.',
        longDescription:
          'Custom ERP with connected modules: real-time inventory, POS with invoicing, payroll automation and delivery tracking with GPS plus an analytics control panel.',
        client: '“Carmencita” store & depot',
        category: 'Enterprise software',
        technologies: 'Vue.js, TailwindCSS, Laravel, MySQL, Redis',
        features: [
          'Inventory with low-stock alerts',
          'Point of sale with invoice printing',
          'Automatic payroll and HR records',
          'Delivery orders with real-time GPS tracking',
          'Admin dashboard with reporting',
          'Granular roles and permissions',
          'Real-time notifications',
        ],
      },
    },
  },
  {
    id: 3,
    date: '2023',
    tags: ['Vue.js', 'Laravel', 'MySQL', 'TailwindCSS', 'SheetJS', 'Chart.js'],
    online: false,
    repo: true,
    images: {
      0: '/img/projects/ratios-pics/1.jpeg',
      1: '/img/projects/ratios-pics/2.jpeg',
      2: '/img/projects/ratios-pics/3.png',
      3: '/img/projects/ratios-pics/4.png',
      4: '/img/projects/ratios-pics/5.png',
      5: '/img/projects/ratios-pics/6.png',
    },
    link: '#',
    link_repo: 'https://github.com/daiv05/ratios-sis',
    translations: {
      es: {
        name: 'RatioInsights',
        description:
          'Herramienta financiera que calcula ratios clave y los compara con benchmarks sectoriales.',
        longDescription:
          'Plataforma para importar estados financieros desde Excel, calcular más de 20 indicadores y generar reportes ejecutivos con visualizaciones históricas.',
        client: 'Proyecto universitario',
        category: 'FinTech',
        technologies: 'Vue.js, TailwindCSS, Laravel, MySQL, SheetJS, Chart.js',
        features: [
          'Importación de libros contables en Excel',
          'Cálculo automático de ratios de liquidez y rentabilidad',
          'Comparación contra promedios de la industria',
          'Visualización de tendencias históricas',
          'Reportes ejecutivos en PDF',
          'Dashboard de KPIs financieros',
        ],
      },
      en: {
        name: 'RatioInsights',
        description:
          'Financial analysis tool that calculates key ratios and benchmarks them against the industry.',
        longDescription:
          'Platform to import financial statements from Excel, compute 20+ metrics automatically and produce executive reports with historical visualizations.',
        client: 'University project',
        category: 'FinTech',
        technologies: 'Vue.js, TailwindCSS, Laravel, MySQL, SheetJS, Chart.js',
        features: [
          'Excel import for financial statements',
          'Automatic liquidity and profitability ratios',
          'Benchmarking against industry averages',
          'Historical trend visualization',
          'Executive PDF reports',
          'Financial KPI dashboard',
        ],
      },
    },
  },
  {
    id: 4,
    date: '2022',
    tags: ['Vue.js', 'Django', 'PostgreSQL', 'WebSockets', 'REST Framework'],
    online: false,
    repo: true,
    images: {
      0: '/img/projects/roomies-pics/0.png',
      1: '/img/projects/roomies-pics/1.png',
      2: '/img/projects/roomies-pics/2.png',
      3: '/img/projects/roomies-pics/3.jpeg',
    },
    link: '#',
    link_repo: 'https://github.com/daiv05/cherooms-proy',
    translations: {
      es: {
        name: 'CheRooms SV',
        description:
          'Plataforma social para conectar roomies en San Salvador con perfiles verificados y chat en tiempo real.',
        longDescription:
          'Red con algoritmo de matching por presupuesto, ubicación y estilo de vida; integra mensajería WebSocket y reseñas para mejorar la confianza.',
        client: 'Proyecto universitario',
        category: 'Plataforma social',
        technologies: 'Vue.js, Django, PostgreSQL, Django Channels, WebSockets',
        features: [
          'Registro y autenticación con verificación de email',
          'Perfiles con preferencias y requisitos',
          'Matching por compatibilidad',
          'Chat en tiempo real',
          'Búsqueda avanzada con filtros',
          'Gestión de anuncios de habitaciones',
          'Sistema de reseñas',
        ],
      },
      en: {
        name: 'CheRooms SV',
        description:
          'Social platform that connects roommates in San Salvador with verified profiles and live chat.',
        longDescription:
          'Network with a matching algorithm based on budget, location and lifestyle plus WebSocket messaging and reviews to boost trust.',
        client: 'University project',
        category: 'Social platform',
        technologies: 'Vue.js, Django, PostgreSQL, Django Channels, WebSockets',
        features: [
          'Onboarding with email verification',
          'Detailed profiles with requirements',
          'Compatibility-based matching',
          'Real-time chat',
          'Advanced search with filters',
          'Room listing management',
          'Review and rating system',
        ],
      },
    },
  },
];

export default project_list;
