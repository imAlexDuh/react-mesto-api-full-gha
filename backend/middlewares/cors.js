const allowedCors = [
  'http://imalexduh.students.nomoredomainsmonster.ru/',
  'https://imalexduh.students.nomoredomainsmonster.ru/',
  'http://api.imalexduh.students.nomoredomainsmonster.ru/',
  'https://api.imalexduh.students.nomoredomainsmonster.ru/',
  'http://51.250.75.169',
  'https://51.250.75.169',
  'http://localhost:3000',
  'http://localhost:3001',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
