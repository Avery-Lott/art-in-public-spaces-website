// ── Calendar Functionality ──

let currentDate = new Date(2026, 3, 1); // April 2026
let calendarEvents = [];

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function initCalendar(events) {
  calendarEvents = events;
  renderCalendar();
}

function changeMonth(dir) {
  currentDate.setMonth(currentDate.getMonth() + dir);
  renderCalendar();
}

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  document.getElementById('monthDisplay').textContent =
    monthNames[month] + ' ' + year;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const grid = document.getElementById('calendarGrid');
  grid.innerHTML = '';

  const today = new Date();

  // Previous month padding
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrev - i;
    const cell = document.createElement('div');
    cell.className = 'cal-day other-month';
    cell.innerHTML = '<div class="day-num">' + d + '</div>';
    grid.appendChild(cell);
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement('div');
    const isToday =
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    cell.className = 'cal-day' + (isToday ? ' today' : '');
    cell.innerHTML = '<div class="day-num">' + d + '</div>';

    // Attach events
    calendarEvents.forEach(function (ev) {
      if (ev.day === d && ev.month === month && ev.year === year) {
        const tag = document.createElement('div');
        tag.className = 'cal-event ' + ev.color;
        tag.textContent = ev.title;
        cell.appendChild(tag);
      }
    });

    grid.appendChild(cell);
  }

  // Next month padding
  const totalCells = grid.children.length;
  const remaining = 42 - totalCells;
  for (let d = 1; d <= remaining; d++) {
    const cell = document.createElement('div');
    cell.className = 'cal-day other-month';
    cell.innerHTML = '<div class="day-num">' + d + '</div>';
    grid.appendChild(cell);
  }
}
