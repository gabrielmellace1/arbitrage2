import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Mock data for initial testing
let isArbitrageEnabled = false;
let lastPrices = {
  ethereum: 2000.50,
  blast: 2005.25,
  difference: 0.24,
  timestamp: Date.now()
};

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API endpoints
app.get('/api/prices', (req, res) => {
  lastPrices.timestamp = Date.now();
  res.json(lastPrices);
});

app.get('/api/status', (req, res) => {
  res.json({ isEnabled: isArbitrageEnabled });
});

app.post('/api/toggle', (req, res) => {
  isArbitrageEnabled = !isArbitrageEnabled;
  console.log(`Arbitrage bot ${isArbitrageEnabled ? 'enabled' : 'disabled'}`);
  res.json({ isEnabled: isArbitrageEnabled });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});