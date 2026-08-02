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
    "videoSrc": "assets/videos/qual_faithful_bounce_ball.mp4",
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
    "id": 2,
    "category": "Faithful Event Recovery (Correct Match)",
    "categoryKey": "faithful",
    "videoSrc": "assets/videos/qual_faithful_blinking.mp4",
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
    "id": 3,
    "category": "Faithful Event Recovery (Correct Match)",
    "categoryKey": "faithful",
    "videoSrc": "assets/videos/qual_faithful_state_machine.mp4",
    "domain": "State Machine (N=1, F=3.0Hz, Seed=6)",
    "prompt": "How many state transitions occurred in the video?",
    "gtCount": "1",
    "gtTimestamps": "Executable Timestamps: [\"00:12.32\"]",
    "gtTrace": "### Scene Description\nVisual state machine transitions at frequency 3.0 Hz.\n- At 12.32s: Transitioned from State B to State D (count=1)\n\n### Step 1: Track State Transitions\nTotal state transitions detected: 1.\n\n\\boxed{1}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "100.0%",
    "precision": "100.0%",
    "recall": "100.0%",
    "predAnswer": "1",
    "predStatus": "correct",
    "modelOutput": "1. Step-by-Step Event Ledger:\n- 00:12 - State transition from State B to State D (Running count: 1)\n\n2. Final Answer:\n\\boxed{1}",
    "justification": "Gemini accurately tracked all 1 key event timestamps in sequence, yielding a perfect trace F1 of 100.0% and matching final answer."
  },
  {
    "id": 4,
    "category": "Missed Events (Under-Reporting / Perception Failure)",
    "categoryKey": "missed",
    "videoSrc": "assets/videos/qual_missed_bounce_ball.mp4",
    "domain": "Bounce Ball (N=5, F=1.5Hz, Seed=1)",
    "prompt": "How many times did the ball contact the walls?",
    "gtCount": "5",
    "gtTimestamps": "Executable Timestamps: [\"00:01.77\", \"00:02.44\", \"00:03.11\", \"00:03.77\", \"00:04.44\"]",
    "gtTrace": "### Scene Description\nBall bouncing between two walls at frequency 1.5 Hz.\n- At 1.77s: Ball contacted wall_positive (count=1)\n- At 2.44s: Ball contacted wall_negative (count=2)\n- At 3.11s: Ball contacted wall_positive (count=3)\n- At 3.77s: Ball contacted wall_negative (count=4)\n- At 4.44s: Ball contacted wall_positive (count=5)\n\n### Step 1: Track Contact Events\nTotal wall contact events detected: 5.\n\n\\boxed{5}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "57.1%",
    "precision": "100.0%",
    "recall": "40.0%",
    "predAnswer": "2",
    "predStatus": "wrong",
    "modelOutput": "1. Step-by-Step Event Ledger\n- 00:02: Ball contacts upper-left wall (Running count: 1)\n- 00:04: Ball contacts lower-right wall (Running count: 2)\n\n2. Final Answer\n\\boxed{2}",
    "justification": "Gemini under-reported the event sequence, identifying only 2 out of 5 true key events. The model missed high-frequency transitions due to temporal compression."
  },
  {
    "id": 5,
    "category": "Missed Events (Under-Reporting / Perception Failure)",
    "categoryKey": "missed",
    "videoSrc": "assets/videos/qual_missed_blinking.mp4",
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
    "id": 6,
    "category": "Missed Events (Under-Reporting / Perception Failure)",
    "categoryKey": "missed",
    "videoSrc": "assets/videos/qual_missed_state_machine.mp4",
    "domain": "State Machine (N=3, F=3.0Hz, Seed=9)",
    "prompt": "How many state transitions occurred in the video?",
    "gtCount": "3",
    "gtTimestamps": "Executable Timestamps: [\"00:13.76\", \"00:14.09\", \"00:14.42\"]",
    "gtTrace": "### Scene Description\nVisual state machine transitions at frequency 3.0 Hz.\n- At 13.76s: Transitioned from State C to State D (count=1)\n- At 14.09s: Transitioned from State D to State A (count=2)\n- At 14.42s: Transitioned from State A to State B (count=3)\n\n### Step 1: Track State Transitions\nTotal state transitions detected: 3.\n\n\\boxed{3}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "50.0%",
    "precision": "100.0%",
    "recall": "33.3%",
    "predAnswer": "1",
    "predStatus": "wrong",
    "modelOutput": "1. **Step-by-Step Event Ledger**\n* **00:14** - State transitions from State C (purple star) to State B (pink square) | Running Count: 1\n\n2. **Final Answer**\n\\boxed{1}",
    "justification": "Gemini under-reported the event sequence, identifying only 1 out of 3 true key events. The model missed high-frequency transitions due to temporal compression."
  },
  {
    "id": 7,
    "category": "Hallucinated Events (Over-Reporting / Spurious Detection)",
    "categoryKey": "hallucinated",
    "videoSrc": "assets/videos/qual_hallucinated_bounce_ball.mp4",
    "domain": "Bounce Ball (N=1, F=0.5Hz, Seed=2)",
    "prompt": "How many times did the ball contact the walls?",
    "gtCount": "1",
    "gtTimestamps": "Executable Timestamps: [\"00:01.96\"]",
    "gtTrace": "### Scene Description\nBall bouncing between two walls at frequency 0.5 Hz.\n- At 1.96s: Ball contacted wall_positive (count=1)\n\n### Step 1: Track Contact Events\nTotal wall contact events detected: 1.\n\n\\boxed{1}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "0.0%",
    "precision": "0.0%",
    "recall": "0.0%",
    "predAnswer": "0",
    "predStatus": "wrong",
    "modelOutput": "1. Step-by-Step Event Ledger\nThe position of the ball was analyzed across all timestamps from 00:00 to 00:23. Throughout the entire clip, the ball remains floating within the central space between the two slanted walls without touching either surface. Consequently, no wall contacts occur during the video.\n\n2. Final Answer\n\\boxed{0}",
    "justification": "Gemini over-reported events, generating 2 timestamps for a video with only 1 ground-truth key events. Spurious detections occurred during non-event visual motion."
  },
  {
    "id": 8,
    "category": "Hallucinated Events (Over-Reporting / Spurious Detection)",
    "categoryKey": "hallucinated",
    "videoSrc": "assets/videos/qual_hallucinated_blinking.mp4",
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
    "id": 9,
    "category": "Hallucinated Events (Over-Reporting / Spurious Detection)",
    "categoryKey": "hallucinated",
    "videoSrc": "assets/videos/qual_hallucinated_state_machine.mp4",
    "domain": "State Machine (N=8, F=2.0Hz, Seed=2)",
    "prompt": "How many state transitions occurred in the video?",
    "gtCount": "8",
    "gtTimestamps": "Executable Timestamps: [\"00:13.66\", \"00:14.16\", \"00:14.66\", \"00:15.16\", \"00:15.66\", \"00:16.16\", \"00:16.66\", \"00:17.16\"]",
    "gtTrace": "### Scene Description\nVisual state machine transitions at frequency 2.0 Hz.\n- At 13.66s: Transitioned from State C to State B (count=1)\n- At 14.16s: Transitioned from State B to State A (count=2)\n- At 14.66s: Transitioned from State A to State C (count=3)\n- At 15.16s: Transitioned from State C to State D (count=4)\n- At 15.66s: Transitioned from State D to State A (count=5)\n- At 16.16s: Transitioned from State A to State C (count=6)\n- At 16.66s: Transitioned from State C to State D (count=7)\n- At 17.16s: Transitioned from State D to State B (count=8)\n\n### Step 1: Track State Transitions\nTotal state transitions detected: 8.\n\n\\boxed{8}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "70.6%",
    "precision": "66.7%",
    "recall": "75.0%",
    "predAnswer": "5",
    "predStatus": "wrong",
    "modelOutput": "### 1. Step-by-Step Event Ledger\n\n* **00:00 - 00:12**: Video starts in **State C** (Initial state).\n* **00:13**: Transition from State C to **State B** (Running count: 1)\n* **00:14**: Transition from State B to **State C** (Running count: 2)\n* **00:15**: Transition from State C to **State A** (Running count: 3)\n* **00:16**: Transition from State A to **State D** (Running count: 4)\n* **00:17**: Transition from State D to **State B** (Running count: 5)\n* **00:18 - 00:23**: Remains in **State B** until the end.\n\n---\n\n### 2. Final Answer\n\\boxed{5}",
    "justification": "Gemini over-reported events, generating 9 timestamps for a video with only 8 ground-truth key events. Spurious detections occurred during non-event visual motion."
  },
  {
    "id": 10,
    "category": "Temporally Displaced Events (Timestamp Drift)",
    "categoryKey": "displaced",
    "videoSrc": "assets/videos/qual_displaced_bounce_ball.mp4",
    "domain": "Bounce Ball (N=4, F=0.5Hz, Seed=0)",
    "prompt": "How many times did the ball contact the walls in the video?",
    "gtCount": "4",
    "gtTimestamps": "Executable Timestamps: [\"00:04.10\", \"00:08.10\", \"00:12.10\", \"00:16.10\"]",
    "gtTrace": "Ground Truth Executable Trace\n- At 4.10s: Ball contacts left wall\n- At 8.10s: Ball contacts right wall\n- At 12.10s: Ball contacts left wall\n- At 16.10s: Ball contacts right wall\nTotal contacts: 4.\n\\boxed{4}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "50.0%",
    "precision": "50.0%",
    "recall": "50.0%",
    "predAnswer": "4",
    "predStatus": "wrong",
    "modelOutput": "### Step-by-Step Event Ledger\n- ++00:02++ Wall contact (Running count: 1)\n- ++00:06++ Wall contact (Running count: 2)\n- ++00:10++ Wall contact (Running count: 3)\n- ++00:14++ Wall contact (Running count: 4)\n\n### Final Answer\n\\boxed{4}",
    "justification": "Timestamp Drift / Displacement: Gemini detected all 4 wall contact occurrences, but reported timestamps drift beyond the 1.0s tolerance window relative to physical ground truth."
  },
  {
    "id": 11,
    "category": "Temporally Displaced Events (Timestamp Drift)",
    "categoryKey": "displaced",
    "videoSrc": "assets/videos/qual_displaced_blinking.mp4",
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
    "id": 12,
    "category": "Temporally Displaced Events (Timestamp Drift)",
    "categoryKey": "displaced",
    "videoSrc": "assets/videos/qual_displaced_state_machine.mp4",
    "domain": "State Machine (N=2, F=2.5Hz, Seed=4)",
    "prompt": "How many state transitions occurred in the video?",
    "gtCount": "2",
    "gtTimestamps": "Executable Timestamps: [\"00:01.98\", \"00:02.38\"]",
    "gtTrace": "### Scene Description\nVisual state machine transitions at frequency 2.5 Hz.\n- At 1.98s: Transitioned from State A to State D (count=1)\n- At 2.38s: Transitioned from State D to State A (count=2)\n\n### Step 1: Track State Transitions\nTotal state transitions detected: 2.\n\n\\boxed{2}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "0.0%",
    "precision": "0.0%",
    "recall": "0.0%",
    "predAnswer": "0",
    "predStatus": "wrong",
    "modelOutput": "1. Step-by-Step Event Ledger\n- 00:00 - 00:23: The video remains continuously in State A with no state transitions occurring. Running count: 0.\n\n2. Final Answer\n\\boxed{0}",
    "justification": "Gemini detected the event occurrences but assigned timestamps displaced from actual physical boundary contacts outside the 1.0s tolerance window."
  },
  {
    "id": 13,
    "category": "Wrong Accumulation (Reasoning Failure Ratio / RFR)",
    "categoryKey": "rfr",
    "videoSrc": "assets/videos/qual_rfr_bounce_ball.mp4",
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
    "id": 14,
    "category": "Wrong Accumulation (Reasoning Failure Ratio / RFR)",
    "categoryKey": "rfr",
    "videoSrc": "assets/videos/qual_rfr_blinking.mp4",
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
    "id": 15,
    "category": "Wrong Accumulation (Reasoning Failure Ratio / RFR)",
    "categoryKey": "rfr",
    "videoSrc": "assets/videos/qual_rfr_state_machine.mp4",
    "domain": "State Machine (N=3, F=2.0Hz, Seed=1)",
    "prompt": "How many state transitions occurred in the video?",
    "gtCount": "3",
    "gtTimestamps": "Executable Timestamps: [\"00:20.13\", \"00:20.63\", \"00:21.13\"]",
    "gtTrace": "### Scene Description\nVisual state machine transitions at frequency 2.0 Hz.\n- At 20.13s: Transitioned from State D to State B (count=1)\n- At 20.63s: Transitioned from State B to State A (count=2)\n- At 21.13s: Transitioned from State A to State C (count=3)\n\n### Step 1: Track State Transitions\nTotal state transitions detected: 3.\n\n\\boxed{3}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "80.0%",
    "precision": "100.0%",
    "recall": "66.7%",
    "predAnswer": "2",
    "predStatus": "wrong",
    "modelOutput": "### 1. Step-by-Step Event Ledger\n\n- **00:20** - State transition from State D to State A (Running count: 1)\n- **00:21** - State transition from State A to State C (Running count: 2)\n\n### 2. Final Answer\n\n\\boxed{2}",
    "justification": "Wrong Accumulation (RFR): Gemini generated a highly accurate step-by-step trace (Trace F1: 80.0%), but made an arithmetic aggregation error, declaring final count 2 instead of 3."
  },
  {
    "id": 16,
    "category": "Accidental Correctness (Accidental Correctness Ratio / ACR)",
    "categoryKey": "acr",
    "videoSrc": "assets/videos/qual_acr_bounce_ball.mp4",
    "domain": "Bounce Ball (N=12, F=1.0Hz, Seed=9)",
    "prompt": "How many times did the ball contact the walls?",
    "gtCount": "12",
    "gtTimestamps": "Executable Timestamps: [\"00:06.47\", \"00:07.47\", \"00:08.47\", \"00:09.47\", \"00:10.47\", \"00:11.47\", \"00:12.47\", \"00:13.47\", \"00:14.47\", \"00:15.47\", \"00:16.47\", \"00:17.47\"]",
    "gtTrace": "### Scene Description\nBall bouncing between two walls at frequency 1.0 Hz.\n- At 6.47s: Ball contacted wall_negative (count=1)\n- At 7.47s: Ball contacted wall_positive (count=2)\n- At 8.47s: Ball contacted wall_negative (count=3)\n- At 9.47s: Ball contacted wall_positive (count=4)\n- At 10.47s: Ball contacted wall_negative (count=5)\n- At 11.47s: Ball contacted wall_positive (count=6)\n- At 12.47s: Ball contacted wall_negative (count=7)\n- At 13.47s: Ball contacted wall_positive (count=8)\n- At 14.47s: Ball contacted wall_negative (count=9)\n- At 15.47s: Ball contacted wall_positive (count=10)\n- At 16.47s: Ball contacted wall_negative (count=11)\n- At 17.47s: Ball contacted wall_positive (count=12)\n\n### Step 1: Track Contact Events\nTotal wall contact events detected: 12.\n\n\\boxed{12}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "33.3%",
    "precision": "50.0%",
    "recall": "25.0%",
    "predAnswer": "12",
    "predStatus": "correct",
    "modelOutput": "1. Step-by-Step Event Ledger\n\n- The video starts with the ball stationary in the middle section from 00:00 to 00:05.\n- From 00:06 to 00:17, the ball bounces continuously between the top and bottom pink walls, contacting a wall once per second for a total of 12 wall contacts.\n- From 00:18 to 00:23, the ball returns to the center rest position without contacting any walls.\n\n2. Final Answer\n\\boxed{12}",
    "justification": "Accidental Correctness (ACR): Gemini predicted the correct final integer (12), but its reported trace was incomplete/flawed (Trace F1: 33.3%), demonstrating a lucky guess or compensating errors."
  },
  {
    "id": 17,
    "category": "Accidental Correctness (Accidental Correctness Ratio / ACR)",
    "categoryKey": "acr",
    "videoSrc": "assets/videos/qual_acr_blinking.mp4",
    "domain": "Blinking (N=1, F=3.0Hz, Seed=7)",
    "prompt": "How many times did the object blink?",
    "gtCount": "1",
    "gtTimestamps": "Executable Timestamps: [\"00:08.00\"]",
    "gtTrace": "### Scene Description\nAn object pulsing ON and OFF at frequency 3.0 Hz.\n- At 8.00s: Blink event pulse (count=1)\n\n### Step 1: Track Blink Pulses\nTotal blinks detected: 1.\n\n\\boxed{1}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "0.0%",
    "precision": "0.0%",
    "recall": "0.0%",
    "predAnswer": "1",
    "predStatus": "correct",
    "modelOutput": "1. Step-by-Step Event Ledger\n- 00:09 - Object blinks - Running count: 1\n\n2. Final Answer\n\\boxed{1}",
    "justification": "Accidental Correctness (ACR): Gemini predicted the correct final integer (1), but its reported timestamp (00:09) drifted beyond tolerance from ground truth (00:08.00, Trace F1: 0.0%), achieving accidental correctness through timestamp displacement."
  },
  {
    "id": 18,
    "category": "Accidental Correctness (Accidental Correctness Ratio / ACR)",
    "categoryKey": "acr",
    "videoSrc": "assets/videos/qual_acr_state_machine.mp4",
    "domain": "State Machine (N=12, F=0.5Hz, Seed=3)",
    "prompt": "How many state transitions occurred in the video?",
    "gtCount": "12",
    "gtTimestamps": "Executable Timestamps: [\"00:01.32\", \"00:03.32\", \"00:05.32\", \"00:07.32\", \"00:09.32\", \"00:11.32\", \"00:13.32\", \"00:15.32\", \"00:17.32\", \"00:19.32\", \"00:21.32\", \"00:23.32\"]",
    "gtTrace": "### Scene Description\nVisual state machine transitions at frequency 0.5 Hz.\n- At 1.32s: Transitioned from State C to State A (count=1)\n- At 3.32s: Transitioned from State A to State C (count=2)\n- At 5.32s: Transitioned from State C to State D (count=3)\n- At 7.32s: Transitioned from State D to State B (count=4)\n- At 9.32s: Transitioned from State B to State D (count=5)\n- At 11.32s: Transitioned from State D to State A (count=6)\n- At 13.32s: Transitioned from State A to State B (count=7)\n- At 15.32s: Transitioned from State B to State A (count=8)\n- At 17.32s: Transitioned from State A to State D (count=9)\n- At 19.32s: Transitioned from State D to State C (count=10)\n- At 21.32s: Transitioned from State C to State A (count=11)\n- At 23.32s: Transitioned from State A to State D (count=12)\n\n### Step 1: Track State Transitions\nTotal state transitions detected: 12.\n\n\\boxed{12}",
    "modelName": "GEMINI 3.6 FLASH PREDICTION",
    "traceF1": "0.0%",
    "precision": "0.0%",
    "recall": "0.0%",
    "predAnswer": "12",
    "predStatus": "correct",
    "modelOutput": "1. Step-by-Step Event Ledger\nThe sequence starts in State C at 00:00 and periodically changes state every two seconds across the timeline, transitioning between States A, B, C, and D for a total of 12 state changes.\n\n2. Final Answer\n\\boxed{12}",
    "justification": "Accidental Correctness (ACR): Gemini predicted the correct final integer (12), but completely failed to generate a step-by-step timestamped event ledger (Trace F1: 0.0%), achieving accidental correctness through high-level estimation without trace verification."
  }
];

  let currentCategory = 'all';
  let filteredIndices = qualitativeExamples.map((_, i) => i);
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
      videoPlayerEl.src = data.videoSrc + '?v=20260802_v30';
      videoPlayerEl.load();
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
