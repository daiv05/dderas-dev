const projectList = [
  {
    id: 'reportfia',
    date: '2024',
    tags: [
      'Laravel',
      'TailwindCSS',
      'Flowbite',
      'Chart.js',
      'PWA',
      'MySQL',
      'Spatie Permission',
      'Audits',
      'Reports',
      'Excel',
    ],
    online: true,
    repo: false,
    images: {
      0: '/img/projects/reportfia-pics/1.png',
    },
    link: null,
    link_repo: null,
    translations: {
      es: {
        name: 'Sistema para el control de incidencias FIA - UES',
        description:
          'Sistema integral de gestión de incidencias y mantenimiento para la Facultad de Ingeniería y Arquitectura de la Universidad de El Salvador.',
        longDescription:
          'ReportFIA es una aplicación PWA desarrollada en Laravel que permite crear, asignar, seguir y resolver reportes de incidencias, gestionar personal y recursos, auditar operaciones y visualizar métricas para la toma de decisiones. \n\n El sistema surgió para optimizar la gestión interna de la facultad, el requerimiento principal era contar con una herramienta digital que centralizara y automatizara el proceso de manejo de incidencias, la facultad tenía interés en llevar un mejor control de los reportes y su resolución, así como mejorar la comunicación entre estudiantes, personal y administración. \n\nLa elección de las tecnologías fue en conjunto con el cliente (FIA-UES) y el equipo de desarrollo, se optó por Laravel debido a su robustez y facilidad para construir aplicaciones web escalables, TailwindCSS se seleccionó para un diseño rápido y responsivo, Chart.js para las visualizaciones de datos, y PWA para asegurar una experiencia móvil fluida, ya que se esperaba que la mayoría de usuarios accedieran desde dispositivos móviles. \n\n Se inició con un análisis detallado de los requerimientos del cliente, tomados mediante reuniones periodicas, seguido por los diseños iniciales de la interfaz (utilizando Figma) y la arquitectura del sistema. La implementación se llevó a cabo en fases, comenzando por las funcionalidades básicas de reportes y seguimiento, para luego integrar módulos adicionales como gestión de personal, auditorías y dashboards analíticos. \n\n Durante el desarrollo, se realizaron pruebas continuas con usuarios clave de la facultad para asegurar que el sistema cumpliera con sus necesidades y se ajustara según su feedback. Finalmente, se desplegó el sistema en un entorno de producción y se capacitó al personal administrativo para su uso efectivo.',
        client: 'Facultad de Ingeniería y Arquitectura - UES',
        category: 'Gestión de incidencias / Mantenimiento',
        technologies:
          'Laravel 10.x, TailwindCSS, Flowbite, Chart.js, MySQL, PWA, Spatie Permission, Audits, Reports, Excel',
        features: [
          'Creación y seguimiento completo del ciclo de vida de reportes',
          'Gestión de personal, puestos y asignaciones',
          'Control de inventario y bienes patrimoniales',
          'Registro y consulta de auditoría completa',
          'Dashboard de estadísticas con exportación a varios formatos',
          'Autenticación y control de acceso por roles (RBAC)',
          'PWA con assets y capturas para experiencia móvil',
          'Importación masiva desde Excel y validaciones',
          'Notificaciones y experiencia responsive',
        ],
      },
      en: {
        name: 'FIA Incident Management System - UES',
        description:
          'Comprehensive incident and maintenance management system for the Faculty of Engineering and Architecture (University of El Salvador).',
        longDescription:
          "ReportFIA is a PWA application built with Laravel that enables creating, assigning, tracking, and resolving incident reports, managing personnel and resources, auditing operations, and visualizing metrics for decision-making. \n\n The system was developed to optimize the faculty's internal management; the main requirement was to have a digital tool that centralized and automated the incident handling process. The faculty sought to improve report tracking and resolution, as well as enhance communication between students, staff, and administration. \n\n The choice of technologies was made in collaboration with the client (FIA-UES) and the development team. Laravel was chosen for its robustness and ease of building scalable web applications, TailwindCSS for rapid and responsive design, Chart.js for data visualizations, and PWA to ensure a smooth mobile experience since most users were expected to access it from mobile devices. \n\n The project began with a detailed analysis of the client's requirements through periodic meetings, followed by initial interface designs (using Figma) and system architecture planning. Implementation was carried out in phases, starting with basic reporting and tracking functionalities, followed by additional modules such as personnel management, audits, and analytical dashboards. \n\n Throughout development, continuous testing was conducted with key faculty users to ensure the system met their needs and was adjusted based on their feedback. Finally, the system was deployed in a production environment, and administrative staff were trained for effective use.",
        client: 'Faculty of Engineering and Architecture - UES',
        category: 'Incident management / Maintenance',
        technologies:
          'Laravel 10.x, TailwindCSS, Chart.js, MySQL, PWA, Spatie Permission, Audits, Reports, Excel',
        features: [
          'Full lifecycle incident reporting and tracking',
          'Personnel and position management with assignments',
          'Inventory and institutional asset control',
          'Comprehensive audit logging and traceability',
          'Analytics dashboard with export capabilities',
          'Authentication and RBAC access control',
          'PWA-ready with mobile screenshots and icons',
          'Bulk import from Excel with validation',
          'Responsive, modern UI and real-time notifications',
        ],
      },
    },
  },
  {
    id: 'musycharts',
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
          'MusyCharts conecta con la API de Spotify para extraer estadísticas personalizadas y mostrarlas con amCharts 5 en dashboards interactivos que revelan hábitos musicales y géneros predominantes. La aplicación permite a los usuarios autenticarse mediante OAuth 2.0, seleccionar rangos de tiempo y explorar sus tendencias de escucha a través de gráficos dinámicos y un diseño moderno y responsive. \n\n Es un proyecto personal desarrollado para aprender sobre integración de APIs, autenticación OAuth y visualización de datos en la web (y practicar con OAuth fue muy acertado ya que terminé trabajando con ello en mi siguiente trabajo). \n\n La decisión de usar Vue.js y Vuetify podría decir que se basó en su facilidad para construir interfaces reactivas y componentes modulares (aunque realmente no necesitas todo un framework para algo como esto, fue más para practicar), mientras que amCharts 5 lo elegí porque quería probar otra librería a parte de Charts.js y esta se veía bastante prometedora. \n\n El desarrollo comenzó con la configuración del entorno y maquetación de algunas vistas (en este caso no utilicé Figma y fui directamente al código), seguido por las pruebas e implementación de la autenticación OAuth 2.0. Luego se diseñaron y desarrollaron los dashboards utilizando amCharts 5 para representar visualmente los datos obtenidos. \n\n Tiempo después decidí hacer un rediseño completo para hacer mas llamativa la interfaz y mejorar la experiencia de usuario, agregando nuevas visualizaciones y optimizando el rendimiento general de la aplicación.',
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
          "MusyCharts connects to the Spotify API to fetch personalized statistics and display them using amCharts 5 in interactive dashboards that reveal listening habits and top genres. The app allows users to authenticate via OAuth 2.0, select time ranges, and explore their listening trends through dynamic charts and a modern, responsive design. \n\n It is a personal project developed to learn about API integration, OAuth authentication, and data visualization on the web (and practicing OAuth was a great choice since I ended up working with it in my next job). \n\n The decision to use Vue.js and Vuetify was based on their ease of building reactive interfaces and modular components (although you don't really need a full framework for something like this, it was more for practice), while I chose amCharts 5 because I wanted to try another library besides Charts.js and this one looked quite promising. \n\n Development began with setting up the environment and laying out some views (in this case I didn't use Figma and went straight to code), followed by testing and implementing OAuth 2.0 authentication. Then the dashboards were designed and developed using amCharts 5 to visually represent the fetched data. \n\n Later on, I decided to do a complete redesign to make the interface more appealing and improve user experience, adding new visualizations and optimizing overall application performance.",
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
    id: 'carmencita',
    date: '2023',
    tags: ['Vue.js', 'Laravel', 'MySQL', 'TailwindCSS', 'REST API', 'Sanctum'],
    online: false,
    repo: true,
    images: {
      0: '/img/projects/carmencita-pics/0.png',
      1: '/img/projects/carmencita-pics/1.jpeg',
      2: '/img/projects/carmencita-pics/2.png',
      3: '/img/projects/carmencita-pics/3.png',
      4: '/img/projects/carmencita-pics/4.png',
      5: '/img/projects/carmencita-pics/5.jpeg',
    },
    link: '#',
    link_repo: 'https://github.com/daiv05/carmencita_vuejs',
    translations: {
      es: {
        name: 'Sistema de Gestión Carmencita',
        description:
          'Plataforma integral para inventario, facturación, RRHH y delivery pensada para tiendas.',
        longDescription:
          'ERP desarrollado a medida con módulos conectados: inventario, facturación, gestión de planillas y control de pedidos a domicilio con seguimiento GPS.',
        client: 'Tienda y Depósito "Carmencita"',
        category: 'Software empresarial',
        technologies: 'Vue.js, TailwindCSS, Laravel, MySQL',
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
          'Custom ERP with connected modules: inventory, invoicing, payroll automation and delivery tracking with GPS plus an analytics control panel.',
        client: '"Carmencita" store & depot',
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
    id: 'ratiosinsights',
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
    id: 'cheroomsv',
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

export { projectList };
