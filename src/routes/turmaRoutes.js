import { Router } from 'express';
import {
    createTurma,
    getTurmaById,
    getAllTurmas,
    getAllTurmasByUsuario,
    updateTurma,
    deleteTurma
} from '../controllers/turmaController.js';
import { 
    validateHorario,
    validateChaveAcesso,
    validateDocentes,
    validateDisciplina,
    validateMaxAlunos,
    validateSemestre,
    validateLetra
} from '../middlewares/turmaMiddleware.js';

const router = Router();

router.post('/turmas', validateHorario, validateChaveAcesso, validateSemestre, validateLetra, validateMaxAlunos, validateDocentes, validateDisciplina, createTurma);
router.get('/turmas/:id', getTurmaById);
router.get('/turmas', getAllTurmas);
router.put('/turmas/:id', validateHorario, validateChaveAcesso, validateDocentes, updateTurma);
router.delete('/turmas/:id', deleteTurma);

router.get('/turmas/usuario', getAllTurmasByUsuario);

export default router;
