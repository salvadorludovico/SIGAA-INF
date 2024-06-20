import { Router } from 'express';
import { insereDiscenteTurma, getDiscenteTurmaById, getAllDiscenteTurmas, updateDiscenteTurmaStatus, removeDiscenteTurma, ingressoTurma } from '../controllers/discenteTurmaController.js';
import { isChaveAcessoValid } from '../helpers/turmaHelper.js';
import { isDiscenteinTurma } from '../middlewares/turmaDiscenteMiddleware.js';

const router = Router();

router.post('/discente_turmas', insereDiscenteTurma);
router.get('/discente_turmas/:turma_id/:discente_id', getDiscenteTurmaById);
router.get('/discente_turmas', getAllDiscenteTurmas);
router.put('/discente_turmas/:turma_id/:discente_id', updateDiscenteTurmaStatus);
router.delete('/discente_turmas/:turma_id/:discente_id', removeDiscenteTurma);

router.post('/ingresso_turma', isChaveAcessoValid, isDiscenteinTurma, ingressoTurma);

export default router;
