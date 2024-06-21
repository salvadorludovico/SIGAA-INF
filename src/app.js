import express from 'express';
import router from './routes.js';
import sequelize from './config/database.js';

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

await sequelize.sync();
app.listen(port, function() {
    console.log('Server is running on port 3000');
});