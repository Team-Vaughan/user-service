const app = require('./app1.js');
const PORT = 5007;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});