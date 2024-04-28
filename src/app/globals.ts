import { template } from './objects/template';

const year = new Date().getFullYear();

export const YEARS = Array.from({ length: 90 }, (v, k) => year - k);

export const MONTHS = [
  'Janurary',
  'Febrary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const TEMPLATES: template[] = [
  {
    id: 1,
    path: 'assets/template/template-1.jpg',
  },
  {
    id: 2,
    path: 'assets/template/template-2.jpg',
  },
  {
    id: 3,
    path: 'assets/template/template-3.jpg',
  },
  {
    id: 4,
    path: 'assets/template/template-1.jpg',
  },
  {
    id: 5,
    path: 'assets/template/template-2.jpg',
  },
  {
    id: 6,
    path: 'assets/template/template-3.jpg',
  },
  {
    id: 7,
    path: 'assets/template/template-1.jpg',
  },
  {
    id: 8,
    path: 'assets/template/template-2.jpg',
  },
  {
    id: 9,
    path: 'assets/template/template-3.jpg',
  },
];
