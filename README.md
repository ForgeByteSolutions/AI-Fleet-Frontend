# FLEETINTELLECT AI Decision Intelligence – Frontend

This repository contains the **frontend application** for the **AI Fleet Decision Intelligence POC**.
The application provides a modern dashboard interface for visualizing fleet analytics, utilization forecasts, decision simulations, and interacting with the AI Copilot.

The frontend is built using **React + Vite + Tailwind CSS** and communicates with a **FastAPI backend**.

---

# 🚀 Features

* Fleet analytics dashboard
* Utilization forecasting visualization
* Buy vs Reallocate decision simulator
* AI Copilot interface
* Document ingestion interface
* Modern responsive UI with Tailwind CSS
* Real-time data fetched from backend APIs

---

# 🧰 Tech Stack

| Technology    | Purpose                     |
| ------------- | --------------------------- |
| React         | UI framework                |
| Vite          | Fast development build tool |
| Tailwind CSS  | Styling framework           |
| Recharts      | Data visualization          |
| Axios / Fetch | API communication           |
| ESLint        | Code linting                |

---

# 📂 Project Structure

```
frontend
│
├── public                # Static assets
│
├── src
│   ├── components        # Reusable UI components
│   │
│   ├── pages             # Main application pages
│   │   ├── Dashboard.jsx
│   │   ├── Decisions.jsx
│   │   ├── Copilot.jsx
│   │   └── Documents.jsx
│   │
│   │
│   ├── utils             # Utility/helper functions
│   │
│   ├── App.jsx           # Root React component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Tailwind styles
│
├── index.html            # HTML entry file
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── .env                  # Environment variables
```

---

# ⚙️ Prerequisites

Make sure the following are installed on your system:

* **Node.js (v18 or higher recommended)**
* **npm or yarn**


---

# 📦 Installation

Clone the repository:

```
git clone https://github.com/<your-username>/<repo-name>.git
```

Navigate into the project:

```
cd frontend
```

Install dependencies:

```
npm install
```

---

# 🔗 Connecting to Backend

This frontend communicates with the **FastAPI backend**.

Backend default URL:

```
http://localhost:8000
```

Create or update the `.env` file in the root of the frontend project:

```
VITE_API_BASE_URL=http://localhost:8000
```

The frontend will use this environment variable to call backend APIs.

---

# ▶️ Running the Application

Start the development server:

```
npm run dev
```

Vite will start the frontend at:

```
http://localhost:5173
```

---

# 🖥 Backend Setup (Required)

Before running the frontend, start the backend server.

Example FastAPI run command:

```
uvicorn app.main:app --reload
```

Backend will run on:

```
http://localhost:8000
```

# 🛠 Build for Production

To generate a production build:

```
npm run build
```

The build files will be generated in:

```
dist/
```

Preview production build:

```
npm run preview
```

# 📌 Notes

* Ensure the backend server is running before using the frontend.
* Update the `.env` API base URL if the backend runs on another host.

---
