const express = require('express')

const PORT = 7000;
const app = express();


app.get('/', (req,res)=>{
    res.send('App is up and running')
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})