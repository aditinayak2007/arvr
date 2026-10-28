import fs from 'fs';
import path from 'path';

function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.js') || p.endsWith('.jsx')) {
      const c = fs.readFileSync(p, 'utf8');
      if (c.includes('createProceduralCar') || c.includes('loadRealisticCarModel') || c.includes('GLTFLoader') || c.includes('model-viewer')) {
        console.log(p);
      }
    }
  }
}

walk('src');
