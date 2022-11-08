const express = require('express');
const cors = require('cors');
const app = express();
const port =process.env.PORT || 5000;



// mideleWares 

app.use(cors());
app.use(express.json());


app.get('/', (req, res) =>{
    res.send('panda master server is running')
});

app.listen(port, () =>{
    console.log(`panda master server running on ${port}`)
}) 