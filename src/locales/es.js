export default {
  navigation: {
    brand: {
      name: 'David Deras',
      shortName: 'DDeras',
      tagline: 'Fullstack & producto',
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
      ues: 'Recursos UES',
      tutorials: 'Tutoriales',
      tools: 'Herramientas',
    },
    backToMain: 'Volver al menú principal',
    viewBlogEntries: 'Ver entradas de blog',
    search: 'Buscar',
    links: {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'Mail',
    },
  },
  seo: {
    siteName: 'David Deras · Ingeniero Full Stack',
    twitterHandle: 'daiv_09',
    defaults: {
      title: 'Ingeniero Full Stack que crea productos con Vue, Laravel y TypeScript',
      description:
        'Portafolio, tutoriales y casos GovTech de David Deras. Vue 3, Laravel y despliegues cloud con foco en accesibilidad y UX.',
      keywords: [
        'David Deras',
        'Ingeniero Full Stack',
        'Vue 3',
        'Laravel 11',
        'Vuetify',
        'TypeScript',
        'GovTech',
        'El Salvador',
      ],
      author: 'David Deras',
      ogImage: 'https://www.deras.dev/punpun_OG.jpg',
      ogImageAlt: 'Mockups con los proyectos y tutoriales de David Deras',
    },
    pages: {
      home: {
        title: 'Producto: Vue y Laravel',
        description:
          'Explora la agenda, entregables destacados y áreas de enfoque de David Deras, ingeniero full stack que construye plataformas públicas y tooling interno.',
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
      tutorials: {
        title: 'Tutoriales y notas',
        description:
          'Guías sobre Azure, Railway, despliegues de Vue y automatización para documentar flujos repetibles.',
        keywords: ['Tutorial Azure', 'Deploy Railway', 'Guía Vue'],
      },
      ues: {
        title: 'Recursos académicos UES',
        description:
          'Repositorio colaborativo para Ingeniería de Sistemas: pensum, laboratorios, exámenes y formatos administrativos.',
        keywords: ['Recursos UES', 'Guías académicas', 'Laboratorios'],
      },
      tools: {
        title: 'Herramientas y experimentos',
        description:
          'Utilidades como Pixedai Studio para generar pixel art y otras herramientas internas que acompañan el trabajo diario.',
        keywords: ['Pixedai', 'Herramienta pixel art', 'Utilidades para desarrolladores'],
      },
    },
  },
  loader: {
    message: 'Cargando…',
  },
  hero: {
    eyebrow: 'Hola, soy',
    title: 'David Deras',
    highlight: 'Full Stack Engineer enfocado en Vue, Laravel y TypeScript',
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
      { name: 'Infra', detail: 'Vercel · Railway · Azure Static' },
      { name: 'UX Ops', detail: 'Vuetify · GSAP · Vitest' },
    ],
    agendaTitle: 'Agenda inmediata',
    agenda: [
      { title: 'Portal clínico DTIC - MINSAL', status: 'Release semanal' },
      { title: 'ERP Carmencita Store', status: 'Optimización post go-live' },
      { title: 'MusyCharts OSS', status: 'Feature tracking en TS' },
    ],
    snapshotTitle: 'Snapshot',
    focusNotes: [
      { label: 'Base', value: 'San Salvador, SV' },
      { label: 'Experiencia', value: '+2 años Full Stack' },
      { label: 'Sectores', value: 'GovTech · Retail · Analítica' },
    ],
    codeLabel: 'profile.js',
    roles: [
      'Full Stack Engineer · DTIC - MINSAL',
      'Especialista Vue 3 + Laravel',
      'Mentor de habilidades digitales UES',
      'Facilitador de workshops JS/TS',
    ],
  },
  overview: {
    eyebrow: 'Mapa de contenidos',
    title: 'Espacios en constante iteración',
    lead: 'Proyectos, guías y recursos que crecen con cada entrega. Todo está dividido en rutas claras para que explores según lo que necesitas.',
    cards: [
      {
        label: '01',
        title: 'Proyectos y casos',
        body: 'Sistemas empresariales, dashboards y herramientas personales con documentación técnica clara.',
        tags: ['Vue 3', 'Laravel', 'Vuetify'],
        cta: 'Ver dossier',
        to: '/projects',
      },
      {
        label: '02',
        title: 'Tutoriales y notas',
        body: 'Guías cortas sobre despliegues, cloud y automatizaciones que uso a diario.',
        tags: ['Azure', 'Railway', 'Automatización'],
        cta: 'Abrir blog',
        to: '/tutorials',
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
    title: 'Full Stack orientado a Vue, Laravel y producto',
    lead: 'Ingeniero con más de dos años construyendo sistemas para gobierno, retail y plataformas colaborativas. Me enfoco en accesibilidad, SEO y despliegues cloud que mantienen el ritmo de equipos multidisciplinarios.',
    quickFacts: [
      { label: 'Ubicación', value: 'San Salvador, El Salvador' },
      { label: 'Teléfono', value: '+503 7464-1460' },
      { label: 'Email', value: 'davidderas50@gmail.com' },
      { label: 'Idiomas', value: 'Español (nativo) · Inglés (A2)' },
      { label: 'Modalidad', value: 'Remoto · Híbrido' },
    ],
    buttons: {
      downloadCv: 'Descargar CV',
      contact: 'Contactar',
    },
    focus: {
      title: 'Enfoque',
      body: 'Diseño y programo productos que automatizan procesos institucionales: expedientes clínicos, ERP para retail costero o plataformas de matching. Parto de investigación, defino acuerdos de API y documento para que equipos de diseño, QA y operaciones puedan iterar sin fricción.',
    },
    skills: {
      title: 'Competencias principales',
      updated: 'Actualizado 2025',
      items: [
        { name: 'Vue 3 + TypeScript + Vite', level: 93 },
        { name: 'Laravel 11 · PHP 8 APIs', level: 90 },
        { name: 'Integración REST / GraphQL', level: 84 },
        { name: 'Node.js tooling & tests', level: 80 },
        { name: 'UX / UI & accesibilidad', level: 82 },
      ],
    },
    experience: {
      title: 'Experiencia y entregables',
      timeline: [
        {
          date: 'Jan 2024 - Presente',
          title: 'Full Stack Engineer · DTIC - MINSAL',
          description:
            'Desarrollo de plataformas públicas y sistemas internos para el Ministerio de Salud: nuevas funcionalidades, integraciones, monitoreo y mejoras de performance/SEO en Vue 3 y Laravel.',
          tags: ['Vue 3', 'Laravel', 'GovTech'],
        },
        {
          date: 'Mar 2023 - Jun 2023',
          title: 'Full Stack Developer · Carmencita Store',
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
      items: [
        'GovTech & salud digital',
        'Playbooks JS/TS',
        'Automation con Node',
        'Accesibilidad y SEO',
        'Mentorías y educación abierta',
      ],
    },
  },
  projects: {
    eyebrow: 'Selección de trabajo',
    title: 'Proyectos que combinan negocio y UX',
    lead: 'Casos construidos con equipos pequeños, procesos claros y entregables iterativos. Cada dossier detalla retos técnicos y decisiones de producto.',
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
  tutorials: {
    eyebrow: 'Notas y tutoriales',
    title: 'Bitácora técnica abierta',
    lead: 'Registros prácticos sobre despliegue, cloud y automatización. Son apuntes que uso para repetir procesos sin fricción.',
    filters: {
      all: 'Todos',
      search: 'Buscar por tema o etiqueta',
    },
    table: {
      tutorial: 'Tutorial',
      area: 'Área',
      year: 'Año',
      tags: 'Etiquetas',
      action: 'Acción',
      open: 'Abrir',
      empty: 'No hay resultados con los filtros actuales.',
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
        description: 'Parciales, laboratorios y resúmenes de asignaturas impartidas en aula.',
        driveLink: 'LINK_A_CARPETA_PRESENCIAL',
        featured: [
          { name: 'Matemática I · Guías', link: '#' },
          { name: 'Programación I · Ejemplos', link: '#' },
          { name: 'Física I · Laboratorios', link: '#' },
        ],
      },
      {
        title: 'Modalidad a distancia',
        mode: 'Virtual',
        description: 'Tutorías grabadas, guías y material diseñado para autoestudio.',
        driveLink: 'LINK_A_CARPETA_DISTANCIA',
        featured: [
          { name: 'Material didáctico', link: '#' },
          { name: 'Guías de estudio', link: '#' },
          { name: 'Tutorías destacadas', link: '#' },
        ],
      },
      {
        title: 'Extras y utilidades',
        mode: 'General',
        description: 'Pensum, formatos administrativos, software recomendado y utilidades.',
        driveLink: 'LINK_A_CARPETA_EXTRAS',
        featured: [
          { name: 'Pensum oficial', link: '#' },
          { name: 'Formatos UES', link: '#' },
          { name: 'Herramientas de apoyo', link: '#' },
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
      'Full Stack Engineer en San Salvador. Construyo sistemas públicos y ERP con Vue 3, TypeScript y Laravel, documentando cada entrega para que los equipos escalen sin fricción.',
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
          body: 'Activa una librería curada o conserva los tonos originales.',
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
      resolution: 'Bloque {block} · {width} × {height}',
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
