const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  const entries = fs.readdirSync(from, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(from, entry.name);
    const destPath = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  const rootDir = process.cwd();
  const nextDir = path.join(rootDir, '.next');
  const standaloneDir = path.join(nextDir, 'standalone');
  const staticDir = path.join(nextDir, 'static');
  const publicDir = path.join(rootDir, 'public');

  if (fs.existsSync(standaloneDir)) {
    if (fs.existsSync(publicDir)) {
      copyFolderSync(publicDir, path.join(standaloneDir, 'public'));
    }
    if (fs.existsSync(staticDir)) {
      copyFolderSync(staticDir, path.join(standaloneDir, '.next', 'static'));
    }
    console.log('> Postbuild: Prepared standalone directory assets');
  }
} catch (err) {
  console.warn('> Postbuild warning:', err.message);
}
