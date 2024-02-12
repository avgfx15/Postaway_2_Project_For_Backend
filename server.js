//// Import all Modules 
import express from 'express';


const app = express()
const port = process.env.PORT || 8000;


// $ Default Route
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Postaway app listening on port ${port}!`))