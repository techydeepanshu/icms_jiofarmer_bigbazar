const fs = require('fs');

// PRIVATE and PUBLIC key
const privateKEY  = fs.readFileSync('./private.key', 'utf8');
const publicKEY  = fs.readFileSync('./public.key', 'utf8');


module.exports = {
    privateKEY,
    publicKEY,
}
