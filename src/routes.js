import { Router } from "express";
// import { insertPessoa, updatePessoa, deletePessoa, getPessoas, getPessoaById } from './controllers/pessoa.js';
import { createUsuario, getUsuarioById, getAllUsuarios, updateUsuario, deleteUsuario } from './controllers/usuarioController.js';
import { createDisciplina, getDisciplinaById, getAllDisciplinas, updateDisciplina, deleteDisciplina } from './controllers/disciplinaController.js';
import { createTurma, getTurmaById, getAllTurmas, updateTurma, deleteTurma } from './controllers/turmaController.js';
import { insereDiscenteTurma, getDiscenteTurmaById, getAllDiscenteTurmas, updateDiscenteTurmaStatus, removeDiscenteTurma } from './controllers/discenteTurmaController.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: 'API online!',
        statusCode: 200
    });
});

// router.get('/pessoas', getPessoas);
// router.get('/pessoa/:id', getPessoaById);
// router.post('/pessoa/insert', insertPessoa);
// router.put('/pessoa/:id', updatePessoa);
// router.delete('/pessoa/:id', deletePessoa);

router.post('/usuarios', createUsuario);
router.get('/usuarios/:id', getUsuarioById);
router.get('/usuarios', getAllUsuarios);
router.put('/usuarios/:id', updateUsuario);
router.delete('/usuarios/:id', deleteUsuario);

router.post('/disciplinas', createDisciplina);
router.get('/disciplinas/:id', getDisciplinaById);
router.get('/disciplinas', getAllDisciplinas);
router.put('/disciplinas/:id', updateDisciplina);
router.delete('/disciplinas/:id', deleteDisciplina);

router.post('/turmas', createTurma);
router.get('/turmas/:id', getTurmaById);
router.get('/turmas', getAllTurmas);
router.put('/turmas/:id', updateTurma);
router.delete('/turmas/:id', deleteTurma);

router.post('/discente_turmas', insereDiscenteTurma);
router.get('/discente_turmas/:turma_id/:aluno_id', getDiscenteTurmaById);
router.get('/discente_turmas', getAllDiscenteTurmas);
router.put('/discente_turmas/:turma_id/:aluno_id', updateDiscenteTurmaStatus);
router.delete('/discente_turmas/:turma_id/:aluno_id', removeDiscenteTurma);

export default router;