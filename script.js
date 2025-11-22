// تسجيل الـ Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Gym/sw.js')
      .then(reg => console.log('✅ Service Worker Registered', reg))
      .catch(err => console.error('❌ Service Worker Error', err));
  });
}

// التعامل مع زر التثبيت
let deferredPrompt;
const installBtn = document.getElementById("installBtn");
const installMsg = document.getElementById("installMsg");

installBtn.style.display = "block";

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log("📲 beforeinstallprompt جاهز");
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) {
    installMsg.textContent = "⚠️ التثبيت غير متاح حاليًا. افتح الموقع من متصفح يدعم التثبيت مثل Chrome أو Edge.";
    installMsg.style.display = "block";
    return;
  }

  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;

  if (choice.outcome === "accepted") {
    console.log("✅ User accepted the install prompt");
    installMsg.style.display = "none";
  } else {
    console.log("❌ User dismissed the install prompt");
    installMsg.textContent = "تم إلغاء التثبيت.";
    installMsg.style.display = "block";
  }

  deferredPrompt = null;
  installBtn.style.display = "none";
});

window.addEventListener("appinstalled", () => {
  console.log("🎉 التطبيق اتثبت");
  installBtn.style.display = "none";
});




// ====== Exercise Data ======
const exercises = [
  // Chest
  { id: 'bench_press', name: 'Bench Press', group: 'chest', level: 'intermediate', equipment: 'بار + دامبلز', video: './assets/bench.mp4',
    steps: ['استلقِ على المقعد وثبّت قدميك.', 'قبضة متوسطة وابدأ بخفض البار ببطء.', 'ادفع البار لأعلى مع شد لوح الكتف.'] },
  { id: 'incline_db', name: 'Incline Dumbbell Press', group: 'chest', level: 'intermediate', equipment: 'دامبلز', video: './assets/incline.mp4',
    steps: ['اضبط المقعد على زاوية 30°.', 'ارفع الدمبلز لأعلى مع تحكم.', 'اخفض ببطء وكرر.'] },
  { id: 'push_up', name: 'Push-Up', group: 'chest', level: 'beginner', equipment: 'وزن الجسم', video: './assets/pushup.mp4',
    steps: ['اتخذ وضع البلانك.', 'اخفض الجسم حتى يقترب صدرك من الأرض.', 'ادفع للأعلى وحافظ على خط جسم مستقيم.'] },

  // Back
  { id: 'deadlift', name: 'Deadlift', group: 'back', level: 'advanced', equipment: 'بار', video: './assets/deadlift.mp4',
    steps: ['قف وقدماك تحت البار.', 'شد الظهر وادفع الأرض بالرجلين.', 'اخفض البار بتحكم مع ظهر محايد.'] },
  { id: 'lat_pulldown', name: 'Lat Pulldown', group: 'back', level: 'beginner', equipment: 'آلة', video: './assets/latpulldown.mp4',
    steps: ['قبضة أعرض من الكتفين.', 'اسحب المقبض نحو الصدر.', 'ارفع للأعلى ببطء حتى تمد الظهر.'] },

  // Legs
  { id: 'squat', name: 'Back Squat', group: 'legs', level: 'intermediate', equipment: 'بار', video: './assets/squat.mp4',
    steps: ['قف بمسافة كتفين.', 'انزل للأُسفل مع ثبات الظهر.', 'ادفع للأعلى مع ضغط الكعبين.'] },
  { id: 'lunges', name: 'Walking Lunges', group: 'legs', level: 'intermediate', equipment: 'وزن الجسم/دامبلز', video: './assets/lunges.mp4',
    steps: ['خطوة للأمام مع نزول الركبة للخلف.', 'حافظ على الجذع مستقيم.', 'بدّل بين الرجلين مع إيقاع ثابت.'] },

  // Shoulders
  { id: 'ohp', name: 'Overhead Press', group: 'shoulders', level: 'intermediate', equipment: 'بار/دامبلز', video: './assets/ohp.mp4',
    steps: ['قبضة أمام الكتف.', 'ادفع لأعلى حتى تمد الكوعين.', 'اخفض بتحكم وحافظ على جذع ثابت.'] },
  { id: 'lat_raise', name: 'Lateral Raise', group: 'shoulders', level: 'beginner', equipment: 'دامبلز', video: './assets/latraise.mp4',
    steps: ['امسك الدمبلز جانبًا.', 'ارفع حتى مستوى الكتف.', 'اخفض ببطء.'] },

  // Arms
  { id: 'bicep_curl', name: 'Dumbbell Curl', group: 'arms', level: 'beginner', equipment: 'دامبلز', video: './assets/curl.mp4',
    steps: ['ثبّت الكوعين قرب الجسم.', 'ارفع الدمبلز بدون تأرجح.', 'اخفض ببطء.'] },
  { id: 'tricep_pushdown', name: 'Tricep Pushdown', group: 'arms', level: 'beginner', equipment: 'آلة', video: './assets/pushdown.mp4',
    steps: ['قبضة مريحة.', 'ادفع المقبض للأسفل مع تثبيت الكوعين.', 'ارفع ببطء حتى تمد العضلة.'] },

  // Core
  { id: 'plank', name: 'Plank', group: 'core', level: 'beginner', equipment: 'وزن الجسم', video: './assets/plank.mp4',
    steps: ['حافظ على خط مستقيم للرأس والجذع.', 'شد الكور والعضلات.', 'تنفس بهدوء وثبّت الوضع.'] },
  { id: 'hanging_leg_raise', name: 'Hanging Leg Raise', group: 'core', level: 'advanced', equipment: 'عقلة', video: './assets/legraise.mp4',
    steps: ['تعلق على العقلة.', 'ارفع الرجلين مع شد الكور.', 'اخفض ببطء بدون تأرجح.'] },
];

// ====== Rendering & Filters ======
const grid = document.getElementById('exerciseGrid');
const groupSelect = document.getElementById('groupSelect');
const levelSelect = document.getElementById('levelSelect');
const searchInput = document.getElementById('searchInput');
const resetFilters = document.getElementById('resetFilters');

function renderExercises(list){
  grid.innerHTML = '';
  if (!list.length){
    grid.innerHTML = '<div class="card" style="grid-column:1/-1;text-align:center">لا توجد نتائج مطابقة الآن.</div>';
    return;
  }
  list.forEach(ex => {
    const card = document.createElement('div');
    card.className = 'exercise-card';
    card.innerHTML = `
      <h3>${ex.name}</h3>
      <p class="meta">مجموعة: ${labelGroup(ex.group)} • مستوى: ${labelLevel(ex.level)} • أداة: ${ex.equipment}</p>
      <div class="chips">
        <span class="chip">${labelGroup(ex.group)}</span>
        <span class="chip">${labelLevel(ex.level)}</span>
      </div>
      <div class="actions">
        <button class="btn start">بدء التمرين</button>
        <button class="btn info">التفاصيل</button>
      </div>
    `;
    card.querySelector('.btn.start').addEventListener('click', () => openExercise(ex));
    card.querySelector('.btn.info').addEventListener('click', () => openExercise(ex));
    grid.appendChild(card);
  });
}

function labelGroup(g){
  const map = {chest:'صدر',back:'ظهر',legs:'أرجل',shoulders:'كتف',arms:'ذراع',core:'كور'};
  return map[g] || 'عام';
}
function labelLevel(l){
  const map = {beginner:'مبتدئ',intermediate:'متوسط',advanced:'متقدم'};
  return map[l] || 'غير محدد';
}

function applyFilters(){
  const g = groupSelect.value;
  const l = levelSelect.value;
  const q = (searchInput.value || '').toLowerCase();
  const filtered = exercises.filter(ex => {
    const byGroup = g === 'all' ? true : ex.group === g;
    const byLevel = l === 'all' ? true : ex.level === l;
    const byQuery = !q ? true :
      ex.name.toLowerCase().includes(q) ||
      ex.equipment.toLowerCase().includes(q) ||
      labelGroup(ex.group).toLowerCase().includes(q);
    return byGroup && byLevel && byQuery;
  });
  renderExercises(filtered);
}

[groupSelect, levelSelect, searchInput].forEach(el => el.addEventListener('input', applyFilters));
resetFilters.addEventListener('click', () => {
  groupSelect.value = 'all';
  levelSelect.value = 'all';
  searchInput.value = '';
  applyFilters();
});

// ====== Modal ======
const modal = document.getElementById('exerciseModal');
const closeModalBtn = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalMeta = document.getElementById('modalMeta');
const modalVideo = document.getElementById('modalVideo');
const modalVideoSrc = document.getElementById('modalVideoSrc');
const stepsList = document.getElementById('stepsList');

function openExercise(ex){
  modalTitle.textContent = ex.name;
  modalMeta.textContent = `مجموعة: ${labelGroup(ex.group)} • مستوى: ${labelLevel(ex.level)} • أداة: ${ex.equipment}`;
  modalVideoSrc.src = ex.video || '';
  modalVideo.load();
  stepsList.innerHTML = '';
  ex.steps.forEach(s => {
    const li = document.createElement('li');
    li.textContent = s;
    stepsList.appendChild(li);
  });
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(){
  modal.setAttribute('aria-hidden', 'true');
  modalVideo.pause();
}
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// ====== Quick Session message ======
const setsInput = document.getElementById('setsInput');
const repsInput = document.getElementById('repsInput');
const startSessionBtn = document.getElementById('startSession');
const sessionMsg = document.getElementById('sessionMsg');

startSessionBtn.addEventListener('click', () => {
  const sets = Math.max(1, Math.min(10, parseInt(setsInput.value || '3', 10)));
  const reps = Math.max(1, Math.min(50, parseInt(repsInput.value || '12', 10)));
  sessionMsg.textContent = `تم تجهيز متابعة: ${sets} جولة × ${reps} تكرار. حافظ على التقنية ووتيرة ثابتة.`;
});

// ====== Init ======
renderExercises(exercises);




// Scroll reveal: إضافة كلاس visible عند دخول العناصر للشاشة
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // يضاف مرة واحدة فقط
    }
  });
}, { threshold: 0.1 });

sections.forEach(sec => observer.observe(sec));
