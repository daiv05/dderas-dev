export default {
  navigation: {
    brand: {
      name: 'DDeras',
      shortName: 'DDeras',
      tagline: 'Fullstack Developer',
      blogTagline: 'Blog & articles',
    },
    themeToggle: {
      toLight: 'Light mode',
      toDark: 'Dark mode',
      lightShort: 'Light',
      darkShort: 'Dark',
    },
    languageToggle: {
      label: 'Language',
      en: 'EN',
      es: 'ES',
    },
    items: {
      home: 'Home',
      about: 'About me',
      projects: 'Projects',
      blog: 'Blog',
      ues: 'UES resources',
      tools: 'Tools',
    },
    backToMain: 'Home',
    viewBlogEntries: 'View blog entries',
    search: 'Search',
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
      title: 'Full Stack Developer shipping Vue, Laravel and TypeScript products',
      description:
        'Portfolio, tutorials and projects from David Deras. Vue 3, Laravel and cloud deployments focused on accessibility and UX.',
      keywords: [
        'David Deras',
        'Full Stack Developer',
        'Vue 3',
        'Laravel 11',
        'Vuetify',
        'PrimeVue',
        'TypeScript',
        'El Salvador',
      ],
      author: 'David Deras',
      ogImage: 'https://deras.dev/punpun_OG.jpg',
      ogImageAlt: 'Projects and tutorials',
    },
    pages: {
      home: {
        title: 'Product with Vue and Laravel',
        description:
          'Explore the agenda, featured deliveries and focus areas of David Deras, a full stack developer building platforms and internal tooling.',
        keywords: ['Product engineering', 'Vue specialist', 'Laravel expert'],
      },
      me: {
        title: 'Profile and experience',
        description:
          'Skills, experience timeline and collaboration principles shaped by accessibility, SEO and cloud deployments.',
        keywords: ['About David', 'Professional profile', 'Experience timeline'],
      },
      projects: {
        title: 'Projects and case studies',
        description:
          'Detailed dossiers covering GovTech portals, retail ERPs and analytics dashboards designed with Vue 3, Laravel 11 and Vuetify.',
        keywords: ['Case studies', 'GovTech projects', 'Retail ERP'],
      },
      blog: {
        title: 'Blog & technical articles',
        description:
          'Posts about full stack development, tutorials and practical cases with Vue, Laravel and cloud deployments.',
        keywords: ['Technical blog', 'Vue tutorials', 'Laravel guides', 'Web development'],
      },
      ues: {
        title: 'UES academic resources',
        description:
          'Collaborative repository for Computer Systems Engineering students: syllabuses, labs, exams and administrative formats.',
        keywords: ['UES resources', 'Academic guides', 'Labs'],
      },
      tools: {
        title: 'Tools and experiments',
        description: 'Just experiments',
        keywords: ['Pixedai', 'Pixel art tool', 'Developer utilities'],
      },
    },
  },
  blog: {
    eyebrow: 'Technical logbook',
    title: 'Blog & articles',
    lead: 'Posts about development, tutorials and use cases.',
    backToIndex: 'Back to index',
    search: 'Search articles...',
    noResults: 'No articles found',
    pagination: {
      page: 'Page',
      of: 'of',
      prev: 'Previous',
      next: 'Next',
    },
    post: {
      author: 'Author',
      date: 'Date',
      lastUpdated: 'Updated',
      readMore: 'Read more',
      tags: 'Tags',
    },
    toc: {
      show: 'Show index',
      hide: 'Hide index',
      title: 'Table of contents',
    },
    nav: {
      prev: 'Previous',
      next: 'Next',
    },
    constructionNotice: 'This page is under construction. Real content will be available soon.',
  },
  loader: {
    message: 'Loading…',
  },
  hero: {
    eyebrow: 'Hi, I am',
    title: 'David Deras',
    highlight: 'Full Stack Developer focused on Vue, Laravel and TypeScript',
    roleLabel: 'Current role',
    lead: 'More than two years shipping institutional systems and public platforms with Vue 3, Laravel and cloud deployments. I blend full stack architecture, research and UX to deliver accessible software that scales.',
    ctas: {
      primary: 'View projects',
      secondary: 'Direct contact',
    },
    stackTitle: 'Operating stack',
    techStack: [
      { name: 'Frontend', detail: 'Vue 3 + TS · Vite · Pinia' },
      { name: 'Backend', detail: 'Laravel 11 · PHP 8 · Node APIs' },
      { name: 'Infra', detail: 'Vercel · Railway · GCP · Azure' },
      { name: 'UX Ops', detail: 'Vuetify · PrimeVue · Vitest' },
      { name: 'UI', detail: 'Figma' },
    ],
    agendaTitle: 'Immediate agenda',
    agenda: [
      { title: 'FIA-UES incident management system', status: 'In development' },
      { title: 'MusyCharts v2', status: 'UI/UX and SEO redesign' },
      { title: 'Learn React', status: 'In progress' },
    ],
    snapshotTitle: 'Snapshot',
    focusNotes: [
      { label: 'Base', value: 'San Salvador, SV' },
      { label: 'Experience', value: '2+ years Full Stack' },
      { label: 'Sectors', value: 'GovTech · Retail · Analytics' },
    ],
    codeLabel: 'profile.js',
    roles: ['Full Stack Developer · DTIC - MINSAL', 'Vue 3 + Laravel Specialist'],
  },
  overview: {
    eyebrow: 'Content map',
    title: 'Spaces in constant iteration',
    lead: 'Projects, guides and resources that keep growing with every delivery. Everything is divided into clear paths so you can explore what you need.',
    cards: [
      {
        label: '01',
        title: 'Projects & case studies',
        body: 'Projects I have worked on, with technical details and product decisions.',
        tags: ['Vue 3', 'Laravel', 'Vuetify'],
        cta: 'Open dossier',
        to: '/projects',
      },
      {
        label: '02',
        title: 'Blog & tutorials',
        body: 'Short guides about deployments, cloud, automations and practical cases I use daily.',
        tags: ['Vue 3', 'Laravel', 'TypeScript', 'Vercel', 'Railway', 'GCP'],
        cta: 'Read entries',
        to: '/blog',
      },
      {
        label: '03',
        title: 'UES resources',
        body: 'Collective repository for the Systems School: curriculum, guides, exams and support material.',
        tags: ['Documents', 'Labs', 'Curriculum'],
        cta: 'Open drive',
        to: '/resources',
      },
    ],
    collaboration: {
      title: 'Build something new?',
      body: 'I look to collaborate with teams that value research, documentation and short cycles. Share your idea and we create a plan.',
      cta: 'Send message',
    },
  },
  about: {
    eyebrow: 'Professional profile',
    title: 'Full Stack centered on Vue y Laravel',
    lead: 'Developer with more than two years building systems for government, retail and collaborative platforms. I focus on accessibility, SEO and cloud deployments that keep pace with multidisciplinary teams.',
    quickFacts: [
      { label: 'Location', value: 'San Salvador, El Salvador' },
      { label: 'Phone', value: '+503 7464-1460' },
      { label: 'Email', value: 'davidderas50@gmail.com' },
      { label: 'Languages', value: 'Spanish (native) · English (A2)' },
      { label: 'Availability', value: 'Remote · Hybrid · On-site' },
    ],
    buttons: {
      downloadCv: 'Download resume',
      contact: 'Contact',
    },
    focus: {
      title: 'Approach',
      body: 'Accessibility, SEO and cloud deployments are the pillars that shape my development process. I prioritize clear documentation and iterative deliveries to ensure that products not only meet current needs but also adapt seamlessly to future challenges.',
    },
    skills: {
      title: 'Core skills',
      updated: 'Updated 2025',
      items: [
        { name: 'Vue 3 + TypeScript + Vite', level: 93 },
        { name: 'Laravel 10/11/12 · PHP 8 APIs', level: 90 },
        { name: 'REST integration', level: 84 },
        { name: 'UX / UI & accessibility', level: 82 },
      ],
    },
    experience: {
      title: 'Experience & deliverables',
      timeline: [
        {
          date: 'Jan 2024 - Present',
          title: 'Full Stack Developer · DTIC - MINSAL',
          description:
            'Development of public platforms and internal systems for the Ministry of Health: new features, integrations, monitoring and performance improvements in Vue 3 and Laravel.',
          tags: ['Vue 3', 'Laravel', 'GovTech'],
        },
        {
          date: 'Mar 2023 - Jun 2023',
          title: 'Full Stack Developer · Carmencita Store',
          description:
            'Built an ERP for inventory, HR and delivery on the coast. SCRUM planning, interfaces in Figma and deployments coordinated with the admin team.',
          tags: ['Laravel', 'Vue', 'ERP'],
        },
        {
          date: 'Jun 2023 - Dec 2023',
          title: 'Frontend Intern · Presidency / CASATIC',
          description:
            'Digital skills program focused on testing, deployment and agile methodologies for public innovation.',
          tags: ['Vue', 'Testing', 'Agile'],
        },
        {
          date: 'Sep 2022 - Dec 2022',
          title: 'Web Developer · CheRooms project',
          description:
            'Roommate platform built with Django + Vue, smart matching and real-time chat for students in San Salvador.',
          tags: ['Django', 'Vue', 'WebSockets'],
        },
        {
          date: '2019 - Current',
          title: 'Computer Systems Engineering · UES',
          description:
            'Final year of the degree, strengthening algorithms, databases and student leadership in tech communities.',
          tags: ['Academia', 'Leadership'],
        },
      ],
    },
    interests: {
      title: 'Current interests',
      items: ['JS/TS playbooks', 'Accessibility & SEO', 'Cloud deployments', 'UX Ops'],
    },
  },
  projects: {
    eyebrow: 'Selected work',
    title: 'Projects & case studies',
    lead: 'Dossiers built with clear processes and iterative deliverables. Each case details technical challenges and product decisions.',
    labels: {
      summary: 'Summary',
      deliverables: 'Key deliverables',
      client: 'Client',
      technologies: 'Technologies',
      captures: 'Screens',
      viewOnline: 'View in production',
      viewRepo: 'Review code',
    },
  },
  ues: {
    eyebrow: 'UES resources',
    title: 'Collaborative repository',
    lead: 'Academic material for Computer Systems Engineering. Everything organized by modality so you can find guides, labs and formats quickly.',
    categories: [
      {
        title: 'On-campus modality',
        mode: 'Campus',
        description:
          "Tests, labs and summaries from in-person courses (see subjects without '- D' at the end).",
        driveLink:
          'https://drive.google.com/drive/folders/1w7WfrEShtjBharxYq_qDqs4lXH1Ao00h?usp=drive_link',
        featured: [
          {
            name: 'Data Structure (ESD115) · Material',
            link: 'https://drive.google.com/drive/folders/1_Wk8OUpedalm-nH1Hgzh4sVXz4bxP6hz?usp=drive_link',
          },
          {
            name: 'Productivity Tools (HDP115) · Classes',
            link: 'https://drive.google.com/drive/folders/1KAQVYhFv5-3MWxEref72lUzQc-sOhFZn?usp=drive_link',
          },
          {
            name: 'Systems Design I (DSI115) · Material',
            link: 'https://drive.google.com/drive/folders/1IG_0YzshQNSIfTUo3Zu_yH0GyrXOgwPw?usp=drive_link',
          },
        ],
      },
      {
        title: 'Distance modality',
        mode: 'Virtual',
        description: "Recorded tutorials, guides and self-paced material (subjects with '- D').",
        driveLink:
          'https://drive.google.com/drive/folders/1w7WfrEShtjBharxYq_qDqs4lXH1Ao00h?usp=drive_link',
        featured: [
          {
            name: 'Operating Systems (SIO115 -D)',
            link: 'https://drive.google.com/drive/folders/1AqxsN-dWjaTkj7tI9WuEt6kgwglLip4I?usp=drive_link',
          },
          {
            name: 'Electronic Commerce (CET115 -D)',
            link: 'https://drive.google.com/drive/folders/1DTjafl8XO2Ri__3DrA6BxQHV-WFtCvj1?usp=drive_link',
          },
          {
            name: 'Communications I (COS115 -D)',
            link: 'https://drive.google.com/drive/folders/1XAwcZE0ViAKgri47RQPtRicYSWbua1L3?usp=drive_link',
          },
        ],
      },
      {
        title: 'Extras & utilities',
        mode: 'General',
        description: 'Additional resources: books, formats and guides for various subjects.',
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
      openFolder: 'Open folder',
      share: 'Share resource',
    },
    noteBlock: {
      title: 'Notes',
      body: 'This repository is community driven and evolves with student contributions. If you see broken links or want to add material, reach out.',
    },
  },
  footer: {
    description:
      'Full Stack Developer in San Salvador. I build systems with Vue 3, TypeScript and Laravel, documenting each delivery for smooth product scalability.',
    quickMap: 'Quick map',
    links: {
      home: 'Home',
      projects: 'Projects',
      ues: 'UES resources',
      tools: 'Tools',
    },
    downloadCv: 'Download resume',
    contact: 'Contact',
    builtWith: 'Built with ❤️ Vue · Vuetify',
  },
  tools: {
    pixedai: {
      eyebrow: 'Visual lab',
      title: 'Pixedai Studio',
      lead: 'Turn any image into consistent pixel art by adjusting blocks, scale and palettes in a panel built for fast iteration.',
      status: {
        label: 'Beta · experimental mode',
        body: 'Engine powered by Pixelit with accessibility fixes and presets ready for docs, mockups or social media.',
        chips: ['Local processing', 'Dynamic canvas', 'PNG export'],
      },
      panels: {
        inputs: {
          title: 'Input & presets',
          body: 'Select the source image, define block size and use shortcuts for common resolutions.',
          reset: 'Reset',
          uploadLabel: 'Upload an image',
          blockLabel: 'Block',
          presets: 'Quick presets',
          greyscale: 'Greyscale',
          maxHeight: 'Max height (px)',
          maxWidth: 'Max width (px)',
        },
        palette: {
          title: 'Color palette',
          body: 'Enable a library or keep the original tones.',
          switch: 'Apply palette',
          select: 'Library',
        },
        preview: {
          title: 'Preview',
          body: 'Live rendering on canvas with lossless export.',
          actions: {
            process: 'Process again',
            download: 'Download PNG',
          },
          tips: [
            'Square images produce more uniform results.',
            'Use low blocks (≤8) for icons or stickers.',
            'Activate the curated palette to keep visual consistency across projects.',
          ],
        },
      },
      resolution: 'Block {block} · {width} x {height}',
      presets: {
        sticker: 'Sticker',
        icon: 'Icon',
        poster: 'Poster',
        banner: 'Banner',
      },
      imageAlt: 'Base reference',
    },
  },
};
