const ExcelJS = require('exceljs');
const { writeFileSync } = require('fs');
const path = require('path');

const xlsxPath = path.join(__dirname, '../public/data/brother-info.xlsx');
const jsonPath = path.join(__dirname, '../public/data/brother-info.json');

async function main() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(xlsxPath);
  const worksheet = workbook.worksheets[0];

  const allRows = [];
  worksheet.eachRow((row) => allRows.push(row.values.slice(1))); // slice(1): row.values is 1-indexed

  const [headers, ...dataRows] = allRows;
  const raw = dataRows.map((cols) =>
    Object.fromEntries(headers.map((h, i) => [h, cols[i] ?? '']))
  );

  const processed = raw.map((item) => ({
    name: item['Name'] ?? '',
    grad: item['Class'] ?? '',
    positions: item['Position(s)']
      ? String(item['Position(s)']).split(',').map((p) => p.trim())
      : [],
    gradDate: item['Grad Year'] ? String(item['Grad Year']) : 'TBD',
    committee: item['Committee'] ? String(item['Committee']).trim() : '',
  }));

  writeFileSync(jsonPath, JSON.stringify(processed, null, 2));
  console.log(
    `convert-members: wrote ${processed.length} members → brother-info.json`
  );
}

main().catch((err) => {
  console.error('convert-members failed:', err.message);
  process.exit(1);
});
