const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/flashcards');
const { sequelize } = require('./models');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/', routes);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});