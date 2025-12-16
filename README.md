# Et.Cetera - Household Management App

[![Project Repository](https://img.shields.io/badge/repo-gabriribeira/etc-181717?style=flat-square&logo=github)](https://github.com/gabriribeira/etc)

**Et.Cetera** is a collaborative group project (CBL) for the Masters of Communication and Web Technologies at the University of Aveiro. It is a modern web application designed to streamline household management, helping individuals and families organize chores, tasks, and shared responsibilities in an intuitive, efficient manner.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## About

Et.Cetera helps households manage daily life—track chores, assign tasks, and facilitate communication among members. Built as part of an academic program, it leverages modern JavaScript frameworks for fast, responsive, and scalable user experiences.

---

## Features

- **Chore Tracking:** Assign and schedule household chores.
- **Task Management:** Create, update, and monitor tasks for all members.
- **User Collaboration:** Multiple user support for shared living spaces.
- **Progressive Web App (PWA):** Installable and works offline.
- **Customizable Notifications:** Keep all members in the loop.

---

## Tech Stack

- **Frontend:** React (bootstrapped with Create React App)
- **Styling:** Tailwind CSS
- **State Management & Routing:** [Check `src/` for details]
- **Tooling:** ESLint, Prettier
- **Other:** Workbox for PWA, JavaScript (98.8%)

---

## Project Structure

```
etc/
├── .github/              # GitHub configuration and workflows
├── public/               # Static assets (HTML, images, etc.)
├── src/                  # Main application source code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level components/routes
│   ├── utils/            # Utility functions
│   └── ...               # App logic, state, styles, etc.
├── .eslintrc.js          # Linting configuration
├── .gitignore
├── package.json          # App dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── workbox-config.js     # PWA / service worker config
└── README.md
```

*For a full listing, browse the [repository files](https://github.com/gabriribeira/etc). Some directories or files may not be shown above due to listing limitations.*

---

## Getting Started

This project uses [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Node.js (v16 or later recommended)
- npm

### Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/gabriribeira/etc.git
   cd etc
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm start
   ```
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## Scripts

- `npm start` – Runs the app in development mode.
- `npm test` – Launches the test runner.
- `npm run build` – Builds the app for production.
- `npm run eject` – Ejects the Create React App setup (not reversible).

For advanced usage and troubleshooting, see the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

---

## Contributing

Contributions, feedback, and suggestions are welcome! Please open an issue or submit a pull request to help improve Et.Cetera.

---

## License

This project does not currently specify a license. Contact the repository owner for more information.

---

> *CBL Group Project in Masters of Communication and Web Technologies, University of Aveiro.*
