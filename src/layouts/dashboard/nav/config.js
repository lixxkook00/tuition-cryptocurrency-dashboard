import SvgColor from '../../../components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

export const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user mananger',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'wallet',
    path: '/dashboard/admin-wallet',
    icon: icon('ic_wallet'),
  },
  {
    title: 'All Transaction',
    path: '/dashboard/admin-history',
    icon: icon('ic_tuition'),
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export const navConfigStudent = [
  {
    title: 'tuition',
    path: '/dashboard/tuition',
    icon: icon('ic_tuition'),
  },
  {
    title: 'your transactions',
    path: '/dashboard/student-history',
    icon: icon('ic_tuition'),
  },
  {
    title: 'Instructions',
    path: '/dashboard/instruction',
    icon: icon('ic_tuition'),
  },
]

// export { navConfig, navConfigStudent};
