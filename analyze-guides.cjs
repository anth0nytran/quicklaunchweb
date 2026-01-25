const fs = require('fs');
const content = fs.readFileSync('./lib/guides.ts', 'utf8');

// Extract guide data manually
const guides = [
    { slug: 'subscription-web-design', type: 'pillar', start: 88, end: 380 },
    { slug: 'done-for-you-websites', type: 'pillar', start: 381, end: 660 },
    { slug: 'website-in-48-hours', type: 'pillar', start: 661, end: 930 },
    { slug: 'monthly-website-plan-whats-included', type: 'support', start: 931, end: 1100 },
    { slug: 'pay-monthly-web-design-vs-upfront', type: 'support', start: 1101, end: 1240 },
    { slug: 'wix-vs-hiring-someone-to-build-website', type: 'support', start: 1241, end: 1400 },
    { slug: 'what-pages-business-website-needs-to-convert', type: 'support', start: 1401, end: 1550 },
    { slug: 'can-a-website-really-be-built-in-48-hours', type: 'support', start: 1551, end: 1700 },
    { slug: 'launch-website-fast-checklist', type: 'support', start: 1701, end: 1850 },
];

const lines = content.split('\n');

console.log('=== GUIDE SEO AUDIT ===\n');
console.log('Requirements:');
console.log('  PILLAR: min 10,000 chars (~1,600 words)');
console.log('  SUPPORT: min 6,500 chars (~1,100 words)\n');

guides.forEach(g => {
    const guideLines = lines.slice(g.start - 1, g.end);
    const guideText = guideLines.join('\n');

    // Extract readable text (remove code syntax)
    const textOnly = guideText
        .replace(/[{}\[\],:]/g, ' ')
        .replace(/"([^"]+)"/g, '$1')
        .replace(/\s+/g, ' ')
        .trim();

    const charCount = textOnly.length;
    const wordCount = textOnly.split(' ').filter(w => w.length > 0).length;

    // Count sections
    const sectionMatches = guideText.match(/kind:/g) || [];
    const sectionCount = sectionMatches.length;

    // Check for table/checklist
    const hasTable = guideText.includes('"table"');
    const hasChecklist = guideText.includes('"checklist"');

    // Check for FAQ
    const hasFAQ = guideText.includes('"faq"');

    // Check for internal links
    const linkMatches = guideText.match(/href: "\/guides/g) || [];
    const internalLinks = linkMatches.length;

    const minChars = g.type === 'pillar' ? 10000 : 6500;
    const status = charCount >= minChars ? '✅' : '❌';

    console.log(`${status} ${g.slug}`);
    console.log(`   Type: ${g.type.toUpperCase()}`);
    console.log(`   Chars: ${charCount} (min: ${minChars}) ${charCount < minChars ? '⚠️ NEEDS +' + (minChars - charCount) + ' chars' : ''}`);
    console.log(`   Words: ~${wordCount}`);
    console.log(`   Sections: ${sectionCount} ${sectionCount >= 5 ? '✓' : '⚠️ need 5-8'}`);
    console.log(`   Table/Checklist: ${hasTable || hasChecklist ? '✓' : '⚠️ missing'}`);
    console.log(`   FAQ: ${hasFAQ ? '✓' : '⚠️ missing'}`);
    console.log(`   Internal Links: ${internalLinks} ${internalLinks >= 2 ? '✓' : '⚠️ need 2-4'}`);
    console.log('');
});
