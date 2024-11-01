import * as client from 'prom-client';

// Create a new registry
export const register = new client.Registry();

// Enable the default metrics
client.collectDefaultMetrics({
  register,
  prefix: 'arbitrage_'
});

// Metrics
export const profitabilityGauge = new client.Gauge({
  name: 'arbitrage_profitability',
  help: 'Current profitability percentage between chains',
  registers: [register]
});

export const successfulTradesCounter = new client.Counter({
  name: 'arbitrage_successful_trades_total',
  help: 'Total number of successful arbitrage trades',
  registers: [register]
});

export const failedTradesCounter = new client.Counter({
  name: 'arbitrage_failed_trades_total',
  help: 'Total number of failed arbitrage trades',
  registers: [register]
});

export const gasPrice = new client.Gauge({
  name: 'arbitrage_gas_price',
  help: 'Current gas price in gwei',
  labelNames: ['chain'],
  registers: [register]
});

register.setDefaultLabels({
  app: 'arbitrage_bot'
});