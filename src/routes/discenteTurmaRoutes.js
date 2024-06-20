import { Router } from 'express';
import { insereDiscenteTurma, getDiscenteTurmaById, getAllDiscenteTurmas, updateDiscenteTurmaStatus, removeDiscenteTurma } from '../controllers/discenteTurmaController.js';

const router = Router();

router.post('/discente_turmas', insereDiscenteTurma);
router.get('/discente_turmas/:turma_id/:aluno_id', getDiscenteTurmaById);
router.get('/discente_turmas', getAllDiscenteTurmas);
router.put('/discente_turmas/:turma_id/:aluno_id', updateDiscenteTurmaStatus);
router.delete('/discente_turmas/:turma_id/:aluno_id', removeDiscenteTurma);

export default router;
