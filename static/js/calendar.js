// ── Calendar Functionality ──

let currentDate = new Date(); // April 2026
let calendarEvents = [];
let monthlyEvents = [];

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

function getNthWeekday(year, month, weekday, n) {
  const firstDay = new Date(year, month, 1);
  const firstWeekday = firstDay.getDay();

  const offset = (weekday - firstWeekday + 7) % 7;
  const firstOccurrence = 1 + offset;

  return firstOccurrence + (n - 1) * 7;
}

function getRecurringEvents(year, month, weekday, title, desc, time, color) {
  const events = [];

  const firstWeekday = getNthWeekday(year, month, weekday, 1);
  const thirdWeekday = getNthWeekday(year, month, weekday, 3);

  events.push({
    reoccurring: false,
    day: firstWeekday,
    weekday: weekday,
    month:monthNames[month],
    js_month:month,
    year: year,
    title: title,
    desc: desc,
    time: time,
    color: color
  });

  events.push({
    reoccurring: false,
    day: thirdWeekday,
    weekday: weekday,
    month:monthNames[month],
    js_month:month,
    year: year,
    title: title,
    desc: desc,
    time: time,
    color: color
  });

  return events;
}

function buildMonthlyEvents(year, month, events) {
  let all_events = [];

  events.forEach(ev => {
    if (ev.reoccurring) {
      all_events = all_events.concat(
        getRecurringEvents(year, month, ev.weekday, ev.title, ev.desc, ev.time, ev.color)
      );
    } else {
      all_events.push(ev);
    }
  });

  return all_events;
}

function renderUpcomingEvents(events) {
  const container = document.getElementById("eventList");
  container.innerHTML = "";

  events.forEach(event => {
    const row = document.createElement("div");
    row.className = "event-row " + event.color;

    row.innerHTML = `
      <div class="event-date-badge">
        <div class="month-label">${event.month}</div>
        <div class="day-label">${event.day}</div>
      </div>

      <div class="event-details">
        <h3>${event.title}</h3>
        <p>${event.desc}</p>
      </div>

      <div class="event-time">${event.time}</div>
    `;

    container.appendChild(row);
  });
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

  monthlyEvents = buildMonthlyEvents(year, month, calendarEvents);
  renderUpcomingEvents(monthlyEvents)

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
    monthlyEvents.forEach(function (ev) {
      if (ev.day === d && ev.js_month === month && ev.year === year) {
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
