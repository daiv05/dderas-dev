import {
  mdiHome,
  mdiAccount,
  mdiFolder,
  mdiSchool,
  mdiBookOpenPageVariant,
  mdiWrench,
} from '@mdi/js';

const sidebarItems = [
  {
    titleKey: 'navigation.items.home',
    value: 'home',
    icon: mdiHome,
    to: '/',
  },
  {
    titleKey: 'navigation.items.about',
    value: 'about',
    icon: mdiAccount,
    to: '/about',
  },
  {
    titleKey: 'navigation.items.projects',
    value: 'projects',
    icon: mdiFolder,
    to: '/projects',
  },
  {
    titleKey: 'navigation.items.ues',
    value: 'ues',
    icon: mdiSchool,
    to: '/resources',
  },
  {
    titleKey: 'navigation.items.tutorials',
    value: 'tutorials',
    icon: mdiBookOpenPageVariant,
    to: '/tutorials',
  },
  {
    titleKey: 'navigation.items.tools',
    value: 'tools',
    icon: mdiWrench,
    to: '/tools',
  },
];

export default sidebarItems;
