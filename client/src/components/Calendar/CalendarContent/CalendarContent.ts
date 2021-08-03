import { YearMonth, Account } from '../Calendar';

export const CalendarContent = ({
  date,
  account,
}: {
  date: YearMonth;
  account: Account[];
}) => {
  const $target = document.createElement('div');
  $target.innerHTML = initialMarkup();

  fillDates($target, date);

  const dateAccounts = parseAccount(account);

  return $target.innerHTML;
};

const initialMarkup = () => /*html*/ `
  <div class="calendar__content">
    ${week()}
    ${week()}
    ${week()}
    ${week()}
    ${week()}
  </div>
`;

const week = () => /*html*/ `
  <div class="week">
    <div class="week__day"></div>
    <div class="week__day"></div>
    <div class="week__day"></div>
    <div class="week__day"></div>
    <div class="week__day"></div>
    <div class="week__day"></div>
    <div class="week__day"></div>
  </div>
`;

const weekDayDate = (date: number) => /*html*/ `
  <div class="week__day__date" data-date=${date}>${date}</div>
`;

const fillDates = ($target: HTMLElement, { year, month }: YearMonth) => {
  const firstDayIndex = new Date(year, month - 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();

  const $dates = $target.querySelectorAll('.week__day');

  for (let index = firstDayIndex, date = 1; date <= lastDate; index++, date++) {
    if ($dates[index])
      $dates[index].insertAdjacentHTML('afterbegin', weekDayDate(date));
    else {
      // add another week
      $target
        .querySelector('.calendar__content')
        .insertAdjacentHTML('beforeend', week());

      const $lastWeekDates = $target.querySelectorAll(
        '.week:last-child > .week__day',
      );

      for (let newIndex = 0; date <= lastDate; newIndex++, date++) {
        $lastWeekDates[newIndex].insertAdjacentHTML(
          'afterbegin',
          weekDayDate(date),
        );
      }

      break;
    }
  }
};

const parseAccount = (account: Account[]) => {
  const dataByDate = {};
  if (!Array.isArray(account)) return dataByDate;

  account.forEach(({ timestamp, amount, is_income }) => {
    const isIncome = Boolean(is_income);
    const amountNum = isIncome ? parseInt(amount) : -parseInt(amount);
    const date = parseInt(timestamp.split('-')[2]);

    dataByDate[date] = dataByDate[date]?.concat(amountNum) || [amountNum];
  });

  return dataByDate;
};
