import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import fs from 'fs';
import path from 'path';

const port = parseInt(process.env.PORT || '3000', 10);
const hostname = '0.0.0.0';

// Check if all required production build manifests exist; if any are missing, fallback to dev mode
const hasBuild =
  fs.existsSync(path.join(process.cwd(), '.next', 'routes-manifest.json')) &&
  fs.existsSync(path.join(process.cwd(), '.next', 'build-manifest.json'));

const dev = process.env.NODE_ENV !== 'production' || !hasBuild;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url!, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error occurred handling', req.url, err);
        res.statusCode = 500;
        res.end('internal server error');
      }
    })
      .once('error', (err) => {
        console.error('Server error:', err);
        process.exit(1);
      })
      .listen(port, () => {
        console.log(`> Server ready on http://${hostname}:${port} (mode: ${dev ? 'development' : 'production'})`);
      });
  })
  .catch((err) => {
    console.error('Next.js preparation error:', err);
    process.exit(1);
  });
