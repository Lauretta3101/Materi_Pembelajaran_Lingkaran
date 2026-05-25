/* ======================================================
   TAB SWITCHING
====================================================== */
function showTab(id, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('show'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('show');
  btn.classList.add('active');
}

/* ======================================================
   UNSUR LINGKARAN DATA
====================================================== */
const unsurData = [
  {
    icon: '🎯',
    name: 'Titik Pusat (O)',
    sub: 'Pusat lingkaran',
    desc: 'Titik tetap yang menjadi pusat lingkaran. Semua titik pada lingkaran berjarak sama (= r) dari titik pusat. Dilambangkan dengan huruf O.',
    fact: 'Ingat: Tanpa titik pusat, tidak ada lingkaran!'
  },
  {
    icon: '📏',
    name: 'Jari-jari (r)',
    sub: 'Dari pusat ke tepi',
    desc: 'Ruas garis yang menghubungkan titik pusat ke semua titik di tepi (keliling) lingkaran. Panjangnya selalu sama ke segala arah. Dilambangkan r.',
    fact: 'Rumus: r = d/2 atau r = K/(2π) atau r = √(L/π)'
  },
  {
    icon: '↔️',
    name: 'Diameter (d)',
    sub: 'd = 2r',
    desc: 'Tali busur terpanjang yang melewati titik pusat lingkaran. Nilainya = 2 × jari-jari. Setiap lingkaran memiliki tak terhingga garis diameter.',
    fact: 'd = 2r → Jika r = 7 cm, maka d = 14 cm'
  },
  {
    icon: '〰️',
    name: 'Busur',
    sub: 'Bagian keliling',
    desc: 'Bagian dari keliling (tepi) lingkaran. Busur kecil (minor arc) lebih pendek dari setengah keliling. Busur besar (major arc) lebih dari setengah keliling.',
    fact: 'Panjang busur = (α/360°) × 2πr'
  },
  {
    icon: '📐',
    name: 'Tali Busur',
    sub: 'Garis di tepi lingkaran',
    desc: 'Ruas garis lurus yang kedua ujungnya berada pada lingkaran, TAPI tidak melewati pusat. Jika melewati pusat, maka namanya diameter.',
    fact: 'Tali busur terpanjang = diameter (karena melewati pusat)'
  },
  {
    icon: '🌙',
    name: 'Tembereng',
    sub: 'Daerah busur sabit',
    desc: 'Daerah yang dibatasi oleh tali busur dan busur lingkaran. Bentuknya seperti bulan sabit atau irisan semangka. Ada tembereng kecil dan tembereng besar.',
    fact: 'Luas tembereng = Luas juring − Luas segitiga'
  },
  {
    icon: '🍕',
    name: 'Juring',
    sub: 'Potongan pizza lingkaran',
    desc: 'Daerah yang dibatasi oleh dua buah jari-jari dan busur di antara keduanya. Bentuknya seperti potongan pizza. Juga disebut sektor lingkaran.',
    fact: 'Luas juring = (α/360°) × πr²'
  },
  {
    icon: '⊥',
    name: 'Apotema',
    sub: 'Jarak tegak lurus ke tali busur',
    desc: 'Ruas garis yang ditarik dari titik pusat dan tegak lurus (90°) terhadap tali busur. Merupakan jarak terpendek antara pusat dan tali busur.',
    fact: 'Apotema: a = √(r² − (l/2)²), dimana l = panjang tali busur'
  }
];

function showUnsur(i) {
  const d = unsurData[i];
  document.getElementById('udIcon').textContent = d.icon;
  document.getElementById('udName').textContent = d.name;
  document.getElementById('udSub').textContent  = d.sub;
  document.getElementById('udDesc').textContent = d.desc;
  document.getElementById('udFact').textContent = d.fact;

  const box = document.getElementById('unsurDetail');
  box.style.display   = 'block';
  box.style.animation = 'none';
  box.offsetHeight; // force reflow
  box.style.animation = 'slideup .25s ease';

  document.querySelectorAll('.ucard').forEach((c, j) => {
    c.style.opacity = j === i ? '1' : '0.65';
  });
}

/* ======================================================
   EKSPLORASI
====================================================== */
let epDone = new Set();

function selectEP(el) {
  const id    = el.dataset.id;
  const color = el.dataset.color;
  const name  = el.dataset.name;
  const desc  = el.dataset.desc;
  const svg   = document.getElementById(id);

  if (el.classList.contains('done')) {
    el.classList.remove('done');
    epDone.delete(id);
    if (svg) {
      svg.style.stroke = '#cbd5e1';
      svg.style.fill   = 'none';
      if (svg.tagName === 'circle') svg.style.fill = '#3b82f6';
    }
  } else {
    el.classList.add('done');
    epDone.add(id);
    if (svg) {
      svg.style.stroke = color;
      if (svg.tagName === 'path' || svg.tagName === 'circle') {
        svg.style.fill = color + '44';
      }
      if (svg.tagName === 'circle' && id === 'eCenter') {
        svg.style.fill = color;
      }
    }
    const popup = document.getElementById('epPopup');
    document.getElementById('epName').textContent = name;
    document.getElementById('epDesc').textContent = desc;
    popup.classList.add('show');
    popup.style.display = 'block';
  }

  const n = epDone.size;
  document.getElementById('epFill').style.width = (n / 8 * 100) + '%';
  document.getElementById('epCnt').textContent  = n;
}

/* ======================================================
   KALKULATOR GARIS SINGGUNG
====================================================== */
function updateGS2() {
  const d = parseFloat(document.getElementById('gsD2').value) || 13;
  const r = parseFloat(document.getElementById('gsR2').value) || 5;
  document.getElementById('gsDV').textContent = d;
  document.getElementById('gsRV').textContent = r;
  document.getElementById('gsRes').textContent = Math.sqrt(Math.max(0, d * d - r * r)).toFixed(2);
}

/* ======================================================
   QUIZ — LATIHAN SOAL
====================================================== */
const ALL_QUESTIONS = [
  {
    type: 'Unsur Lingkaran',
    q: 'Himpunan semua titik yang berjarak sama dari satu titik tetap disebut…',
    opts: ['Elips', 'Lingkaran', 'Parabola', 'Segitiga'],
    correct: 1,
    expl: 'Definisi lingkaran: semua titik berjarak sama (= r) dari titik pusat O.'
  },
  {
    type: 'Unsur Lingkaran',
    q: 'Bagian lingkaran yang berbentuk seperti "potongan pizza" dan dibatasi dua jari-jari serta busur disebut…',
    opts: ['Tembereng', 'Busur', 'Juring', 'Apotema'],
    correct: 2,
    expl: 'Juring = daerah yang dibatasi 2 jari-jari dan busur di antaranya. Seperti potongan pizza!'
  },
  {
    type: 'Unsur Lingkaran',
    q: 'Jarak terpendek dari titik pusat ke tali busur disebut…',
    opts: ['Jari-jari', 'Diameter', 'Busur', 'Apotema'],
    correct: 3,
    expl: 'Apotema adalah garis dari pusat yang tegak lurus (90°) terhadap tali busur.'
  },
  {
    type: 'Rumus Dasar',
    q: 'Jika jari-jari lingkaran = 14 cm, berapa kelilingnya? (π = 22/7)',
    opts: ['44 cm', '88 cm', '154 cm', '196 cm'],
    correct: 1,
    expl: 'K = 2πr = 2 × (22/7) × 14 = 88 cm. Ingat rumus K = 2πr!'
  },
  {
    type: 'Rumus Dasar',
    q: 'Luas lingkaran dengan jari-jari 7 cm adalah… (π = 22/7)',
    formula: 'L = πr²',
    opts: ['44 cm²', '88 cm²', '154 cm²', '308 cm²'],
    correct: 2,
    expl: 'L = πr² = (22/7) × 7² = (22/7) × 49 = 154 cm².'
  },
  {
    type: 'Rumus Dasar',
    q: 'Luas juring dengan sudut 90° pada lingkaran berjari-jari 14 cm adalah… (π = 22/7)',
    formula: 'L juring = (α/360°) × πr²',
    opts: ['44 cm²', '88 cm²', '154 cm²', '616 cm²'],
    correct: 2,
    expl: 'L = (90/360) × (22/7) × 14² = ¼ × 616 = 154 cm².'
  },
  {
    type: 'Garis Singgung',
    q: 'Sifat utama garis singgung lingkaran di titik singgung adalah…',
    opts: ['Sejajar jari-jari', 'Tegak lurus jari-jari', 'Memotong lingkaran di 2 titik', 'Melewati titik pusat'],
    correct: 1,
    expl: 'Garis singgung SELALU tegak lurus (90°) terhadap jari-jari di titik singgung. Ini sifat paling utama!'
  },
  {
    type: 'Garis Singgung',
    q: 'Dari satu titik di luar lingkaran, berapa garis singgung yang dapat dibuat ke lingkaran?',
    opts: ['1 garis', '2 garis', '3 garis', 'Tak terhingga'],
    correct: 1,
    expl: 'Dari satu titik luar, selalu bisa dibuat tepat 2 garis singgung, dan panjang keduanya selalu sama.'
  },
  {
    type: 'Garis Singgung',
    q: 'Sebuah titik P berada 13 cm dari pusat lingkaran berjari-jari 5 cm. Panjang garis singgung dari P adalah…',
    formula: 't = √(d² − r²)',
    opts: ['8 cm', '10 cm', '12 cm', '√194 cm'],
    correct: 2,
    expl: 't = √(13² − 5²) = √(169 − 25) = √144 = 12 cm.'
  },
  {
    type: 'Garis Singgung',
    q: 'GSPL (Garis Singgung Persekutuan Luar) antara dua lingkaran berjari-jari R dan r dengan jarak antar pusat p dihitung dengan…',
    opts: ['d = √(p² − (R+r)²)', 'd = √(p² − (R−r)²)', 'd = √(p² + (R−r)²)', 'd = √(p + R − r)'],
    correct: 1,
    expl: 'GSPL: d = √(p² − (R−r)²). GSPP (dalam): d = √(p² − (R+r)²). Selisih vs jumlah jari-jari!'
  }
];

let questions     = [];
let current       = 0;
let score         = 0;
let answers       = [];
let timerInterval = null;
let timeLeft      = 20;
let startTime     = null;
let totalTime     = 0;

function buildDots() {
  const container = document.getElementById('qdots');
  container.innerHTML = '';
  questions.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'qdot' + (i === 0 ? ' active' : '');
    dot.id = 'dot' + i;
    container.appendChild(dot);
  });
}

function startQuiz() {
  questions  = [...ALL_QUESTIONS];
  current    = 0;
  score      = 0;
  answers    = new Array(questions.length).fill(null);
  startTime  = Date.now();
  totalTime  = 0;

  document.getElementById('resultScreen').classList.remove('show');
  document.getElementById('quizArea').style.display = 'block';
  document.getElementById('scoreLive').textContent  = '0';

  buildDots();
  loadQ();
}

function retryWrong() {
  const wrongIdxs = answers.map((a, i) => a === false ? i : null).filter(x => x !== null);
  if (wrongIdxs.length === 0) { startQuiz(); return; }

  questions  = wrongIdxs.map(i => ALL_QUESTIONS[i]);
  current    = 0;
  score      = 0;
  answers    = new Array(questions.length).fill(null);
  startTime  = Date.now();
  totalTime  = 0;

  document.getElementById('resultScreen').classList.remove('show');
  document.getElementById('quizArea').style.display = 'block';
  document.getElementById('scoreLive').textContent  = '0';

  buildDots();
  loadQ();
}

function loadQ() {
  const q = questions[current];

  document.getElementById('qNum').textContent  = 'Soal ' + (current + 1) + ' / ' + questions.length;
  document.getElementById('qType').textContent = q.type;
  document.getElementById('qText').textContent = q.q;

  const fEl = document.getElementById('qFormula');
  if (q.formula) {
    fEl.style.display = 'inline-block';
    fEl.textContent   = q.formula;
  } else {
    fEl.style.display = 'none';
  }

  const grid    = document.getElementById('optsGrid');
  grid.innerHTML = '';
  const letters  = ['A', 'B', 'C', 'D'];

  q.opts.forEach((opt, i) => {
    const btn       = document.createElement('button');
    btn.className   = 'opt';
    btn.innerHTML   = '<span class="opt-letter">' + letters[i] + '</span>' + opt;
    btn.onclick     = () => answer(btn, i);
    grid.appendChild(btn);
  });

  const fb = document.getElementById('feedbackBox');
  fb.className    = 'feedback-box';
  fb.style.display = 'none';
  document.getElementById('nextBtn').disabled = true;

  document.querySelectorAll('.qdot').forEach((d, i) => {
    d.classList.remove('active');
    if (i === current) d.classList.add('active');
  });

  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 20;
  document.getElementById('timerFill').style.width      = '100%';
  document.getElementById('timerFill').style.background = '#7c3aed';
  document.getElementById('timerNum').textContent        = 20;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timerFill').style.width = (timeLeft / 20 * 100) + '%';
    document.getElementById('timerNum').textContent   = timeLeft;

    if (timeLeft <= 5) {
      document.getElementById('timerFill').style.background = '#ef4444';
    }
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timeoutQ();
    }
  }, 1000);
}

function timeoutQ() {
  const q = questions[current];
  answers[current] = false;

  document.querySelectorAll('.opt').forEach((b, i) => {
    b.classList.add('disabled');
    if (i === q.correct) b.classList.add('correct');
  });

  const dot = document.getElementById('dot' + current);
  dot.classList.remove('active');
  dot.classList.add('done-wrong');

  showFeedback(false, 'Waktu habis!', q.expl);
  document.getElementById('nextBtn').disabled = false;
}

function answer(btn, idx) {
  clearInterval(timerInterval);

  const q         = questions[current];
  const isCorrect = idx === q.correct;
  answers[current] = isCorrect;

  document.querySelectorAll('.opt').forEach((b, i) => {
    b.classList.add('disabled');
    if (i === q.correct) b.classList.add('correct');
    else if (i === idx && !isCorrect) b.classList.add('wrong');
  });

  if (isCorrect) {
    score += 10;
    document.getElementById('scoreLive').textContent = score;
  }

  const dot = document.getElementById('dot' + current);
  dot.classList.remove('active');
  dot.classList.add(isCorrect ? 'done-correct' : 'done-wrong');

  showFeedback(isCorrect, isCorrect ? 'Benar! 🎉' : 'Salah!', q.expl);
  document.getElementById('nextBtn').disabled = false;
}

function showFeedback(correct, title, text) {
  const box       = document.getElementById('feedbackBox');
  box.className   = 'feedback-box show ' + (correct ? 'fb-correct' : 'fb-wrong');
  box.style.display = 'block';
  document.getElementById('fbTitle').textContent = (correct ? '✅ ' : '❌ ') + title;
  document.getElementById('fbText').textContent  = text;
}

function nextQ() {
  current++;
  if (current >= questions.length) {
    showResult();
    return;
  }
  loadQ();
}

function showResult() {
  clearInterval(timerInterval);
  totalTime = Math.round((Date.now() - startTime) / 1000);

  document.getElementById('quizArea').style.display = 'none';
  const rs = document.getElementById('resultScreen');
  rs.classList.add('show');

  const correct = answers.filter(a => a === true).length;
  const wrong   = answers.filter(a => a === false).length;
  const pct     = Math.round(correct / questions.length * 100);
  const isPerfect = correct === questions.length;

  document.getElementById('rCorrect').textContent    = correct;
  document.getElementById('rWrong').textContent      = wrong;
  document.getElementById('rTime').textContent       = totalTime;
  document.getElementById('resultScore').textContent = pct;

  document.getElementById('resultTrophy').textContent =
    isPerfect ? '🏆' : (pct >= 70 ? '🎯' : '📚');
  document.getElementById('resultStars').textContent  =
    pct === 100 ? '⭐⭐⭐' : (pct >= 70 ? '⭐⭐' : '⭐');
  document.getElementById('resultTitle').textContent  =
    isPerfect ? 'SEMPURNA! Luar Biasa!' : (pct >= 70 ? 'Bagus! Terus semangat!' : 'Ayo belajar lagi!');
  document.getElementById('resultSub').textContent    =
    isPerfect
      ? 'Kamu menjawab semua soal dengan benar! 🎉'
      : 'Kamu menjawab ' + correct + ' dari ' + questions.length + ' soal dengan benar.';

  const bd = document.getElementById('resultBreakdown');
  bd.innerHTML = '<div class="rb-title">Review Jawaban</div>';

  questions.forEach((q, i) => {
    const ok   = answers[i] === true;
    const item = document.createElement('div');
    item.className = 'rb-item';
    item.innerHTML =
      '<div class="rb-num ' + (ok ? 'c' : 'w') + '">' + (i + 1) + '</div>' +
      '<div class="rb-q">' + q.q.substring(0, 60) + '…</div>' +
      '<div class="rb-ans" style="color:' + (ok ? '#10b981' : '#ef4444') + '">' +
      (ok ? '✓ Benar' : '✗ Salah') + '</div>';
    bd.appendChild(item);
  });

  document.getElementById('retryWrongBtn').style.display = wrong > 0 ? 'inline-block' : 'none';

  if (isPerfect) launchConfetti();
}

function launchConfetti() {
  const wrap   = document.getElementById('confettiWrap');
  wrap.innerHTML = '';
  const colors = ['#7c3aed','#10b981','#f59e0b','#ef4444','#3b82f6','#ec4899','#fbbf24'];

  for (let i = 0; i < 80; i++) {
    const cc = document.createElement('div');
    cc.className = 'cc';
    cc.style.left              = Math.random() * 100 + 'vw';
    cc.style.background        = colors[Math.floor(Math.random() * colors.length)];
    cc.style.width             = (6 + Math.random() * 10) + 'px';
    cc.style.height            = (6 + Math.random() * 10) + 'px';
    cc.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    cc.style.animationDelay    = Math.random() + 's';
    wrap.appendChild(cc);
  }

  setTimeout(() => wrap.innerHTML = '', 4000);
}

/* ======================================================
   INIT — jalankan saat halaman dimuat
====================================================== */
updateGS2();
startQuiz();