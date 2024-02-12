//// Import all Modules 
import express from 'express';
import swagger from 'swagger-ui-express';
import swaggerjson from './swagger.json' assert {type: 'json'};


const app = express()
const port = process.env.PORT || 8000;




//// Swagger Middleware for Documentation

app.use('/api/doc', swagger.serve, swagger.setup(swaggerjson));

// $ Default Route
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, (err) => {
    if (err) {
        console.log(`Error listening on port  + ${port}`);
    } else {
        console.log(`Postaway app listening on port ${port}!`)
    }
})