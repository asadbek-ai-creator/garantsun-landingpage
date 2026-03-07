type MenuLink = {
  title: string;
  link: string;
};

export type MegaMenuDataType = {
  image: string;
  title: string;
  links: MenuLink[];
};

export type SubMenuDataType = {
  title: string;
  link: string;
  submenu?: MenuLink[];
};

export type MenuItemDataType = {
  title: string;
  link: string;
  megamenu?: MegaMenuDataType[];
  submenu?: SubMenuDataType[];
};


export const menuData: MenuItemDataType[] = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'About',
    link: '/about',
  },
  {
    title: 'Services',
    link: '/service',
    submenu: [
      { title: 'Services', link: '/service' },
      { title: 'Service Carousel', link: '/service-carousel' },
      { title: 'Service Details', link: '/service-details' },
    ],
  },
  {
    title: 'Pages',
    link: '#',
    submenu: [
      {
        title: 'Projects',
        link: '/project',
        submenu: [
          { title: 'Project', link: '/project' },
          { title: 'Project Carousel', link: '/project-carousel' },
          { title: 'Project Details', link: '/project-details' },
        ],
      },
      {
        title: 'Team',
        link: '/team',
        submenu: [
          { title: 'Our Team', link: '/team' },
          { title: 'Team Carousel', link: '/team-carousel' },
          { title: 'Team Details', link: '/team-details' },
        ],
      }
    ],
  },
  {
    title: 'Blog',
    link: '/news',
    submenu: [
      { title: 'Blog Grid', link: '/news' },
      { title: 'Blog Standard', link: '/news-standard' },
      { title: 'Blog Details', link: '/news-details' },
    ],
  },
  {
    title: 'Contact',
    link: '/contact',
  },
];
