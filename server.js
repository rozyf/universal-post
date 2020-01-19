const express = require('express')
const app = express()

app.use(express.json())

const MongoClient = require("mongodb").MongoClient;
const mongoURI = 'mongodb+srv://rozy:rozy@universal-post-n0zee.mongodb.net/test?retryWrites=true&w=majority'
const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let conn;
const db = {
  connect() {
    return new Promise((resolve, reject) => {
      client.connect(err => {
        if (err) return reject(err);
        console.log("DB connected");

        conn = client.db("tes");
        resolve(conn);
      });
    });
  },
  getDB() {
    return conn;
  }
};
db.connect()




const model = data => {
  return new Promise((resolve, reject) => {
    result = db.getDB()
      .collection("post")
      .insertOne(data);
    resolve(result);
  });
}

app.get('/', (req, res) => {
  return res.send('<h1 style="color:red">Success</h1>')
})

app.post('/', (req, res) => {
  const data = req.body
  model(data).then(result => {
    res.status(200).json(result.ops[0])
  }).catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})
app.listen(5000, () => console.log('server running on port 5000'))