import express from 'express';
import { routes } from './routes/index.routes';
import { metricsMiddleware, metricsHandler } from './metrics';

const app = express();

app.use(express.json());
app.use(metricsMiddleware); // registra métricas de todas as requisições

app.get('/metrics', metricsHandler); // endpoint que o Prometheus vai consultar

app.use(routes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
