export default {
  navigation: {
    brand: {
      name: 'DDeras',
      shortName: 'DDeras',
      tagline: 'Desarrollador Fullstack',
      blogTagline: 'Blog y artículos',
    },
    themeToggle: {
      toLight: 'Modo claro',
      toDark: 'Modo oscuro',
      lightShort: 'Claro',
      darkShort: 'Oscuro',
    },
    languageToggle: {
      label: 'Idioma',
      en: 'Ing',
      es: 'Esp',
    },
    items: {
      home: 'Inicio',
      about: 'Sobre mí',
      projects: 'Proyectos',
      blog: 'Blog',
      ues: 'Recursos UES',
      tutorials: 'Tutoriales',
      tools: 'Herramientas',
    },
    backToMain: 'Inicio',
    viewBlogEntries: 'Ver entradas de blog',
    search: 'Buscar',
    links: {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'Mail',
    },
  },
  seo: {
    siteName: 'DDeras',
    twitterHandle: 'daiv_09',
    defaults: {
      title: 'Desarrollador Full Stack que crea productos con Vue, Laravel y TypeScript',
      description:
        'Portafolio, tutoriales y proyectos de David Deras. Vue 3, Laravel y despliegues cloud con foco en accesibilidad y UX.',
      keywords: [
        'David Deras',
        'Desarrollador Full Stack',
        'Vue 3',
        'Laravel 11',
        'Vuetify',
        'PrimeVue',
        'TypeScript',
        'El Salvador',
      ],
      author: 'David Deras',
      ogImage: 'https://deras.dev/punpun_OG.jpg',
      ogImageAlt: 'Proyectos y tutoriales',
    },
    pages: {
      home: {
        title: 'Productos con Vue y Laravel',
        description:
          'Explora la agenda, entregables destacados y áreas de enfoque de David Deras, desarrollador full stack que construye plataformas públicas y tooling interno.',
        keywords: ['Ingeniería de producto', 'Especialista Vue', 'Experto Laravel'],
      },
      me: {
        title: 'Perfil y experiencia',
        description:
          'Competencias, línea de tiempo y principios de colaboración basados en accesibilidad, SEO y despliegues cloud.',
        keywords: ['Sobre David', 'Perfil profesional', 'Experiencia'],
      },
      projects: {
        title: 'Proyectos y casos',
        description:
          'Dossiers detallados de portales GovTech, ERP retail y dashboards analíticos diseñados con Vue 3, Laravel 11 y Vuetify.',
        keywords: ['Casos de estudio', 'Proyectos GovTech', 'ERP retail'],
      },
      blog: {
        title: 'Blog y artículos técnicos',
        description:
          'Publicaciones sobre desarrollo full stack, tutoriales y casos prácticos con Vue, Laravel y cloud deployments.',
        keywords: ['Blog técnico', 'Tutoriales Vue', 'Guías Laravel', 'Desarrollo web'],
      },
      ues: {
        title: 'Recursos académicos UES',
        description:
          'Repositorio colaborativo para Ingeniería de Sistemas: pensum, laboratorios, exámenes y formatos administrativos.',
        keywords: ['Recursos UES', 'Guías académicas', 'Laboratorios'],
      },
      tools: {
        title: 'Herramientas y experimentos',
        description: 'Solo experimentos',
        keywords: ['Pixedai', 'Herramienta pixel art', 'Utilidades para desarrolladores'],
      },
    },
  },
  blog: {
    eyebrow: 'Bitácora técnica',
    title: 'Blog y artículos',
    lead: 'Publicaciones sobre desarrollo, tutoriales y casos de uso.',
    backToIndex: 'Volver al índice',
    search: 'Buscar artículos...',
    noResults: 'No se encontraron artículos',
    pagination: {
      page: 'Página',
      of: 'de',
      prev: 'Anterior',
      next: 'Siguiente',
    },
    post: {
      author: 'Autor',
      date: 'Fecha',
      lastUpdated: 'Actualizado',
      readMore: 'Leer más',
      tags: 'Etiquetas',
    },
    toc: {
      show: 'Mostrar índice',
      hide: 'Ocultar índice',
      title: 'Tabla de contenidos',
    },
    nav: {
      prev: 'Anterior',
      next: 'Siguiente',
    },
    constructionNotice: 'Esta página está en construcción. Pronto habrá contenido real disponible.',
  },
  loader: {
    message: 'Cargando…',
  },
  hero: {
    eyebrow: 'Hola, soy',
    title: 'David Deras',
    highlight: 'Desarrollador Full Stack enfocado en Vue, Laravel y TypeScript',
    roleLabel: 'Rol actual',
    lead: 'Más de dos años construyendo sistemas institucionales y plataformas públicas con Vue 3, Laravel y despliegues en la nube. Combino arquitectura full stack, research y UX para entregar software accesible y listo para escalar.',
    ctas: {
      primary: 'Ver proyectos',
      secondary: 'Contacto directo',
    },
    stackTitle: 'Stack operativo',
    techStack: [
      { name: 'Frontend', detail: 'Vue 3 + TS · Vite · Pinia' },
      { name: 'Backend', detail: 'Laravel 11 · PHP 8 · Node APIs' },
      { name: 'Infra', detail: 'Vercel · Railway · GCP · Azure' },
      { name: 'UX Ops', detail: 'Vuetify · PrimeVue · Vitest' },
      { name: 'UI', detail: 'Figma' },
    ],
    agendaTitle: 'Agenda inmediata',
    agenda: [
      { title: 'Sistema de control de incidencias FIA-UES', status: 'Desarrollo en curso' },
      { title: 'MusyCharts v2', status: 'Rediseño de UI/UX y SEO' },
      { title: 'Aprender React', status: 'En progreso' },
    ],
    snapshotTitle: 'Snapshot',
    focusNotes: [
      { label: 'Base', value: 'San Salvador, SV' },
      { label: 'Experiencia', value: '+2 años Full Stack' },
      { label: 'Sectores', value: 'GovTech · Retail · Analítica' },
    ],
    codeLabel: 'profile.js',
    roles: ['Full Stack Developer · DTIC - MINSAL', 'Especialista Vue 3 + Laravel'],
  },
  overview: {
    eyebrow: 'Mapa de contenidos',
    title: 'Espacios en constante iteración',
    lead: 'Proyectos, guías y recursos que crecen con cada entrega. Todo está dividido en rutas claras para que explores según lo que necesitas.',
    cards: [
      {
        label: '01',
        title: 'Proyectos y casos',
        body: 'Proyectos en los que he trabajado, con detalles técnicos y decisiones de producto.',
        tags: ['Vue 3', 'Laravel', 'Vuetify'],
        cta: 'Ver dossier',
        to: '/projects',
      },
      {
        label: '02',
        title: 'Blog y tutoriales',
        body: 'Guías cortas sobre despliegues, cloud, automatizaciones y casos prácticos que uso a diario.',
        tags: ['Vue 3', 'Laravel', 'TypeScript', 'Vercel', 'Railway', 'GCP'],
        cta: 'Abrir blog',
        to: '/blog',
      },
      {
        label: '03',
        title: 'Recursos UES',
        body: 'Repositorio colectivo para la Escuela de Sistemas: pensum, guías, parciales y material de apoyo.',
        tags: ['Documentos', 'Laboratorios', 'Pensum'],
        cta: 'Entrar al drive',
        to: '/resources',
      },
    ],
    collaboration: {
      title: '¿Construimos algo nuevo?',
      body: 'Busco colaborar con equipos que valoran investigación, documentación y ciclos cortos. Comparte tu idea y diseñamos un plan.',
      cta: 'Escribir mensaje',
    },
  },
  about: {
    eyebrow: 'Perfil profesional',
    title: 'Full Stack orientado a Vue y Laravel',
    lead: 'Desarrollador con más de dos años construyendo sistemas para gobierno, retail y plataformas colaborativas. Me enfoco en accesibilidad, SEO y despliegues cloud que mantienen el ritmo de equipos multidisciplinarios.',
    quickFacts: [
      { label: 'Ubicación', value: 'San Salvador, El Salvador' },
      { label: 'Teléfono', value: '+503 7464-1460' },
      { label: 'Email', value: 'davidderas50@gmail.com' },
      { label: 'Idiomas', value: 'Español (nativo) · Inglés (A2)' },
      { label: 'Modalidad', value: 'Remoto · Híbrido · Presencial' },
    ],
    buttons: {
      downloadCv: 'Descargar CV',
      contact: 'Contactar',
    },
    focus: {
      title: 'Enfoque',
      body: 'La accesibilidad, el SEO y los despliegues en la nube son los pilares que moldean mi proceso de desarrollo. Priorizo la documentación clara y las entregas iterativas para asegurar que los productos no solo cumplan con las necesidades actuales, sino que también se adapten sin problemas a futuros desafíos.',
    },
    skills: {
      title: 'Competencias principales',
      updated: 'Actualizado 2025',
      items: [
        { name: 'Vue 3 + TypeScript + Vite', level: 93 },
        { name: 'Laravel 10/11/12 · PHP 8 APIs', level: 90 },
        { name: 'Integración REST', level: 84 },
        { name: 'UX / UI & accesibilidad', level: 82 },
      ],
    },
    experience: {
      title: 'Experiencia y entregables',
      timeline: [
        {
          date: 'Jan 2024 - Presente',
          title: 'Desarrollador Full Stack · DTIC - MINSAL',
          description:
            'Desarrollo de plataformas públicas y sistemas internos para el Ministerio de Salud: nuevas funcionalidades, integraciones, monitoreo y mejoras de performance en Vue 3 y Laravel.',
          tags: ['Vue 3', 'Laravel', 'GovTech'],
        },
        {
          date: 'Mar 2023 - Jun 2023',
          title: 'Desarrollador Full Stack · Carmencita Store',
          description:
            'Construcción de un ERP para inventario, RRHH y delivery en la zona costera. Planeación SCRUM, interfaces en Figma y despliegues coordinados con el equipo administrativo.',
          tags: ['Laravel', 'Vue', 'ERP'],
        },
        {
          date: 'Jun 2023 - Dec 2023',
          title: 'Frontend Intern · Presidencia / CASATIC',
          description:
            'Programa de habilidades digitales con enfoque en testing, despliegue y metodologías ágiles para innovación pública.',
          tags: ['Vue', 'Testing', 'Agile'],
        },
        {
          date: 'Sept 2022 - Dec 2022',
          title: 'Web Developer · Proyecto CheRooms',
          description:
            'Plataforma de roomies con Django + Vue, matching inteligente y chat en tiempo real para estudiantes en San Salvador.',
          tags: ['Django', 'Vue', 'WebSockets'],
        },
        {
          date: '2019 - Actualidad',
          title: 'Computer Systems Engineering · UES',
          description:
            'Último año de la carrera, reforzando algoritmos, bases de datos y liderazgo estudiantil en comunidades tech.',
          tags: ['Academia', 'Liderazgo'],
        },
      ],
    },
    interests: {
      title: 'Intereses actuales',
      items: ['Playbooks JS/TS', 'Accesibilidad y SEO', 'Despliegues cloud', 'UX Ops'],
    },
  },
  projects: {
    eyebrow: 'Selección de trabajo',
    title: 'Proyectos y casos',
    lead: 'Dossiers construidos con procesos claros y entregables iterativos. Cada caso detalla desafíos técnicos y decisiones de producto.',
    labels: {
      summary: 'Resumen',
      deliverables: 'Entregables destacados',
      client: 'Cliente',
      technologies: 'Tecnologías',
      captures: 'Capturas',
      viewFullscreen: 'Ver en pantalla completa',
      viewOnline: 'Ver en producción',
      viewRepo: 'Revisar código',
    },
  },
  ues: {
    eyebrow: 'Recursos UES',
    title: 'Repositorio colaborativo',
    lead: 'Material académico para Ingeniería de Sistemas. Todo organizado por modalidad para que encuentres guías, laboratorios y formatos sin perder tiempo.',
    categories: [
      {
        title: 'Modalidad presencial',
        mode: 'Campus',
        description:
          "Parciales, laboratorios y resúmenes de asignaturas impartidas en aula (ver materias sin '- D' al final).",
        driveLink:
          'https://drive.google.com/drive/folders/1w7WfrEShtjBharxYq_qDqs4lXH1Ao00h?usp=drive_link',
        featured: [
          {
            name: 'Estructura de Datos (ESD115) · Material',
            link: 'https://drive.google.com/drive/folders/1_Wk8OUpedalm-nH1Hgzh4sVXz4bxP6hz?usp=drive_link',
          },
          {
            name: 'Herramientas de Productividad (HDP115) · Clases',
            link: 'https://drive.google.com/drive/folders/1KAQVYhFv5-3MWxEref72lUzQc-sOhFZn?usp=drive_link',
          },
          {
            name: 'Diseño de Sistemas I (DSI115) · Material',
            link: 'https://drive.google.com/drive/folders/1IG_0YzshQNSIfTUo3Zu_yH0GyrXOgwPw?usp=drive_link',
          },
        ],
      },
      {
        title: 'Modalidad a distancia',
        mode: 'Virtual',
        description:
          "Tutorías grabadas, guías y material diseñado para autoestudio (materias con '- D')",
        driveLink:
          'https://drive.google.com/drive/folders/1w7WfrEShtjBharxYq_qDqs4lXH1Ao00h?usp=drive_link',
        featured: [
          {
            name: 'Sistemas Operativos (SIO115 -D)',
            link: 'https://drive.google.com/drive/folders/1AqxsN-dWjaTkj7tI9WuEt6kgwglLip4I?usp=drive_link',
          },
          {
            name: 'Comercio Electrónico (CET115 -D)',
            link: 'https://drive.google.com/drive/folders/1DTjafl8XO2Ri__3DrA6BxQHV-WFtCvj1?usp=drive_link',
          },
          {
            name: 'Comunicaciones I (COS115 -D)',
            link: 'https://drive.google.com/drive/folders/1XAwcZE0ViAKgri47RQPtRicYSWbua1L3?usp=drive_link',
          },
        ],
      },
      {
        title: 'Extras y utilidades',
        mode: 'General',
        description: 'Recursos adicionales: libros, formatos y guías sobre diversos temas.',
        driveLink:
          'https://drive.google.com/drive/folders/1jXPLOqIRuX-uvDZsgJUQJAujQY7NwMvL?usp=drive_link',
        featured: [
          {
            name: 'System Design Interview',
            link: 'https://drive.google.com/file/d/1c9iUwAf2KMpd7mvWbp7kJNDkscLAl0c2/view?usp=drive_link',
          },
          {
            name: 'Frontend Development Projects with Vue.js 3',
            link: 'https://drive.google.com/file/d/1caUfgKQcWmv-CGBo95FHyarBlx_Mo8Qd/view?usp=drive_link',
          },
          {
            name: 'Laravel Up & Running 3rd Edition',
            link: 'https://drive.google.com/file/d/1H4kBZhYmyzhfAwXGjLB_9XittuMJlKBq/view?usp=drive_link',
          },
        ],
      },
    ],
    buttons: {
      openFolder: 'Abrir carpeta',
      share: 'Compartir recurso',
    },
    noteBlock: {
      title: 'Notas',
      body: 'Este repositorio es comunitario y evoluciona con aportes estudiantiles. Si ves enlaces rotos o quieres sumar material, escríbeme.',
    },
  },
  footer: {
    description:
      'Desarrollador Full Stack en San Salvador. Construyo sistemas con Vue 3, TypeScript y Laravel, documentando cada entrega para una escalabilidad fluida del producto.',
    quickMap: 'Mapa rápido',
    links: {
      home: 'Inicio',
      projects: 'Proyectos',
      ues: 'Recursos UES',
      tools: 'Herramientas',
    },
    downloadCv: 'Descargar CV',
    contact: 'Contacto',
    builtWith: 'Construido con ❤️ Vue · Vuetify',
  },
  tools: {
    pixedai: {
      eyebrow: 'Laboratorio visual',
      title: 'Pixedai Studio',
      lead: 'Convierte cualquier imagen en un pixel art consistente, ajustando bloques, escala y paletas en un panel pensado para iterar rápido.',
      status: {
        label: 'Modo beta · experimental',
        body: 'Motor basado en Pixelit con mejoras de accesibilidad y presets listos para documentación, mockups o redes sociales.',
        chips: ['Procesamiento local', 'Canvas dinámico', 'Exporta PNG'],
      },
      panels: {
        inputs: {
          title: 'Entrada y presets',
          body: 'Selecciona la imagen fuente, define el tamaño del bloque y usa atajos para resoluciones comunes.',
          reset: 'Reiniciar',
          uploadLabel: 'Sube una imagen',
          blockLabel: 'Bloque',
          presets: 'Presets rápidos',
          greyscale: 'Escala de grises',
          maxHeight: 'Altura máx (px)',
          maxWidth: 'Ancho máx (px)',
        },
        palette: {
          title: 'Paleta de color',
          body: 'Activa una librería o conserva los tonos originales.',
          switch: 'Aplicar paleta',
          select: 'Biblioteca',
        },
        preview: {
          title: 'Vista previa',
          body: 'Renderiza en vivo sobre canvas y exporta sin perder nitidez.',
          actions: {
            process: 'Procesar de nuevo',
            download: 'Descargar PNG',
          },
          tips: [
            'Las imágenes cuadradas dan resultados más uniformes.',
            'Usa bloques bajos (≤8) para íconos o stickers.',
            'Activa la paleta curada para mantener coherencia entre proyectos.',
          ],
        },
      },
      resolution: 'Bloque {block} · {width} x {height}',
      presets: {
        sticker: 'Sticker',
        icon: 'Icono',
        poster: 'Póster',
        banner: 'Banner',
      },
      imageAlt: 'Referencia base',
    },
  },
};
