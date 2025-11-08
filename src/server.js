const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const port = 8080;

app.use(express.json())

app.use('/api/medicos', require('./medicos/routes'))
app.use('/api/pacientes', require('./pacientes/routes'))
app.use('/api/turnos', require('./turnos/routes'))

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Turnos Api',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
        components: {},
    },
    apis: [
        './src/medicos/routes*.js',
        './src/medicos/models/*.js',
        './src/pacientes/routes.js',
        './src/pacientes/models/*.js',
        './src/turnos/routes.js',
        './src/turnos/models/*.js',
    ],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', (req, res) => {
    res.redirect('/api-docs');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});