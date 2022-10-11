const express = require('express')
const {connectToMongoDB} =  require('./db')

const PORT = 7000;
const app = express();

connectToMongoDB()

app.get('/', (req,res)=>{
    res.send('App is up and running')
})

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})