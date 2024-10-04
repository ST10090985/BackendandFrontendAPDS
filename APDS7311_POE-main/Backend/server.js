
const PORT = 3000; 
// const http = require('https');
// const fs = require('fs'); 
const app = require('./Index');
const { connect } = require('./db/db.js');

const now = new Date();
const current = now.toLocaleString();

// const server = http.createServer({
//     key: fs.readFileSync('Keys/private.pem'),
//     cert: fs.readFileSync('Keys/certificate.pem')
// }, app);

//Front end json start :  

connect();

// server.listen(PORT, () => {
//     console.log(`Server started on Port: ${PORT} @ ${current}`);
// });