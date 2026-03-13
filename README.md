# 🌐 Zakaryae Rouane — Personal Portfolio

A modern, responsive personal portfolio website built with **React** and **Tailwind CSS**, featuring dark/light mode, animated UI elements, a contact form, and a CV viewer.

---

## 🚀 Features

- 🌗 **Dark / Light Mode** — Persisted via `localStorage`
- ✍️ **Typewriter Animation** — Cycling text effect on the hero section
- 📊 **Animated Stats** — Count-up numbers using a custom `CountUp` component
- 🗂️ **Projects Section** — Load more / show less project cards with hover overlays
- 📄 **CV Modal** — View and download resume as PDF
- 📬 **Contact Form** — Powered by [Formspree](https://formspree.io/)
- 🔗 **Social Links** — Dynamic social media buttons
- 💡 **"What I Do" Section** — Skill category cards with icons
- 🎓 **Education & Experience** — Timeline-style cards
- 🌀 **Animated Background** — Floating particles and gradient blobs

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Framework  | React (with Hooks)                  |
| Styling    | Tailwind CSS                        |
| Icons      | Lucide React, React Icons           |
| Forms      | Formspree (`@formspree/react`)      |
| Animation  | CSS keyframes + Tailwind utilities  |

---

## 📁 Project Structure

```
src/
├── components/
│   └── CountUp.jsx          # Animated number counter
├── data/
│   └── myinfo.jsx           # Projects, skills, socials, stats, jobs, education, WhatIDo
├── pages/
│   └── Portfolio.jsx        # Main portfolio component
public/
├── images/                  # Profile photo, icons
└── pdf/                     # CV/Resume PDF files
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js `>= 16`
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/your-portfolio.git

# 2. Navigate into the project
cd your-portfolio

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

---

## 📋 Data Configuration

All personal content is managed in `src/data/myinfo.jsx`. Update the following exports to customize the portfolio:

| Export       | Description                          |
|--------------|--------------------------------------|
| `projects`   | Project cards (name, image, stack…)  |
| `skills`     | Tech skills with icons and colors    |
| `socials`    | Social media links and icons         |
| `stats`      | Numeric stats (projects, experience…)|
| `jobs`       | Work experience entries              |
| `Educations` | Education history                    |
| `WhatIDo`    | Service/capability cards             |

---

## 📬 Contact Form Setup

The form uses [Formspree](https://formspree.io/). To connect your own endpoint:

1. Create a free account at [formspree.io](https://formspree.io/)
2. Create a new form and copy your form ID
3. Replace `"xblnoqrz"` in `Portfolio.jsx`:

```jsx
const [formState, handleSubmit] = useForm("YOUR_FORM_ID");
```

---

## 📄 CV / Resume

Place your PDF files in the `public/pdf/` directory:

```
public/
└── pdf/
    ├── zakaryaerouane(eng).pdf      # Displayed in the iframe viewer
    └── ZakaryaeRouaneCV(eng).pdf    # Downloaded on button click
```

---

## 🌍 Deployment

This project works with any static hosting platform:

```bash
# Build for production
npm run build
```

Then deploy the `dist/` (or `build/`) folder to:
- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)
- [GitHub Pages](https://pages.github.com/)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by <strong>Zakaryae Rouane</strong></p>