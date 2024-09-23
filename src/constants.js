export const apiUrl = 'https://ticketup.skynet.kg/api/';

export const SMTH_WENT_WRONG = 'Что-то пошло не так, попробуйте позже';

export const RU_PATHNAMES = {
  '/new-application': 'Новая заявка',
  '/my-applications': 'Мои заявки',
  '/sign-in': 'Логин',
  '/new-neactivka': 'Новый неактивный абонент',
  '/new-zhaloba': 'Новая жалоба',
  '/zhaloba-list': 'Жалобы',
  '/neactivka-list': 'Неактивные абоненты',
};

export const availableTariffs = [
  'Оптимальный (600)',
  'Sky70 (890)',
  'Промо (790)',
  'Промо60 (890)',
  'Промо70 (980)',
  'Промо80 (1190)',
  'Промо90 (1190)',
  'Промо100 (1280)',
  'Промо600 (1280)',
  'Интер 70 (890)',
  'Интер 90 (1190)',
  'Интер 100 (1280)',
  'Интер 70 (980)',
  'Интер+ ТВ 70',
  'Интер+ ТВ 90',
  'Интер+ ТВ 100',
  'inter (200)',
  'Закрытый (780)',
];

export const formatDate = (date, showTime) => {
  const newDate = new Date(date);
  const pad = (num, size) => num.toString().padStart(size, '0');

  const year = newDate.getFullYear();
  const month = pad(newDate.getMonth() + 1, 2);
  const day = pad(newDate.getDate(), 2);
  const hours = pad(newDate.getHours(), 2);
  const minutes = pad(newDate.getMinutes(), 2);

  return `${day}.${month}.${year}${showTime ? ` ${hours}:${minutes}` : ''}`;
};
