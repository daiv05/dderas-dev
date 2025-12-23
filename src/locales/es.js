import { contactInfo } from '@/data/contact';

export default {
  navigation: {
    brand: {
      name: 'DDeras',
      shortName: 'DDeras',
      tagline: 'Desarrollador Full Stack',
      blogTagline: 'Tech blog',
    },
    themeToggle: {
      toLight: 'Modo claro',
      toDark: 'Modo oscuro',
      lightShort: 'Claro',
      darkShort: 'Oscuro',
    },
    languageToggle: {
      label: 'Idioma',
      en: 'EN',
      es: 'ES',
    },
    items: {
      home: 'Inicio',
      about: 'Sobre mí',
      projects: 'Proyectos',
      blog: 'Blog',
      ues: 'Recursos UES',
      tools: 'Herramientas',
    },
    backToMain: 'Portafolio',
    backToBlog: 'Inicio',
    viewBlogEntries: 'Ver posts',
    search: 'Buscar',
    links: {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'Correo',
    },
  },
  seo: {
    siteName: 'DDeras',
    twitterHandle: 'daiv_09',
    defaults: {
      title: 'Desarrollador Full Stack con Vue, Laravel y TypeScript',
      description:
        'Portafolio personal, proyectos reales y artículos técnicos sobre Vue, Laravel y despliegues en la nube.',
      keywords: [
        contactInfo.name,
        'Desarrollador Full Stack',
        'Frontend Developer',
        'Backend Developer',
        'Vue 3',
        'Vue 2',
        'Vue',
        'Laravel 11',
        'Vuetify',
        'PrimeVue',
        'TypeScript',
        'El Salvador',
        'DDeras',
      ],
      author: contactInfo.name,
      ogImage: `${contactInfo.siteUrl}/punpun_OG.jpg`,
      ogImageAlt: 'Proyectos y artículos técnicos',
    },
    pages: {
      home: {
        title: 'Desarrollando con Vue y Laravel',
        description: 'Proyectos, experimentos y aprendizajes usando Vue 3, Laravel y TypeScript.',
        keywords: ['Desarrollo web', 'Vue.js', 'Laravel'],
      },
      me: {
        title: 'Un poco sobre mí',
        description: 'Mi experiencia, aprendizaje y en qué he trabajado.',
        keywords: [contactInfo.name, 'Perfil profesional', 'Experiencia', 'DDeras', 'daiv05'],
      },
      projects: {
        title: 'Proyectos',
        description: 'Aplicaciones reales en las que he trabajado y cómo las construí.',
        keywords: ['Proyectos', 'Casos reales', 'Portafolio'],
      },
      blog: {
        title: 'Blog',
        description: 'Apuntes, guías y soluciones sobre desarrollo web que uso a diario.',
        keywords: ['Blog tech', 'Vue', 'Laravel', 'Desarrollo web'],
      },
      ues: {
        title: 'Recursos UES',
        description: 'Material académico organizado para estudiantes de Ingeniería de Sistemas.',
        keywords: ['Recursos', 'UES', 'Ingeniería', 'Ingeniería de Sistemas'],
      },
      tools: {
        title: 'Herramientas y experimentos',
        description: 'Pequeños proyectos y cosas que voy probando.',
        keywords: ['Herramientas', 'Experimentos', 'Dev tools'],
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
    imageViewer: {
      download: 'Descargar imagen',
      close: 'Cerrar',
    },
    constructionNotice: 'Esta página está en construcción. Pronto habrá contenido real disponible.',
  },
  loader: {
    message: 'Cargando…',
  },
  hero: {
    eyebrow: 'Hola, soy',
    title: contactInfo.name,
    highlight: 'Full Stack Developer (Vue · Laravel · TypeScript)',
    roleLabel: 'Rol actual',
    lead: 'Llevo más de dos años construyendo aplicaciones web para instituciones y proyectos públicos. Me gusta trabajar con Vue 3 y Laravel, cuidar el UX y dejar todo bien documentado para que escale sin problemas.',
    ctas: {
      primary: 'Ver proyectos',
      secondary: 'Escribirme',
    },
    stackTitle: 'Stack que uso',
    techStack: [
      { name: 'Frontend', detail: 'Vue 3 · TypeScript · Vite · Pinia' },
      { name: 'Backend', detail: 'Laravel · PHP 8 · APIs REST' },
      { name: 'Infra', detail: 'Vercel · Railway · GCP · Cloudflare' },
      { name: 'UI', detail: 'Vuetify · PrimeVue · Figma' },
      { name: 'Testing', detail: 'Vitest' },
      { name: 'AI Tools', detail: 'Copilot · Claude · Codex' },
    ],
    agendaTitle: 'En qué estoy ahora',
    agenda: [
      { title: 'Sistema de incidencias FIA-UES', status: 'Puesta en producción' },
      { title: 'MusyCharts v2', status: 'Rediseño y SEO' },
      { title: 'Aprendiendo React', status: 'En progreso' },
    ],
    snapshotTitle: 'Datos rápidos',
    focusNotes: [
      { label: 'Base', value: `${contactInfo.city}, ${contactInfo.countryCode}` },
      { label: 'Experiencia', value: '+2 años' },
      { label: 'Áreas', value: 'GovTech · Retail · Analítica' },
    ],
    codeLabel: 'profile.js',
    roles: ['Full Stack Developer · MINSAL', 'Vue & Laravel Specialist'],
  },
  overview: {
    eyebrow: 'Qué encontrarás aquí',
    title: 'Contenido en constante evolución',
    lead: 'Este sitio es una mezcla de portafolio, blog y repositorio de recursos. Entra a lo que te sirva y vuelve cuando quieras.',
    cards: [
      {
        label: '01',
        title: 'Proyectos',
        body: 'Proyectos en los que he trabajado, con decisiones técnicas y lo que aprendí en el proceso.',
        tags: ['Vue 3', 'Laravel', 'Full Stack'],
        cta: 'Ver proyectos',
        to: '/projects',
      },
      {
        label: '02',
        title: 'Blog',
        body: 'Notas técnicas, tutoriales cortos y soluciones prácticas.',
        tags: ['Vue 3', 'Laravel', 'Cloud'],
        cta: 'Ir al blog',
        to: '/blog',
      },
      {
        label: '03',
        title: 'Recursos UES',
        body: 'Material organizado para estudiantes de Ingeniería de Sistemas Informáticos.',
        tags: ['Guías', 'Laboratorios', 'Clases'],
        cta: 'Ver recursos',
        to: '/resources',
      },
    ],
    collaboration: {
      title: '¿Tienes una idea?',
      body: 'Si quieres colaborar o necesitas ayuda con un proyecto, escríbeme y lo vemos.',
      cta: 'Contactar',
    },
  },
  about: {
    eyebrow: 'Perfil profesional',
    title: 'Full Stack orientado a Vue y Laravel',
    lead: 'Desarrollador con más de dos años construyendo sistemas para gobierno, retail y plataformas colaborativas. Me enfoco en accesibilidad, SEO y despliegues cloud que mantienen el ritmo de equipos multidisciplinarios.',
    facts: {
      location: 'Ubicación',
      locationValue: contactInfo.location,
      github: 'GitHub',
      email: 'Email',
      languages: 'Idiomas',
      languagesValue: 'Español (nativo) · Inglés (A2)',
      mode: 'Modalidad',
      modeValue: 'Remoto · Híbrido · Presencial',
    },
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
      groups: [
        {
          title: 'Frontend',
          items: [
            'Vue 3 · TypeScript · Vite',
            'Arquitectura de componentes',
            'Pinia y manejo de estado',
            'SEO y SSR en SPAs',
            'Accesibilidad (a11y)',
          ],
        },
        {
          title: 'Backend',
          items: [
            'Laravel 10/11/12 · PHP 8',
            'Diseño de APIs REST',
            'Roles y permisos (Spatie)',
            'Modelado de datos y relaciones',
            'Optimización de rendimiento',
          ],
        },
        {
          title: 'Infra & Deploy',
          items: [
            'Vercel · Railway · GCP',
            'Nginx básico',
            'HTTPS, dominios y redirects',
            'CI/CD simple con GitHub',
            'Entornos dev / prod',
          ],
        },
        {
          title: 'Producto & Proceso',
          items: [
            'Documentación técnica',
            'Iteración por entregables',
            'Trabajo con requerimientos reales',
            'Mantenimiento y soporte',
          ],
        },
      ],
    },
    experience: {
      title: 'Experiencia y entregables',
      timeline: [
        {
          date: 'Ene 2024 - Presente',
          title: 'Desarrollador Full Stack · DTIC - MINSAL',
          description:
            'Desarrollo de plataformas públicas y sistemas internos para el Ministerio de Salud: nuevas funcionalidades, integraciones, monitoreo y mejoras de performance en Vue 3 y Laravel.',
          tags: ['Vue 3', 'Laravel', 'GovTech'],
        },
        {
          date: 'Ago 2024 - Dic 2025',
          title: 'Proyecto Horas Sociales · FIA - UES',
          description:
            'Desarrollo de un sistema de gestión de incidencias y reportes para el programa de horas sociales de la Facultad de Ingeniería y Arquitectura.',
          tags: ['Laravel', 'Vue', 'Gestión de incidencias'],
        },
        {
          date: 'Mar 2023 - Jun 2023',
          title: 'Desarrollador Full Stack · Carmencita Store',
          description:
            'Construcción de un ERP para inventario, RRHH y delivery en la zona costera. Planeación SCRUM, interfaces en Figma y despliegues coordinados con el equipo administrativo.',
          tags: ['Laravel', 'Vue', 'ERP'],
        },
        {
          date: 'Jun 2023 - Dic 2023',
          title: 'Frontend Intern · Secretaría de Innovación / CASATIC',
          description:
            'Programa de habilidades digitales con enfoque en desarrollo y metodologías ágiles para innovación pública.',
          tags: ['Vue', 'Agile'],
        },
        {
          date: '2019 - Actualidad',
          title: 'Ingeniería de Sistemas Informáticos · UES',
          description:
            'Último año de la carrera, reforzando algoritmos, bases de datos y liderazgo estudiantil en comunidades tech.',
          tags: ['Academia', 'Liderazgo'],
        },
      ],
    },
    interests: {
      title: 'Intereses actuales',
      items: ['Animaciones CSS', 'Desarrollo con React', 'Optimización SEO'],
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
      viewOnline: 'Ver en producción',
      viewRepo: 'Revisar código',
    },
  },
  ues: {
    eyebrow: 'Recursos UES',
    title: 'Repositorio colaborativo',
    lead: 'Material académico para Ingeniería de Sistemas. Todo organizado por modalidad.',
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
    description: `${contactInfo.title} en ${contactInfo.city}. Construyo apps con Vue, Laravel y TypeScript, siempre pensando en mantenerlas simples y escalables.`,
    quickMap: 'Secciones',
    links: {
      home: 'Inicio',
      projects: 'Proyectos',
      ues: 'Recursos UES',
      tools: 'Herramientas',
    },
    downloadCv: 'Descargar CV',
    contact: 'Contacto',
    builtWith: 'Hecho con ❤️ usando Vue',
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
