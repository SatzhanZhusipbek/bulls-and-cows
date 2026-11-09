import { cpSync, mkdirSync, rmSync } from 'node:fs';

const output = 'pages-build';

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

cpSync('index.html', `${output}/index.html`);
cpSync('style.css', `${output}/style.css`);
cpSync('dist', `${output}/dist`, { recursive: true });
