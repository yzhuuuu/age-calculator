const form = document.querySelector('form');
const article = document.querySelector('article');
// console.log(img);
article.addEventListener('click', () => {
  //   console.log(`hello world`);
  const formData = new FormData(form);
  let day = '',
    year = '',
    month = '';

  for (const [key, value] of formData) {
    // console.log(key, value);
    if (key.toLowerCase() === 'day') {
      day = value ? Number(value) : '';
    } else if (key.toLowerCase() === 'year') {
      year = value ? Number(value) : '';
    } else if (key.toLowerCase() === 'month') {
      month = value ? Number(value) : '';
    }
  }
  //   console.log(year, day, month);
  // check if values is empty or not
  if (year === '' || day === '' || month === '') {
    document.querySelectorAll('input').forEach((input) => {
      input.style.borderColor = `var(--light-red)`;
      divErrorMessage('This field is required', input.id);
    });

    document.querySelectorAll('label').forEach((label) => {
      label.style.color = `var(--light-red)`;
    });
    setTimeout(() => {
      document
        .querySelectorAll('input')
        .forEach((input) => (input.style.borderColor = ``));

      document
        .querySelectorAll('label')
        .forEach((label) => (label.style.color = ``));
    }, 2000);
    return;
  }
  //   console.log(month);

  // algo to get the correct age
  const date = new Date();
  if (year < 1970 || year > date.getFullYear()) {
    divErrorMessage(`must be a valid year`, 'year');
    const doc = document.getElementById(`year`);
    doc.previousElementSibling.style.color = `var(--light-red)`;
    doc.style.borderColor = `var(--light-red)`;
    setTimeout(() => {
      doc.previousElementSibling.style.color = ``;
      doc.style.borderColor = ``;
    }, 2000);
    return;
  }
  if (month < 0 || month > 12) {
    divErrorMessage('must be a valid month', 'month');
    const doc = document.getElementById(`month`);
    doc.previousElementSibling.style.color = `var(--light-red)`;
    doc.style.borderColor = `var(--light-red)`;
    setTimeout(() => {
      doc.previousElementSibling.style.color = ``;
      doc.style.borderColor = ``;
    }, 2000);
    return;
  }
  const dayInMonth = getDays(year, month);
  if (day < 0 || day > dayInMonth) {
    divErrorMessage('must be a valid date', 'day');
    const doc = document.getElementById(`day`);
    doc.previousElementSibling.style.color = `var(--light-red)`;
    doc.style.borderColor = `var(--light-red)`;
    setTimeout(() => {
      doc.previousElementSibling.style.color = ``;
      doc.style.borderColor = ``;
    }, 2000);
    return;
  }
  let userDate = new Date(year, month, day);
  // calculation
  let newDate = date.getDate() - userDate.getDate(),
    newMonth = date.getMonth() - userDate.getMonth() + 1,
    newYears = date.getFullYear() - userDate.getFullYear();

  if (newDate < 0) {
    newMonth -= 1;
    newDate += getDays(date.getFullYear(), date.getMonth()) === 31 ? 31 : 30;
  }
  if (newMonth <= -1) {
    newYears -= 1;
    newMonth += 12;
  }

  document.querySelector('.age-info').innerHTML = `
    <h3><span>${newYears}</span> years</h3>
          <h3><span>${newMonth}</span> months</h3>
          <h3><span>${newDate}</span> days</h3>`;
});
function divErrorMessage(message, id) {
  const p = document.createElement('p');
  p.classList.add('error');
  p.innerText = `${message}`;
  const parent = document.querySelector(`#${id}`).parentElement;

  parent.appendChild(p);
  setTimeout(() => {
    p.remove();
  }, 2000);
}
function getDays(year, month) {
  return new Date(year, month, 0).getDate();
}
