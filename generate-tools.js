/**
 * generate-tools.js
 * 
 * Place ce fichier à la RACINE de ton projet (D:\tools-hub\)
 * Lance avec : node generate-tools.js
 * 
 * Il scanne tous les dossiers tools/<categorie>/<outil>/manifest.json
 * et régénère tools.json automatiquement.
 */

const fs   = require('fs');
const path = require('path');

const TOOLS_DIR  = path.join(__dirname, 'tools');
const OUTPUT     = path.join(__dirname, 'tools.json');

const result = {
  categories: {},
  tools: {}
};

// Lire toutes les catégories
const categories = fs.readdirSync(TOOLS_DIR).filter(f => {
  return fs.statSync(path.join(TOOLS_DIR, f)).isDirectory();
});

categories.forEach(cat => {
  const catPath = path.join(TOOLS_DIR, cat);
  const toolDirs = fs.readdirSync(catPath).filter(f => {
    const full = path.join(catPath, f);
    return fs.statSync(full).isDirectory() && f !== '.gitkeep';
  });

  const tools = [];

  toolDirs.forEach(slug => {
    const manifestPath = path.join(catPath, slug, 'manifest.json');
    if (!fs.existsSync(manifestPath)) return;

    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      tools.push({
        slug,
        name:        manifest.name        || slug,
        short_name:  manifest.short_name  || slug,
        description: manifest.description || '',
        theme_color: manifest.theme_color || '#080c12',
        lang:        manifest.lang        || 'en'
      });
    } catch (e) {
      console.warn(`⚠️  manifest.json invalide : tools/${cat}/${slug}/manifest.json`);
    }
  });

  result.categories[cat] = tools.length;
  if (tools.length > 0) {
    result.tools[cat] = tools;
  }
});

fs.writeFileSync(OUTPUT, JSON.stringify(result, null, 2), 'utf8');

// Résumé dans le terminal
const total = Object.values(result.categories).reduce((a, b) => a + b, 0);
console.log('\n✅ tools.json généré avec succès !\n');
console.log('📦 Catégories :');
Object.entries(result.categories).forEach(([cat, count]) => {
  if (count > 0) console.log(`   ✓ ${cat.padEnd(15)} ${count} outil${count > 1 ? 's' : ''}`);
  else           console.log(`   · ${cat.padEnd(15)} (vide)`);
});
console.log(`\n🔢 Total : ${total} outil${total > 1 ? 's' : ''}\n`);
