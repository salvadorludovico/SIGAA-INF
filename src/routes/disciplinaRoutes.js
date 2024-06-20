import { Router } from 'express';
import { createDisciplina, getDisciplinaById, getAllDisciplinas, updateDisciplina, deleteDisciplina } from '../controllers/disciplinaController.js';

const router = Router();

router.post('/disciplinas', createDisciplina);
router.get('/disciplinas/:id', getDisciplinaById);
router.get('/disciplinas', getAllDisciplinas);
router.put('/disciplinas/:id', updateDisciplina);
router.delete('/disciplinas/:id', deleteDisciplina);

export default router;
