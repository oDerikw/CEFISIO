import type { ReactNode } from 'react';

import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  badgeTooltip?: string;

  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: 'Geral',
    items: [
      {
        name: 'Início',
        link: '/dashboards/main',
        icon: HomeIcon
      },
      {
        name: 'Usuários',
        link: '/management/users',
        icon: AssignmentIndIcon
      },
      {
        name: 'Calendário',
        link: '',
        icon: CalendarViewMonthIcon
      },
      {
        name: 'Em Breve',
        link: '',
        icon: LockIcon
      }
    ]
  },
  
];

export default menuItems;
