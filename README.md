# Energy Tracker

A full-stack application for tracking daily energy levels, sleep, water intake, and brain fog, with built-in ML insights to identify patterns. Mainly done to learn fullstack dev + git.

## What It Does

- Log daily metrics: sleep hours, energy level, water intake, fog level
- View logs on an interactive calendar
- Get ML-powered insights about correlations between your habits
- Predict energy levels based on sleep, water, and fog

## Tech Stack

**Backend**
- FastAPI – REST API
- SQLAlchemy – ORM
- SQLite – database (ready for PostgreSQL)
- Pandas, NumPy, scikit-learn – data analysis and ML

**Frontend**
- React (Vite)
- Tailwind CSS
- Axios – HTTP client
- Lucide Icons

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`. Swagger docs at `http://localhost:8000/docs`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Environment Variables

Create a `.env` file in the backend directory:

```
DATABASE_URL=sqlite:///./energy_tracker.db
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/daily-log` | Submit a daily log entry |
| GET    | `/daily-log` | Get logs (optional `?month=YYYY-MM` filter) |
| GET    | `/insights`  | Get ML insights and correlations |
| GET    | `/ping`      | Health check |

## ML Insights

The `/insights` endpoint computes:
- **Correlations** between sleep, water, energy, and fog
- **Linear regression model** to predict energy from sleep, water, and fog
- **Feature importance** showing which factors affect energy most

With 5+ days of data, the model identifies patterns like:
- More sleep correlates with higher energy
- More water correlates with lower brain fog
- Sleep has the strongest impact on next-day energy

## Project Structure

```
energy-tracker/
├── backend/
│   ├── main.py          # FastAPI app
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   ├── database.py      # DB connection
│   ├── insights.py      # ML analysis
│  
├── frontend/
│   ├── src/
│   │   ├── App.jsx      # Main component
│   │   └── main.jsx     # Entry point
│   ├── index.html
│   └── package.json
└── README.md
```

## What's Next

- [ ] User authentication (Supabase)
- [ ] PostgreSQL migration
- [ ] More ML features (weekly trends, recommendations)
- [ ] Deploy to production

