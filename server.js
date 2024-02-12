//// Import all Modules 
import express from 'express';
import swagger from 'swagger-ui-express';
import swaggerjson from './swagger.json' assert {type: 'json'};
import { errorHandlerMiddleware } from './src/errorHandler/errorHandler.js';


const app = express()
const port = process.env.PORT || 8000;




//// Swagger Middleware for Documentation

app.use('/apidoc', swagger.serve, swagger.setup(swaggerjson));



// $ Default Route
app.get('/', (req, res) => res.send('Hello World!'))

//? Error Handler and Logger Middleware setup

app.use(errorHandlerMiddleware);

// $ 404 Error Page Not Found
app.use((req, res) => {
    return res.status(404).json({ message: "Page not found or Invalid url request, for more visit - http://localhost:8000/apidoc" });
})

app.listen(port, (err) => {
    if (err) {
        console.log(`Error listening on port  + ${port}`);
    } else {
        console.log(`Postaway app listening on port ${port}!`)
    }
})