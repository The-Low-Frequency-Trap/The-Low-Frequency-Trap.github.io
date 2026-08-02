# The Low-Frequency Trap: Video–Language Models Fail at Simple Event Bookkeeping

Official GitHub Pages project landing page for **"The Low-Frequency Trap: Video–Language Models Fail at Simple Event Bookkeeping"**.

🌐 **Project Page**: [https://the-low-frequency-trap.github.io](https://the-low-frequency-trap.github.io)  
💻 **Code Repository**: [The-Low-Frequency-Trap/The-Low-Frequency-Trap](https://github.com/The-Low-Frequency-Trap/The-Low-Frequency-Trap)

---

## 📌 Abstract

Real-world video benchmarks provide broad coverage, but their fixed clips entangle event count, rate, duration, and visual complexity, making failure modes hard to isolate. While existing programmatic benchmarks offer better control, they primarily score only the final answer rather than auditing reported events against executable ground truth.

To bridge this gap, we introduce **trace-grounded parametric profiling** for event counting in three controlled video tasks: bouncing-ball wall contacts, visual blinks, and categorical state transitions. Across **2,190 videos**, we systematically vary event count ($N$) and frequency ($F$) while holding rendering fixed. Each video includes an executable event trace for capability-surface estimation and timestamp-level evaluation.

Our results reveal a staged temporal failure: at an 80% reliability threshold, Gemini 3.6 Flash reliably counts persistent state transitions up to 12 events at 0.5 and 1.0 Hz, yet demonstrates no reliable positive-count region for transient blinking events. In high-count, high-frequency regimes, only **0.2%** of final counts are correct and models recover just **18.1%** of true events. Extra frames inflate final scores without producing faithful event recovery.

---

## 👥 Authors

- **Sarvesh Baskar*** — *University of Maryland, College Park*
- **Zikui Cai*** — *University of Maryland, College Park*
- **Shayan Shabihi*** — *University of Maryland, College Park*
- **Anirudh Satheesh** — *University of Maryland, College Park*
- **Muhammad R. Islam** — *University of Maryland, College Park*
- **Udari Madhushani Sewwog** — *Scale AI*
- **Tom Goldstein** — *University of Maryland, College Park*
- **Furong Huang** — *University of Maryland, College Park*

*\* Equal contribution*

---

## 📁 Repository Structure

```
.
├── index.html        # Main project landing page HTML
├── style.css         # Clean white-theme CSS design system
├── script.js         # Client-side navigation & BibTeX copy logic
├── assets/
│   └── images/       # Main paper figures and diagram assets
├── README.md         # Repository documentation
└── LICENSE           # MIT License
```

---

## 🛠️ Local Development

To run and preview the project page locally:

```bash
# Clone the repository
git clone https://github.com/The-Low-Frequency-Trap/The-Low-Frequency-Trap.github.io.git
cd The-Low-Frequency-Trap.github.io

# Start a local HTTP server
python3 -m http.server 8080
```

Open `http://localhost:8080` in your web browser.

---

## 📄 Citation

If you find our work or the EventLapse benchmark useful in your research, please cite:

```bibtex
@article{baskar2026lowfrequencytrap,
  title={The Low-Frequency Trap: Video--Language Models Fail at Simple Event Bookkeeping},
  author={Baskar, Sarvesh and Cai, Zikui and Shabihi, Shayan and Satheesh, Anirudh and Islam, Muhammad R. and Sewwog, Udari Madhushani and Goldstein, Tom and Huang, Furong},
  journal={arXiv preprint},
  year={2026}
}
```

---

## 📜 License

This repository is licensed under the [MIT License](LICENSE).