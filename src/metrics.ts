import client from 'prom-client';
import { Request, Response, NextFunction } from 'express';

// Coleta métricas padrão do processo Node.js (CPU, memória, event loop, etc.)
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Métrica customizada: contador de requisições HTTP por rota, método e status
export const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de requisições HTTP recebidas pela API',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

// Métrica customizada: duração das requisições HTTP (histograma)
export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duração das requisições HTTP em segundos',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5],
  registers: [register],
});

// Middleware que registra as métricas de cada requisição que chega
export function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
  const end = httpRequestDuration.startTimer();

  res.on('finish', () => {
    const route = req.route?.path || req.path;

    httpRequestsTotal.inc({
      method: req.method,
      route,
      status_code: res.statusCode,
    });

    end({
      method: req.method,
      route,
      status_code: res.statusCode,
    });
  });

  next();
}

// Handler do endpoint /metrics, que o Prometheus vai "raspar" (scrape)
export async function metricsHandler(_req: Request, res: Response) {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
}
