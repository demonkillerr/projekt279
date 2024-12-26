import promBundle from 'express-prom-bundle';
import client from 'prom-client';

const metricsMiddleware = promBundle({
 includePath: true,
 includeStatusCode: true,
 promClient: {
   collectDefaultMetrics: {
     prefix: 'node_'
   }
 }
});

export const uploadDuration = new client.Histogram({
 name: 'upload_duration_seconds',
 help: 'Upload duration in seconds',
 buckets: [0.1, 0.5, 1, 2, 5]
});