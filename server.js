import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const COMMIT_SHA = process.env.COMMIT_SHA || process.env.GITHUB_SHA || 'development-build';
const startTime = Date.now();

let requestCount = 0;
let healthCheckCount = 0;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  requestCount++;
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // Health check endpoint (Required by Milestone M6 and README)
  if (pathname === '/health') {
    healthCheckCount++;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      commit: COMMIT_SHA,
      uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // Prometheus metrics endpoint (Required by Milestone M6)
  if (pathname === '/metrics') {
    const memoryUsage = process.memoryUsage();
    const uptime = (Date.now() - startTime) / 1000;
    const metrics = [
      '# HELP http_requests_total Total number of HTTP requests made.',
      '# TYPE http_requests_total counter',
      `http_requests_total ${requestCount}`,
      '# HELP http_health_checks_total Total number of health check requests.',
      '# TYPE http_health_checks_total counter',
      `http_health_checks_total ${healthCheckCount}`,
      '# HELP process_uptime_seconds The uptime of the process in seconds.',
      '# TYPE process_uptime_seconds gauge',
      `process_uptime_seconds ${uptime}`,
      '# HELP process_resident_memory_bytes Resident memory size in bytes.',
      '# TYPE process_resident_memory_bytes gauge',
      `process_resident_memory_bytes ${memoryUsage.rss}`,
      '# HELP process_heap_used_bytes Process heap memory used in bytes.',
      '# TYPE process_heap_used_bytes gauge',
      `process_heap_used_bytes ${memoryUsage.heapUsed}`
    ].join('\n') + '\n';

    res.writeHead(200, { 'Content-Type': 'text/plain; version=0.0.4; charset=utf-8' });
    res.end(metrics);
    return;
  }

  // Static files server for production Vite build
  const distDir = path.join(__dirname, 'dist');
  let filePath = path.join(distDir, pathname === '/' ? 'index.html' : pathname);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distDir, 'index.html');
  }

  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // Fallback if dist has not been built yet
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html><html><body><h1>E-Commerce Store</h1><p>Commit: ${COMMIT_SHA}</p><p><a href="/health">/health</a> | <a href="/metrics">/metrics</a></p></body></html>`);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT} (commit: ${COMMIT_SHA})`);
});
