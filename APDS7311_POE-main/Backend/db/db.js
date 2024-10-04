const {MongoClient} = require('mongodb')
const dotenv = require('dotenv')
dotenv.config();

const connstring = process.env.ATLAS_URI 
const client = new MongoClient(connstring,  { serverSelectionTimeoutMS: 5000 })

//let conn 

async function connect(){ 
try{
    //conn = await client.connect()
     await client.connect()
    console.log('MongoDB connected successfully')

}
catch(e){
    console.error(e)
} 
}

//export default db; 

function getDb(users) {
    return client.db(users);
}


module.exports = {connect,client,getDb}