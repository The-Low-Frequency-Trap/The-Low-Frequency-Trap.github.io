document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navigation Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNav() {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNav);

  // Copy BibTeX functionality
  const copyBtn = document.getElementById('copy-bibtex-btn');
  const bibtexText = document.getElementById('bibtex-code');

  if (copyBtn && bibtexText) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = bibtexText.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied! ✓';
        copyBtn.style.background = '#16a34a';
        copyBtn.style.borderColor = '#16a34a';
        
        setTimeout(() => {
          copyBtn.innerText = originalText;
          copyBtn.style.background = '';
          copyBtn.style.borderColor = '';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }

  // ==========================================================================
  // Qualitative Video Explorer Component Data & Logic
  // ==========================================================================
  const qualitativeExamples = [
  {
    "id": 1,
    "category": "Faithful Event Recovery (Correct Match)",
    "categoryKey": "faithful",
    "videoSrc": "assets/videos/qual_faithful_ex1.mp4",
    "domain": "Blinking (N=1, F=1.0Hz, Seed=8)",
    "prompt": "How many times did the object blink?",
    "gtCount": "1",
    "gtTimestamps": "Executable Timestamps: [\"00:01.37\"]",
    "gtTrace": "### Scene Description\nAn object pulsing ON and OFF at frequency 1.0 Hz.\n- At 1.37s: Object blinked ON (count=1)\n\n### Step 1: Track Blink Pulses\nTotal blinks detected: 1.\n\n\\boxed{1}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "100.0%",
    "precision": "100.0%",
    "recall": "100.0%",
    "predAnswer": "1",
    "predStatus": "correct",
    "modelOutput": "1. Step-by-Step Event Ledger\n- 00:01 - Triangle flashes bright blue (Running count: 1)\n\n2. Final Answer\n\\boxed{1}",
    "justification": "Gemini accurately tracked all 1 key event timestamps in sequence, yielding a perfect trace F1 of 100.0% and matching final answer."
  },
  {
    "id": 2,
    "category": "Faithful Event Recovery (Correct Match)",
    "categoryKey": "faithful",
    "videoSrc": "assets/videos/qual_faithful_ex2.mp4",
    "domain": "Bounce Ball (N=5, F=0.5Hz, Seed=7)",
    "prompt": "How many times did the ball contact the walls?",
    "gtCount": "5",
    "gtTimestamps": "Executable Timestamps: [\"00:07.61\", \"00:09.61\", \"00:11.61\", \"00:13.61\", \"00:15.61\"]",
    "gtTrace": "### Scene Description\nBall bouncing between two walls at frequency 0.5 Hz.\n- At 7.61s: Ball contacted wall_positive (count=1)\n- At 9.61s: Ball contacted wall_negative (count=2)\n- At 11.61s: Ball contacted wall_positive (count=3)\n- At 13.61s: Ball contacted wall_negative (count=4)\n- At 15.61s: Ball contacted wall_positive (count=5)\n\n### Step 1: Track Contact Events\nTotal wall contact events detected: 5.\n\n\\boxed{5}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "100.0%",
    "precision": "100.0%",
    "recall": "100.0%",
    "predAnswer": "5",
    "predStatus": "correct",
    "modelOutput": "1. Step-by-Step Event Ledger\n\n* **00:07** \u2013 Ball contacts the right wall (Running count: 1)\n* **00:09** \u2013 Ball contacts the left wall (Running count: 2)\n* **00:11** \u2013 Ball contacts the right wall (Running count: 3)\n* **00:13** \u2013 Ball contacts the left wall (Running count: 4)\n* **00:15** \u2013 Ball contacts the right wall (Running count: 5)\n\n2. Final Answer\n\\boxed{5}",
    "justification": "Gemini accurately tracked all 5 key event timestamps in sequence, yielding a perfect trace F1 of 100.0% and matching final answer."
  },
  {
    "id": 3,
    "category": "Missed Events (Under-Reporting / Perception Failure)",
    "categoryKey": "missed",
    "videoSrc": "assets/videos/qual_missed_ex1.mp4",
    "domain": "Blinking (N=2, F=1.5Hz, Seed=2)",
    "prompt": "How many times did the object blink?",
    "gtCount": "2",
    "gtTimestamps": "Executable Timestamps: [\"00:19.9\", \"00:20.57\"]",
    "gtTrace": "### Scene Description\nAn object pulsing ON and OFF at frequency 1.5 Hz.\n- At 19.90s: Object blinked ON (count=1)\n- At 20.57s: Object blinked ON (count=2)\n\n### Step 1: Track Blink Pulses\nTotal blinks detected: 2.\n\n\\boxed{2}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "66.7%",
    "precision": "100.0%",
    "recall": "50.0%",
    "predAnswer": "1",
    "predStatus": "wrong",
    "modelOutput": "1. **Step-by-Step Event Ledger**\n- 00:20: Star flashes bright blue (Blink #1, running count: 1)\n\n2. **Final Answer**\n\\boxed{1}",
    "justification": "Gemini under-reported the event sequence, identifying only 1 out of 2 true key events. The model missed high-frequency transitions due to temporal compression."
  },
  {
    "id": 4,
    "category": "Missed Events (Under-Reporting / Perception Failure)",
    "categoryKey": "missed",
    "videoSrc": "assets/videos/qual_missed_ex2.mp4",
    "domain": "Blinking (N=8, F=2.5Hz, Seed=7)",
    "prompt": "How many times did the object blink?",
    "gtCount": "8",
    "gtTimestamps": "Executable Timestamps: [\"00:03.32\", \"00:03.72\", \"00:04.12\", \"00:04.52\", \"00:04.92\", \"00:05.32\", \"00:05.72\", \"00:06.12\"]",
    "gtTrace": "### Scene Description\nAn object pulsing ON and OFF at frequency 2.5 Hz.\n- At 3.32s: Object blinked ON (count=1)\n- At 3.72s: Object blinked ON (count=2)\n- At 4.12s: Object blinked ON (count=3)\n- At 4.52s: Object blinked ON (count=4)\n- At 4.92s: Object blinked ON (count=5)\n- At 5.32s: Object blinked ON (count=6)\n- At 5.72s: Object blinked ON (count=7)\n- At 6.12s: Object blinked ON (count=8)\n\n### Step 1: Track Blink Pulses\nTotal blinks detected: 8.\n\n\\boxed{8}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "22.2%",
    "precision": "100.0%",
    "recall": "12.5%",
    "predAnswer": "1",
    "predStatus": "wrong",
    "modelOutput": "1. Step-by-Step Event Ledger\n- 00:04 - Object blinks bright - Running Count: 1\n\n2. Final Answer\n\\boxed{1}",
    "justification": "Gemini under-reported the event sequence, identifying only 1 out of 8 true key events. The model missed high-frequency transitions due to temporal compression."
  },
  {
    "id": 5,
    "category": "Hallucinated Events (Over-Reporting / Spurious Detection)",
    "categoryKey": "hallucinated",
    "videoSrc": "assets/videos/qual_hallucinated_ex1.mp4",
    "domain": "Blinking (N=1, F=0.5Hz, Seed=1)",
    "prompt": "How many times did the object blink?",
    "gtCount": "1",
    "gtTimestamps": "Executable Timestamps: [\"00:22.61\"]",
    "gtTrace": "### Scene Description\nAn object pulsing ON and OFF at frequency 0.5 Hz.\n- At 22.61s: Object blinked ON (count=1)\n\n### Step 1: Track Blink Pulses\nTotal blinks detected: 1.\n\n\\boxed{1}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "66.7%",
    "precision": "50.0%",
    "recall": "100.0%",
    "predAnswer": "0",
    "predStatus": "wrong",
    "modelOutput": "1. Step-by-Step Event Ledger\n- 00:00 - 00:23: The object remains static and visible throughout the entire sequence with no state changes or disappearances (Running count: 0).\n\n2. \\boxed{0}",
    "justification": "Gemini over-reported events, generating 2 timestamps for a video with only 1 ground-truth key events. Spurious detections occurred during non-event visual motion."
  },
  {
    "id": 6,
    "category": "Hallucinated Events (Over-Reporting / Spurious Detection)",
    "categoryKey": "hallucinated",
    "videoSrc": "assets/videos/qual_hallucinated_ex2.mp4",
    "domain": "Blinking (N=1, F=2.5Hz, Seed=7)",
    "prompt": "How many times did the object blink?",
    "gtCount": "1",
    "gtTimestamps": "Executable Timestamps: [\"00:14.92\"]",
    "gtTrace": "### Scene Description\nAn object pulsing ON and OFF at frequency 2.5 Hz.\n- At 14.92s: Object blinked ON (count=1)\n\n### Step 1: Track Blink Pulses\nTotal blinks detected: 1.\n\n\\boxed{1}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "0.0%",
    "precision": "0.0%",
    "recall": "0.0%",
    "predAnswer": "0",
    "predStatus": "wrong",
    "modelOutput": "1. Step-by-Step Event Ledger:\n- The video sequence from 00:00 to 00:23 was continuously analyzed for visual state changes.\n- The purple triangle remains static and constantly visible across all timestamps without any blinking or disappearance.\n- Final running count of blink events: 0.\n\n2. \\boxed{0}",
    "justification": "Gemini over-reported events, generating 2 timestamps for a video with only 1 ground-truth key events. Spurious detections occurred during non-event visual motion."
  },
  {
    "id": 7,
    "category": "Temporally Displaced Events (Timestamp Drift)",
    "categoryKey": "displaced",
    "videoSrc": "assets/videos/qual_displaced_ex1.mp4",
    "domain": "Blinking (N=2, F=0.5Hz, Seed=0)",
    "prompt": "How many times did the object blink?",
    "gtCount": "2",
    "gtTimestamps": "Executable Timestamps: [\"00:21.1\", \"00:23.1\"]",
    "gtTrace": "### Scene Description\nAn object pulsing ON and OFF at frequency 0.5 Hz.\n- At 21.10s: Object blinked ON (count=1)\n- At 23.10s: Object blinked ON (count=2)\n\n### Step 1: Track Blink Pulses\nTotal blinks detected: 2.\n\n\\boxed{2}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "50.0%",
    "precision": "50.0%",
    "recall": "50.0%",
    "predAnswer": "0",
    "predStatus": "wrong",
    "modelOutput": "1. **Step-by-Step Event Ledger**\n- The video sequence from 00:00 to 00:23 was evaluated to observe any visual changes or blinking behavior of the central triangle. Throughout the entirety of the video, the shape remains constantly visible with no blinks occurring. Consequently, no blink events were recorded across all timestamps, leaving the final count at 0.\n\n2. **Final Answer**\n\\boxed{0}",
    "justification": "Gemini detected the event occurrences but assigned timestamps displaced from actual physical boundary contacts outside the 1.0s tolerance window."
  },
  {
    "id": 8,
    "category": "Temporally Displaced Events (Timestamp Drift)",
    "categoryKey": "displaced",
    "videoSrc": "assets/videos/qual_displaced_ex2.mp4",
    "domain": "Blinking (N=2, F=1.0Hz, Seed=8)",
    "prompt": "How many times did the object blink?",
    "gtCount": "2",
    "gtTimestamps": "Executable Timestamps: [\"00:20.91\", \"00:21.91\"]",
    "gtTrace": "### Scene Description\nAn object pulsing ON and OFF at frequency 1.0 Hz.\n- At 20.91s: Object blinked ON (count=1)\n- At 21.91s: Object blinked ON (count=2)\n\n### Step 1: Track Blink Pulses\nTotal blinks detected: 2.\n\n\\boxed{2}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "0.0%",
    "precision": "0.0%",
    "recall": "0.0%",
    "predAnswer": "0",
    "predStatus": "wrong",
    "modelOutput": "### 1. Step-by-Step Event Ledger\n\n- **00:00 - 00:23**: The video sequence was observed continuously across all timestamps. The square object remains constantly visible and unchanged throughout the duration with zero blinking events detected (Running Count: 0).\n\n### 2. Final Answer\n\\boxed{0}",
    "justification": "Gemini detected the event occurrences but assigned timestamps displaced from actual physical boundary contacts outside the 1.0s tolerance window."
  },
  {
    "id": 9,
    "category": "Wrong Accumulation (Reasoning Failure Ratio / RFR)",
    "categoryKey": "rfr",
    "videoSrc": "assets/videos/qual_rfr_ex1.mp4",
    "domain": "Blinking (N=3, F=1.0Hz, Seed=7)",
    "prompt": "How many times did the object blink?",
    "gtCount": "3",
    "gtTimestamps": "Executable Timestamps: [\"00:13.41\", \"00:14.41\", \"00:15.41\"]",
    "gtTrace": "### Scene Description\nAn object pulsing ON and OFF at frequency 1.0 Hz.\n- At 13.41s: Object blinked ON (count=1)\n- At 14.41s: Object blinked ON (count=2)\n- At 15.41s: Object blinked ON (count=3)\n\n### Step 1: Track Blink Pulses\nTotal blinks detected: 3.\n\n\\boxed{3}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "80.0%",
    "precision": "100.0%",
    "recall": "66.7%",
    "predAnswer": "1",
    "predStatus": "wrong",
    "modelOutput": "### 1. Step-by-Step Event Ledger\n\n* **00:13 - 00:15**: The purple star fills in solid before returning to its outlined state, marking 1 blink event. (Running Count: 1)\n\n### 2. Final Answer\n\\boxed{1}",
    "justification": "Wrong Accumulation (RFR): Gemini generated a highly accurate step-by-step trace (Trace F1: 80.0%), but made an arithmetic aggregation error, declaring final count 1 instead of 3."
  },
  {
    "id": 10,
    "category": "Wrong Accumulation (Reasoning Failure Ratio / RFR)",
    "categoryKey": "rfr",
    "videoSrc": "assets/videos/qual_rfr_ex2.mp4",
    "domain": "Bounce Ball (N=5, F=1.0Hz, Seed=5)",
    "prompt": "How many times did the ball contact the walls?",
    "gtCount": "5",
    "gtTimestamps": "Executable Timestamps: [\"00:03.76\", \"00:04.76\", \"00:05.76\", \"00:06.76\", \"00:07.76\"]",
    "gtTrace": "### Scene Description\nBall bouncing between two walls at frequency 1.0 Hz.\n- At 3.76s: Ball contacted wall_negative (count=1)\n- At 4.76s: Ball contacted wall_positive (count=2)\n- At 5.76s: Ball contacted wall_negative (count=3)\n- At 6.76s: Ball contacted wall_positive (count=4)\n- At 7.76s: Ball contacted wall_negative (count=5)\n\n### Step 1: Track Contact Events\nTotal wall contact events detected: 5.\n\n\\boxed{5}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "88.9%",
    "precision": "100.0%",
    "recall": "80.0%",
    "predAnswer": "4",
    "predStatus": "wrong",
    "modelOutput": "### Step-by-Step Event Ledger\n\n* **00:04** \u2013 Ball contacts left wall (Running count: 1)\n* **00:05** \u2013 Ball contacts right wall (Running count: 2)\n* **00:06** \u2013 Ball contacts left wall (Running count: 3)\n* **00:07** \u2013 Ball contacts right wall (Running count: 4)\n\n\\boxed{4}",
    "justification": "Wrong Accumulation (RFR): Gemini generated a highly accurate step-by-step trace (Trace F1: 88.9%), but made an arithmetic aggregation error, declaring final count 4 instead of 5."
  },
  {
    "id": 11,
    "category": "Accidental Correctness (Accidental Correctness Ratio / ACR)",
    "categoryKey": "acr",
    "videoSrc": "assets/videos/qual_acr_ex1.mp4",
    "domain": "Blinking (N=0, F=1.0Hz, Seed=0)",
    "prompt": "How many times did the object blink?",
    "gtCount": "0",
    "gtTimestamps": "Executable Timestamps: []",
    "gtTrace": "### Scene Description\nAn object pulsing ON and OFF at frequency 1.0 Hz.\n\n### Step 1: Track Blink Pulses\nTotal blinks detected: 0.\n\n\\boxed{0}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "0.0%",
    "precision": "0.0%",
    "recall": "0.0%",
    "predAnswer": "0",
    "predStatus": "correct",
    "modelOutput": "1. Step-by-Step Event Ledger\n- 00:00 - 00:23: The central circular object remains visible and static throughout all timestamps with no blink events occurring (Running Count: 0).\n\n2. Final Answer\n\\boxed{0}",
    "justification": "Accidental Correctness (ACR): Gemini predicted the correct final integer (0), but its reported trace was incomplete/flawed (Trace F1: 0.0%), demonstrating a lucky guess or compensating errors."
  },
  {
    "id": 12,
    "category": "Accidental Correctness (Accidental Correctness Ratio / ACR)",
    "categoryKey": "acr",
    "videoSrc": "assets/videos/qual_acr_ex2.mp4",
    "domain": "Bounce Ball (N=0, F=1.0Hz, Seed=4)",
    "prompt": "How many times did the ball contact the walls?",
    "gtCount": "0",
    "gtTimestamps": "Executable Timestamps: []",
    "gtTrace": "### Scene Description\nBall bouncing between two walls at frequency 1.0 Hz.\n\n### Step 1: Track Contact Events\nTotal wall contact events detected: 0.\n\n\\boxed{0}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "0.0%",
    "precision": "0.0%",
    "recall": "0.0%",
    "predAnswer": "0",
    "predStatus": "correct",
    "modelOutput": "1. Step-by-Step Event Ledger\n- 00:00 - 00:23: The blue ball remains completely stationary in the center of the screen and does not make contact with any wall (Running count: 0).\n\n2. Final Answer\n\\boxed{0}",
    "justification": "Accidental Correctness (ACR): Gemini predicted the correct final integer (0), but its reported trace was incomplete/flawed (Trace F1: 0.0%), demonstrating a lucky guess or compensating errors."
  }
];

  let currentCategory = 'all';
  let filteredIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  let currentFilteredPointer = 0;

  const catTitleEl = document.getElementById('qual-category-title');
  const domainTagEl = document.getElementById('qual-domain-tag');
  const counterEl = document.getElementById('qual-counter');
  const videoPlayerEl = document.getElementById('qual-video-player');
  const promptTextEl = document.getElementById('qual-prompt-text');
  const gtCountEl = document.getElementById('qual-gt-count');
  const gtTimestampsEl = document.getElementById('qual-gt-timestamps');
  const gtTraceEl = document.getElementById('qual-gt-trace');
  const modelBoxEl = document.getElementById('qual-model-box');
  const modelNameEl = document.getElementById('qual-model-name');
  const metricF1El = document.getElementById('qual-metric-f1');
  const metricPrecEl = document.getElementById('qual-metric-prec');
  const metricRecEl = document.getElementById('qual-metric-rec');
  const predAnswerEl = document.getElementById('qual-pred-answer');
  const modelOutputEl = document.getElementById('qual-model-output');
  const justificationTextEl = document.getElementById('qual-justification-text');

  const prevBtn = document.getElementById('qual-prev-btn');
  const nextBtn = document.getElementById('qual-next-btn');

  function updateQualViewer() {
    if (!filteredIndices.length) return;
    const realIndex = filteredIndices[currentFilteredPointer];
    const data = qualitativeExamples[realIndex];

    if (catTitleEl) catTitleEl.innerText = data.category;
    if (domainTagEl) domainTagEl.innerText = data.domain;
    if (counterEl) counterEl.innerText = `Example ${currentFilteredPointer + 1} of ${filteredIndices.length}`;
    
    if (videoPlayerEl) {
      videoPlayerEl.src = data.videoSrc;
      videoPlayerEl.play().catch(() => {});
    }

    if (promptTextEl) promptTextEl.innerText = data.prompt;
    if (gtCountEl) gtCountEl.innerText = `GT COUNT: ${data.gtCount}`;
    if (gtTimestampsEl) gtTimestampsEl.innerText = data.gtTimestamps;
    if (gtTraceEl) gtTraceEl.innerText = data.gtTrace;

    if (modelBoxEl) {
      modelBoxEl.className = `qual-info-box model-box status-${data.predStatus}`;
    }
    if (modelNameEl) modelNameEl.innerText = data.modelName;
    if (metricF1El) metricF1El.innerText = `Trace F₁: ${data.traceF1}`;
    if (metricPrecEl) metricPrecEl.innerText = `Precision: ${data.precision}`;
    if (metricRecEl) metricRecEl.innerText = `Recall: ${data.recall}`;
    if (predAnswerEl) predAnswerEl.innerText = `PRED ANSWER: ${data.predAnswer}`;
    if (modelOutputEl) modelOutputEl.innerText = data.modelOutput;
    if (justificationTextEl) justificationTextEl.innerText = data.justification;
  }

  function filterCategory(catKey) {
    currentCategory = catKey;
    if (catKey === 'all') {
      filteredIndices = qualitativeExamples.map((_, i) => i);
    } else {
      filteredIndices = qualitativeExamples
        .map((item, i) => item.categoryKey === catKey ? i : -1)
        .filter(i => i !== -1);
    }
    currentFilteredPointer = 0;
    updateQualViewer();
  }

  // Filter Pills Event Listeners
  const pillBtns = document.querySelectorAll('.qual-pill');
  pillBtns.forEach(pill => {
    pill.addEventListener('click', () => {
      pillBtns.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const catKey = pill.getAttribute('data-cat');
      filterCategory(catKey);
    });
  });

  // Navigation Buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (filteredIndices.length === 0) return;
      currentFilteredPointer = (currentFilteredPointer - 1 + filteredIndices.length) % filteredIndices.length;
      updateQualViewer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (filteredIndices.length === 0) return;
      currentFilteredPointer = (currentFilteredPointer + 1) % filteredIndices.length;
      updateQualViewer();
    });
  }

  // Initial render
  updateQualViewer();
});
