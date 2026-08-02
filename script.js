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
      id: 1,
      category: "Faithful Event Recovery (Correct Match)",
      categoryKey: "faithful",
      videoSrc: "assets/videos/qual_faithful_ex1.mp4",
      domain: "Bounce Ball (N=5, F=1.0Hz)",
      prompt: "How many times did the ball contact the walls in the video? Output your step-by-step timestamped event ledger followed by the final integer count in \\boxed{}.",
      gtCount: 5,
      gtTimestamps: "[00:03.76, 00:04.76, 00:05.76, 00:06.76, 00:07.76]",
      gtTrace: "### Ground Truth Executable Trace\n- At 3.76s: Ball contacted left wall (count=1)\n- At 4.76s: Ball contacted right wall (count=2)\n- At 5.76s: Ball contacted left wall (count=3)\n- At 6.76s: Ball contacted right wall (count=4)\n- At 7.76s: Ball contacted left wall (count=5)\nTotal contact events: 5.\n\\boxed{5}",
      modelName: "GEMINI 3.6 FLASH PREDICTION",
      traceF1: "100.0%",
      precision: "100.0%",
      recall: "100.0%",
      predAnswer: 5,
      predStatus: "correct",
      modelOutput: "### Step-by-Step Event Ledger\n- ++00:04++ Ball contacts left wall (Running count: 1)\n- ++00:05++ Ball contacts right wall (Running count: 2)\n- ++00:06++ Ball contacts left wall (Running count: 3)\n- ++00:07++ Ball contacts right wall (Running count: 4)\n- ++00:08++ Ball contacts left wall (Running count: 5)\n\n### Final Answer\n\\boxed{5}",
      justification: "Faithful Event Recovery: Model successfully detected all 5 physical wall contacts in sequential order within the matching tolerance window (τ_match = 1.0s) and accurately calculated the final count integer."
    },
    {
      id: 2,
      category: "Faithful Event Recovery (Correct Match)",
      categoryKey: "faithful",
      videoSrc: "assets/videos/qual_faithful_ex2.mp4",
      domain: "Blinking Light (N=3, F=1.0Hz)",
      prompt: "How many times did the light object blink ON and OFF in the video? Output your step-by-step timestamped event ledger followed by the final integer count in \\boxed{}.",
      gtCount: 3,
      gtTimestamps: "[00:13.41, 00:14.41, 00:15.41]",
      gtTrace: "### Ground Truth Executable Trace\n- At 13.41s: Light blinked ON (count=1)\n- At 14.41s: Light blinked ON (count=2)\n- At 15.41s: Light blinked ON (count=3)\nTotal blinks detected: 3.\n\\boxed{3}",
      modelName: "GEMINI 3.6 FLASH PREDICTION",
      traceF1: "100.0%",
      precision: "100.0%",
      recall: "100.0%",
      predAnswer: 3,
      predStatus: "correct",
      modelOutput: "### Step-by-Step Event Ledger\n- ++00:13++ Light turns ON (Running count: 1)\n- ++00:14++ Light turns ON (Running count: 2)\n- ++00:15++ Light turns ON (Running count: 3)\n\n### Final Answer\n\\boxed{3}",
      justification: "Faithful Event Recovery: Under low event load (N=3, F=1.0Hz), Gemini 3.6 Flash faithfully detected all transient blinks and correctly derived the final integer count."
    },
    {
      id: 3,
      category: "Missed Events (Under-Reporting / Perception Failure)",
      categoryKey: "missed",
      videoSrc: "assets/videos/qual_missed_ex1.mp4",
      domain: "Blinking Light (N=8, F=1.5Hz)",
      prompt: "How many times did the light object blink ON in the video? Output your step-by-step timestamped event ledger followed by the final integer count in \\boxed{}.",
      gtCount: 8,
      gtTimestamps: "[00:02.10, 00:03.43, 00:04.76, 00:06.10, 00:07.43, 00:08.76, 00:10.10, 00:11.43]",
      gtTrace: "### Ground Truth Executable Trace\n8 physical pulse events rendered across 12 seconds.\nTotal blinks: 8.\n\\boxed{8}",
      modelName: "GEMINI 3.6 FLASH PREDICTION",
      traceF1: "28.6%",
      precision: "100.0%",
      recall: "16.7%",
      predAnswer: 2,
      predStatus: "wrong",
      modelOutput: "### Step-by-Step Event Ledger\n- ++00:03++ Light blinks ON (Running count: 1)\n- ++00:08++ Light blinks ON (Running count: 2)\n\n### Final Answer\n\\boxed{2}",
      justification: "Missed Events / Perception Failure: As event frequency increases (F=1.5Hz), visual evidence becomes compressed in time. Gemini severely under-reports the sequence, omitting 6 of the 8 physical blinks."
    },
    {
      id: 4,
      category: "Missed Events (Under-Reporting / Perception Failure)",
      categoryKey: "missed",
      videoSrc: "assets/videos/qual_missed_ex2.mp4",
      domain: "State Machine (N=12, F=3.5Hz)",
      prompt: "How many total state transitions occurred in the video indicator? Output your step-by-step timestamped event ledger followed by the final integer count in \\boxed{}.",
      gtCount: 12,
      gtTimestamps: "[00:01.20, 00:02.10, 00:03.00, 00:03.90, 00:04.80, 00:05.70, 00:06.60, 00:07.50, 00:08.40, 00:09.30, 00:10.20, 00:11.10]",
      gtTrace: "### Ground Truth Executable Trace\n12 rapid categorical color state changes.\nTotal transitions: 12.\n\\boxed{12}",
      modelName: "QWEN 3 VL 235B INSTRUCT PREDICTION",
      traceF1: "25.0%",
      precision: "66.7%",
      recall: "16.7%",
      predAnswer: 3,
      predStatus: "wrong",
      modelOutput: "### Step-by-Step Event Ledger\n- ++00:02++ State transition A -> B (Running count: 1)\n- ++00:06++ State transition B -> C (Running count: 2)\n- ++00:10++ State transition C -> A (Running count: 3)\n\n### Final Answer\n\\boxed{3}",
      justification: "Perception Failure under High Frequency: High event density (F=3.5Hz) causes extreme under-reporting, omitting 9 intermediate transitions and failing recall."
    },
    {
      id: 5,
      category: "Hallucinated Events (Over-Reporting / Spurious Detection)",
      categoryKey: "hallucinated",
      videoSrc: "assets/videos/qual_hallucinated_ex1.mp4",
      domain: "Domino / State Transition (N=1, F=0.5Hz)",
      prompt: "How many times did state transitions occur in the video? Output your step-by-step timestamped trace and final count in \\boxed{}.",
      gtCount: 1,
      gtTimestamps: "[00:04.50]",
      gtTrace: "### Ground Truth Executable Trace\n1 physical state transition at 4.50s.\nTotal events: 1.\n\\boxed{1}",
      modelName: "GEMINI 3.6 FLASH PREDICTION",
      traceF1: "40.0%",
      precision: "25.0%",
      recall: "100.0%",
      predAnswer: 4,
      predStatus: "wrong",
      modelOutput: "### Step-by-Step Event Ledger\n- ++00:02++ Motion shift detected (Running count: 1)\n- ++00:04++ Physical transition (Running count: 2)\n- ++00:07++ Secondary wobble (Running count: 3)\n- ++00:09++ Final stop (Running count: 4)\n\n### Final Answer\n\\boxed{4}",
      justification: "Spurious Over-Reporting / Hallucination: The model generates 3 spurious non-existent timestamps during continuous motion intervals, lowering trace precision to 25%."
    },
    {
      id: 6,
      category: "Hallucinated Events (Over-Reporting / Spurious Detection)",
      categoryKey: "hallucinated",
      videoSrc: "assets/videos/qual_hallucinated_ex2.mp4",
      domain: "State Machine (N=1, F=3.5Hz)",
      prompt: "How many state transitions occurred in the video? Output your step-by-step timestamped trace and final count in \\boxed{}.",
      gtCount: 1,
      gtTimestamps: "[00:05.10]",
      gtTrace: "### Ground Truth Executable Trace\n1 transition rendered at 5.10s.\nTotal transitions: 1.\n\\boxed{1}",
      modelName: "GEMINI 3.6 FLASH PREDICTION",
      traceF1: "33.3%",
      precision: "20.0%",
      recall: "100.0%",
      predAnswer: 5,
      predStatus: "wrong",
      modelOutput: "### Step-by-Step Event Ledger\n- ++00:02++ Color change (count: 1)\n- ++00:03++ Color change (count: 2)\n- ++00:05++ Color change (count: 3)\n- ++00:07++ Color change (count: 4)\n- ++00:08++ Color change (count: 5)\n\n### Final Answer\n\\boxed{5}",
      justification: "Over-Reporting Failure: Over-sensitivity during static intervals creates false positive detections, inflating the final count prediction."
    },
    {
      id: 7,
      category: "Temporally Displaced Events (Timestamp Drift)",
      categoryKey: "displaced",
      videoSrc: "assets/videos/qual_displaced_ex1.mp4",
      domain: "Blinking Light (N=5, F=1.5Hz)",
      prompt: "How many times did the object blink ON in the video? Output your step-by-step timestamped trace and final count in \\boxed{}.",
      gtCount: 5,
      gtTimestamps: "[00:02.10, 00:03.80, 00:05.50, 00:07.20, 00:08.90]",
      gtTrace: "### Ground Truth Executable Trace\n5 physical light blinks rendered at 2.10s, 3.80s, 5.50s, 7.20s, 8.90s.\nTotal blinks: 5.\n\\boxed{5}",
      modelName: "GEMINI 3.6 FLASH PREDICTION",
      traceF1: "40.0%",
      precision: "40.0%",
      recall: "40.0%",
      predAnswer: 5,
      predStatus: "correct",
      modelOutput: "### Step-by-Step Event Ledger\n- ++00:04++ Light blinks ON (count: 1)\n- ++00:06++ Light blinks ON (count: 2)\n- ++00:08++ Light blinks ON (count: 3)\n- ++00:10++ Light blinks ON (count: 4)\n- ++00:12++ Light blinks ON (count: 5)\n\n### Final Answer\n\\boxed{5}",
      justification: "Timestamp Drift / Displacement: The model correctly detects 5 events in sequence, but reported timestamps drift beyond the 1.0s rate-relative tolerance window relative to physical ground truth."
    },
    {
      id: 8,
      category: "Temporally Displaced Events (Timestamp Drift)",
      categoryKey: "displaced",
      videoSrc: "assets/videos/qual_displaced_ex2.mp4",
      domain: "Bounce Ball (N=5, F=1.0Hz)",
      prompt: "How many wall contacts occurred in the video? Output your step-by-step timestamped trace and final count in \\boxed{}.",
      gtCount: 5,
      gtTimestamps: "[00:03.76, 00:04.76, 00:05.76, 00:06.76, 00:07.76]",
      gtTrace: "### Ground Truth Executable Trace\n5 physical wall contacts.\nTotal contacts: 5.\n\\boxed{5}",
      modelName: "QWEN 3 VL 235B INSTRUCT PREDICTION",
      traceF1: "50.0%",
      precision: "50.0%",
      recall: "50.0%",
      predAnswer: 5,
      predStatus: "correct",
      modelOutput: "### Step-by-Step Event Ledger\n- ++00:01++ Wall contact (count: 1)\n- ++00:03++ Wall contact (count: 2)\n- ++00:05++ Wall contact (count: 3)\n- ++00:08++ Wall contact (count: 4)\n- ++00:10++ Wall contact (count: 5)\n\n### Final Answer\n\\boxed{5}",
      justification: "Temporal Offset: Sequence detection is present, but reported boundary seconds exhibit significant temporal offset."
    },
    {
      id: 9,
      category: "Wrong Accumulation (Reasoning Failure / RFR)",
      categoryKey: "rfr",
      videoSrc: "assets/videos/qual_rfr_ex1.mp4",
      domain: "Blinking Light (N=3, F=1.0Hz)",
      prompt: "How many times did the object blink in the video? Output your step-by-step timestamped trace and final count in \\boxed{}.",
      gtCount: 3,
      gtTimestamps: "[00:13.41, 00:14.41, 00:15.41]",
      gtTrace: "### Ground Truth Executable Trace\n3 physical blinks logged at 13.41s, 14.41s, 15.41s.\nTotal blinks: 3.\n\\boxed{3}",
      modelName: "GEMINI 3.6 FLASH PREDICTION",
      traceF1: "80.0%",
      precision: "100.0%",
      recall: "66.7%",
      predAnswer: 1,
      predStatus: "wrong",
      modelOutput: "### Step-by-Step Event Ledger\n- ++00:13 - 00:15++ The purple star fills in solid before returning to its outlined state, marking 1 blink event. (Running Count: 1)\n\n### Final Answer\n\\boxed{1}",
      justification: "Reasoning Failure Ratio (RFR): Gemini generated a highly accurate step-by-step trace (Trace F₁: 80.0%), but made an arithmetic aggregation error, declaring final count 1 instead of 3."
    },
    {
      id: 10,
      category: "Wrong Accumulation (Reasoning Failure / RFR)",
      categoryKey: "rfr",
      videoSrc: "assets/videos/qual_rfr_ex2.mp4",
      domain: "State Machine (N=6, F=0.5Hz)",
      prompt: "How many state transitions occurred in the video? Output your step-by-step timestamped trace and final count in \\boxed{}.",
      gtCount: 6,
      gtTimestamps: "[00:02.10, 00:04.10, 00:06.10, 00:08.10, 00:10.10, 00:12.10]",
      gtTrace: "### Ground Truth Executable Trace\n6 physical state transitions.\nTotal transitions: 6.\n\\boxed{6}",
      modelName: "GEMINI 3.6 FLASH PREDICTION",
      traceF1: "100.0%",
      precision: "100.0%",
      recall: "100.0%",
      predAnswer: 5,
      predStatus: "wrong",
      modelOutput: "### Step-by-Step Event Ledger\n- ++00:02++ State A -> B (Running count: 1)\n- ++00:04++ State B -> C (Running count: 2)\n- ++00:06++ State C -> D (Running count: 3)\n- ++00:08++ State D -> A (Running count: 4)\n- ++00:10++ State A -> B (Running count: 5)\n- ++00:12++ State B -> C (Running count: 6)\n\n### Final Answer\n\\boxed{5}",
      justification: "Trace-to-Answer Accumulation Gap: Model correctly logs all 6 timestamped state transitions in its step-by-step text, but outputted an incorrect integer (5) in \\boxed{}."
    },
    {
      id: 11,
      category: "Accidental Correctness (Accidental Correctness Ratio / ACR)",
      categoryKey: "acr",
      videoSrc: "assets/videos/qual_acr_ex1.mp4",
      domain: "State Machine (N=4, F=3.5Hz)",
      prompt: "How many total state transitions occurred in the video? Output your step-by-step timestamped trace and final count in \\boxed{}.",
      gtCount: 4,
      gtTimestamps: "[00:01.50, 00:03.00, 00:04.50, 00:06.00]",
      gtTrace: "### Ground Truth Executable Trace\n4 physical transitions at 1.50s, 3.00s, 4.50s, 6.00s.\nTotal transitions: 4.\n\\boxed{4}",
      modelName: "GEMINI 3.6 FLASH PREDICTION",
      traceF1: "25.0%",
      precision: "25.0%",
      recall: "25.0%",
      predAnswer: 4,
      predStatus: "correct",
      modelOutput: "### Step-by-Step Event Ledger\n- ++00:08++ Transition detected (Running count: 1)\n- ++00:12++ Transition detected (Running count: 2)\n- ++00:15++ Transition detected (Running count: 3)\n- ++00:18++ Transition detected (Running count: 4)\n\n### Final Answer\n\\boxed{4}",
      justification: "Accidental Correctness Ratio (ACR): Final integer prediction (4) matches ground truth, but the underlying reasoning trace is completely ungrounded with hallucinated timestamps outside the video span."
    },
    {
      id: 12,
      category: "Accidental Correctness (Accidental Correctness Ratio / ACR)",
      categoryKey: "acr",
      videoSrc: "assets/videos/qual_acr_ex2.mp4",
      domain: "Blinking Light (N=3, F=1.0Hz)",
      prompt: "How many times did the light blink ON? Output your step-by-step timestamped trace and final count in \\boxed{}.",
      gtCount: 3,
      gtTimestamps: "[00:13.41, 00:14.41, 00:15.41]",
      gtTrace: "### Ground Truth Executable Trace\n3 physical blinks logged.\nTotal blinks: 3.\n\\boxed{3}",
      modelName: "QWEN 3 VL 235B INSTRUCT PREDICTION",
      traceF1: "33.3%",
      precision: "33.3%",
      recall: "33.3%",
      predAnswer: 3,
      predStatus: "correct",
      modelOutput: "### Step-by-Step Event Ledger\n- ++00:02++ Flash ON (count: 1)\n- ++00:07++ Flash ON (count: 2)\n- ++00:20++ Flash ON (count: 3)\n\n### Final Answer\n\\boxed{3}",
      justification: "Ungrounded Final Answer: Final count matched by chance while step-by-step timestamps were severely degraded."
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
