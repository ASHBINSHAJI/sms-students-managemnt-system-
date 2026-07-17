/* =========================================
   SMS – Student Management System
   Pure Vanilla JS (no frameworks)
   ========================================= */

// ── DOM READY ──────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setCurrentDate();
  initCounters();
  initProgressBars();
  initSidebar();
  startActivityTicker();
  initWelcomeAnimation();
  initNotifPulse();
});

// ── DATE ────────────────────────────────────
function setCurrentDate() {
  const el = document.getElementById('currentDate');
  if (!el) return;
  const now = new Date();
  const opts = { year: 'numeric', month: 'long', day: 'numeric' };
  el.textContent = now.toLocaleDateString('en-IN', opts);
}

// ── ANIMATED COUNTER ────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(el => {
    animateCounter(el);
  });
}

function animateCounter(el) {
  const target   = parseInt(el.dataset.target) || 0;
  const prefix   = el.dataset.prefix || '';
  const suffix   = el.dataset.suffix || '';
  const format   = el.dataset.format;
  const duration = 1800;
  const start    = performance.now();

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const current  = Math.round(easeOut(progress) * target);
    let display;
    if (format === 'currency') {
      display = prefix + formatCurrency(current);
    } else {
      display = prefix + current.toLocaleString('en-IN') + suffix;
    }
    el.textContent = display;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function formatCurrency(n) {
  if (n >= 100000) return (n / 100000).toFixed(1).replace(/\.0$/, '') + 'L';
  if (n >= 1000)   return (n / 1000).toFixed(0) + 'K';
  return n.toLocaleString('en-IN');
}

// ── PROGRESS BARS ───────────────────────────
function initProgressBars() {
  // Already animated via CSS @keyframes progressExpand
  // But we re-trigger on page switch
}

function animateProgressBars(container) {
  const bars = (container || document).querySelectorAll('.progress-fill, .grade-bar-fill');
  bars.forEach(bar => {
    const w = bar.style.width;
    bar.style.width = '0';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
        bar.style.width = w || bar.dataset.width || '0';
      });
    });
  });
}

// ── PAGE SWITCHING ──────────────────────────
function switchPage(pageId, navEl) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    // Re-run counters if dashboard
    if (pageId === 'dashboard') {
      target.querySelectorAll('.counter').forEach(animateCounter);
    }
    // Re-animate progress bars
    animateProgressBars(target);
  }

  // Update nav items
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  if (navEl) navEl.classList.add('active');

  // Close sidebar on mobile
  if (window.innerWidth <= 768) closeSidebar();
}

// ── SIDEBAR ─────────────────────────────────
function initSidebar() {
  // nothing extra needed, handled by toggle
}

function toggleSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebarOverlay');
  const hamburger= document.getElementById('hamburger');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
  hamburger.classList.toggle('open');
}

function closeSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebarOverlay');
  const hamburger= document.getElementById('hamburger');
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
  hamburger.classList.remove('open');
}

document.getElementById('sidebarClose')?.addEventListener('click', closeSidebar);

// ── MODAL ────────────────────────────────────
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

function closeModalOutside(e, id) {
  if (e.target.id === id) closeModal(id);
}

// ── CHIP TOGGLE ──────────────────────────────
function setChip(el) {
  el.closest('.chip-group').querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

// ── CHAT ─────────────────────────────────────
function sendMessage() {
  const input = document.getElementById('chatInput');
  const body  = document.querySelector('.chat-body');
  if (!input || !body || !input.value.trim()) return;

  const msg = document.createElement('div');
  msg.className = 'chat-msg sent';
  msg.innerHTML = `<p>${escapeHtml(input.value.trim())}</p><span>Just now</span>`;
  body.appendChild(msg);
  input.value = '';
  body.scrollTop = body.scrollHeight;

  // Simulate reply after 1.5s
  setTimeout(() => {
    const reply = document.createElement('div');
    reply.className = 'chat-msg received';
    reply.innerHTML = `<p>Thanks! I'll get back to you shortly.</p><span>Just now</span>`;
    body.appendChild(reply);
    body.scrollTop = body.scrollHeight;
  }, 1500);
}

document.getElementById('chatInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage();
});

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// ── LIVE ACTIVITY TICKER ──────────────────────
function startActivityTicker() {
  const activities = [
    { icon: '📚', text: '<strong>Rahul Verma</strong> submitted Maths assignment', color: '#ede9fe', t: '1s ago' },
    { icon: '🎓', text: '<strong>Class 12A</strong> attendance marked', color: '#d1fae5', t: '3s ago' },
    { icon: '💳', text: 'Fee paid by <strong>Priya Sharma</strong>', color: '#fef3c7', t: '5s ago' },
    { icon: '📝', text: 'New exam added: <strong>Physics – Class 11A</strong>', color: '#fee2e2', t: '8s ago' },
    { icon: '📖', text: 'Library book returned by <strong>Arjun</strong>', color: '#dbeafe', t: '10s ago' },
  ];
  let idx = 0;
  setInterval(() => {
    const list = document.querySelector('#page-dashboard .activity-list');
    if (!list || !document.getElementById('page-dashboard').classList.contains('active')) return;

    const a = activities[idx % activities.length];
    const li = document.createElement('li');
    li.className = 'activity-item';
    li.style.setProperty('--delay', '0s');
    li.style.opacity = '0';
    li.style.transform = 'translateX(20px)';
    li.innerHTML = `
      <div class="activity-icon" style="background:${a.color};font-size:1rem;width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center">${a.icon}</div>
      <div class="activity-text"><p>${a.text}</p><span>${a.t}</span></div>
    `;
    list.insertBefore(li, list.firstChild);

    // Remove extra items
    while (list.children.length > 6) list.removeChild(list.lastChild);

    // Animate in
    requestAnimationFrame(() => {
      li.style.transition = 'all 0.4s cubic-bezier(0.4,0,0.2,1)';
      li.style.opacity = '1';
      li.style.transform = 'translateX(0)';
    });

    idx++;
  }, 7000);
}

// ── WELCOME ANIMATION (title wave) ───────────
function initWelcomeAnimation() {
  const title = document.querySelector('#page-dashboard .page-title');
  if (!title) return;
  const text = title.textContent;
  title.innerHTML = '';
  text.split('').forEach((ch, i) => {
    const span = document.createElement('span');
    span.textContent = ch === ' ' ? '\u00a0' : ch;
    span.style.cssText = `
      display: inline-block;
      animation: textWave 2s ease-in-out infinite;
      animation-delay: ${i * 0.06}s;
    `;
    title.appendChild(span);
  });
}

// ── NOTIFICATION PULSE ────────────────────────
function initNotifPulse() {
  const btn = document.getElementById('notifBtn');
  if (!btn) return;
  let on = true;
  setInterval(() => {
    btn.style.transform = on ? 'scale(1.08) rotate(12deg)' : 'scale(1) rotate(0)';
    btn.style.transition = 'transform 0.3s ease';
    on = !on;
  }, 4000);
}

// ── GLOBAL SEARCH ─────────────────────────────
document.getElementById('globalSearch')?.addEventListener('input', e => {
  const q = e.target.value.toLowerCase().trim();
  if (!q) return;
  // Simple: search nav items and switch
  document.querySelectorAll('.nav-item').forEach(item => {
    const page = item.dataset.page;
    if (page && item.textContent.toLowerCase().includes(q)) {
      // Highlight match subtly
      item.style.background = 'rgba(99,102,241,0.18)';
      setTimeout(() => item.style.background = '', 1500);
    }
  });
});

// ── RIPPLE EFFECT ON BUTTONS ──────────────────
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-primary, .btn-outline, .nav-item');
  if (!btn) return;
  const ripple = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px; height: ${size}px;
    left: ${e.clientX - rect.left - size / 2}px;
    top:  ${e.clientY - rect.top  - size / 2}px;
    background: rgba(255,255,255,0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.5s ease forwards;
    pointer-events: none;
  `;
  const pos = getComputedStyle(btn).position;
  if (pos === 'static') btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

// ── STAT CARD TILT (mouse follow) ─────────────
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left - r.width  / 2;
    const y = e.clientY - r.top  - r.height / 2;
    // Only apply tilt when not flipped (hover)
    // flip handles the Y rotation, so we skip when flipping
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── TABLE ROW ANIMATION ───────────────────────
document.querySelectorAll('.table-row').forEach((row, i) => {
  row.style.animation = `fadeIn 0.3s ease ${i * 0.06}s both`;
});

// ── ATTENDANCE CARD TOGGLE ────────────────────
document.querySelectorAll('.att-card').forEach(card => {
  card.addEventListener('click', () => {
    const statuses = ['present', 'absent', 'late'];
    const cur = statuses.find(s => card.classList.contains(s));
    const next = statuses[(statuses.indexOf(cur) + 1) % statuses.length];
    statuses.forEach(s => card.classList.remove(s));
    card.classList.add(next);
    card.querySelector('.att-status').textContent = next.charAt(0).toUpperCase() + next.slice(1);

    // Add a quick scale bounce
    card.style.transform = 'scale(1.08)';
    setTimeout(() => card.style.transform = '', 200);
  });
});

// ── KEYBOARD SHORTCUT ─────────────────────────
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('globalSearch')?.focus();
  }
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
    closeSidebar();
  }
});

// ── TOOLTIP ON CHART DOTS ─────────────────────
(function() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const vals = [82, 88, 95, 91, 87, 75, 83];
  document.querySelectorAll('.chart-dot').forEach((dot, i) => {
    dot.setAttribute('title', `${days[i]}: ${vals[i]}%`);
  });
})();

// ── INIT: RE-RUN ON FIRST PAINT ───────────────
// Trigger progress bar animation on the initial active page
setTimeout(() => animateProgressBars(document.querySelector('.page.active')), 200);

console.log('%cSMS Platform loaded 🎓', 'color:#6366f1;font-size:16px;font-weight:bold');
