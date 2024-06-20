import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';
import disciplinaRoutes from './routes/disciplinaRoutes.js';
import turmaRoutes from './routes/turmaRoutes.js';
import discenteTurmaRoutes from './routes/discenteTurmaRoutes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'API online!',
        statusCode: 200
    });
});

app.use('/api', usuarioRoutes);
app.use('/api', disciplinaRoutes);
app.use('/api', turmaRoutes);
app.use('/api', discenteTurmaRoutes);

export default app;
