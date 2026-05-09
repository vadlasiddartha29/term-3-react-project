require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const nutritionRoutes = require('./routes/nutrition');
const imageRoutes = require('./routes/image');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Security & Middleware ────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/image', imageRoutes);

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── 404 handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Global error handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`✅ Nutrition Finder server running on http://localhost:${PORT}`);
});
