const { Parser } = require('json2csv');

const downloadResource = (res, fileName, fields, data) => {
  const parser = new Parser({ fields });
  const csv = parser.parse(data);

  res.header('Content-Type', 'text/csv');
  res.header('Content-Disposition', `attachment; filename="${fileName}"`);
  res.attachment(fileName);
  return res.send(csv)
}

module.exports = downloadResource;