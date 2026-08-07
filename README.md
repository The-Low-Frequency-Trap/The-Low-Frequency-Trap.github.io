<div align="center">

# The Low-Frequency Trap: Video–Language Models Fail at Simple Event Bookkeeping

**Official Project Landing Page of The Low-Frequency Trap**

[Sarvesh Baskar](https://sarvesh-369.github.io/)*<sup>1</sup>, [Zikui Cai](https://zikuicai.github.io/)*<sup>1</sup>, [Shayan Shabihi](https://shayanshabihi.github.io/)*<sup>1</sup>, [Anirudh Satheesh](https://anirudhsatheesh.github.io/)<sup>1</sup>,  
[Muhammad R. Islam](https://mrislam.github.io/)<sup>1</sup>, [Udari Madhushani Sewwog](https://udarim.github.io/)<sup>2</sup>, [Tom Goldstein](https://www.cs.umd.edu/~tomg/)<sup>1</sup>, [Furong Huang](https://furong-huang.com/)<sup>1</sup>

<sup>1</sup>*University of Maryland, College Park* &nbsp;&nbsp;|&nbsp;&nbsp; <sup>2</sup>*Scale AI*  
*\* Equal contribution*

<br>

[![Project Page](https://img.shields.io/badge/project-page-38BDF8?style=for-the-badge&logo=googlechrome&logoColor=white)](https://low-frequency-trap.github.io)
[![arXiv Paper](https://img.shields.io/badge/arxiv-paper-B31B1B?style=for-the-badge&logo=arxiv&logoColor=white)](https://arxiv.org/abs/2608.06361)
[![Dataset](https://img.shields.io/badge/%F0%9F%A4%97%20dataset-HuggingFace-FFD21E?style=for-the-badge)](https://huggingface.co/datasets/Sarvesh-369/Low-Frequency-Trap)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

<br>

**[Website](https://low-frequency-trap.github.io) &nbsp;•&nbsp; [Code Repository](https://github.com/Low-Frequency-Trap/The-Low-Frequency-Trap) &nbsp;•&nbsp; [Citation](#-citation)**

<br>

<img src="assets/images/hero_teaser.png" width="92%" alt="The Low-Frequency Trap Teaser">

</div>

<br>

> **The Low-Frequency Trap** evaluates Video-Language Models (VLMs) on event bookkeeping by controlling event count ($N$) and frequency ($F$). Rather than scoring final answers alone, our benchmark audits timestamped model traces against executable ground truth.

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
git clone https://github.com/Low-Frequency-Trap/Low-Frequency-Trap.github.io.git
cd Low-Frequency-Trap.github.io

# Start a local HTTP server
python3 -m http.server 8080
```

Open `http://localhost:8080` in your web browser.

---

## 📄 Citation

If you find our work useful in your research, please cite:

```bibtex
@misc{baskar2026lowfrequencytrapvideo,
      title={The Low Frequency Trap: Video Language Models Fail at Simple Event Bookkeeping}, 
      author={Sarvesh Baskar and Zikui Cai and Shayan Shabihi and Anirudh Satheesh and Muhammad R. Islam and Udari Madhushani Sehwag and Tom Goldstein and Furong Huang},
      year={2026},
      eprint={2608.06361},
      archivePrefix={arXiv},
      primaryClass={cs.AI},
      url={https://arxiv.org/abs/2608.06361}, 
}
```

---

## 📜 License

This repository is licensed under the [MIT License](LICENSE).