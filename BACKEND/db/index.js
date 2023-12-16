const mongoose = require('mongoose');

main().catch(err => console.log(err));
main().then(() => console.log('connected to db'))
async function main() {
  //await mongoose.connect('mongodb://127.0.0.1:27017/flash-app');
  await mongoose.connect('mongodb+srv://sgutierrez49:JblCNpzd94dN6LXq@flash-app.iwmisnx.mongodb.net/');
}
