// ── Page Navigation ──
  function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => {
      p.classList.remove('active');
      // Reset animations
      p.querySelectorAll('[style*="animation"],.gallery-card,.team-card').forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; // trigger reflow
        el.style.animation = '';
      });
    });
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));

    const page = document.getElementById('page-' + pageId);
    page.classList.add('active');

    const names = ['home', 'gallery', 'about', 'calendar'];
    const idx = names.indexOf(pageId);
    if (idx >= 0) document.querySelectorAll('.nav-links button')[idx].classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pageId === 'calendar') renderCalendar();
  }

  // ── Gallery Filters ──
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ── Calendar ──
  let currentDate = new Date(2026, 3, 1); // April 2026

  const events = [
    { day: 5, month: 3, year: 2026, title: 'Mural Kickoff', color: 'cyan' },
    { day: 12, month: 3, year: 2026, title: 'Screen Printing', color: 'magenta' },
    { day: 19, month: 3, year: 2026, title: 'Pop-Up Gallery', color: 'yellow' },
    { day: 26, month: 3, year: 2026, title: 'Monthly Meeting', color: 'key' },
    { day: 3, month: 4, year: 2026, title: 'Mural Jam', color: 'cyan' },
    { day: 10, month: 4, year: 2026, title: 'Youth Workshop', color: 'magenta' },
    { day: 17, month: 4, year: 2026, title: 'Gallery Night', color: 'yellow' },
    { day: 24, month: 4, year: 2026, title: 'Planning Session', color: 'key' },
  ];

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  function changeMonth(dir) {
    currentDate.setMonth(currentDate.getMonth() + dir);
    renderCalendar();
  }

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    document.getElementById('monthDisplay').textContent = monthNames[month] + ' ' + year;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();

    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';

    const today = new Date();

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = daysInPrev - i;
      const cell = document.createElement('div');
      cell.className = 'cal-day other-month';
      cell.innerHTML = `<div class="day-num">${d}</div>`;
      grid.appendChild(cell);
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const cell = document.createElement('div');
      const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      cell.className = 'cal-day' + (isToday ? ' today' : '');
      cell.innerHTML = `<div class="day-num">${d}</div>`;

      // Check for events
      events.forEach(ev => {
        if (ev.day === d && ev.month === month && ev.year === year) {
          const eventEl = document.createElement('div');
          eventEl.className = 'cal-event ' + ev.color;
          eventEl.textContent = ev.title;
          cell.appendChild(eventEl);
        }
      });

      grid.appendChild(cell);
    }

    // Next month days
    const totalCells = grid.children.length;
    const remaining = 42 - totalCells;
    for (let d = 1; d <= remaining; d++) {
      const cell = document.createElement('div');
      cell.className = 'cal-day other-month';
      cell.innerHTML = `<div class="day-num">${d}</div>`;
      grid.appendChild(cell);
    }
  }

  renderCalendar();