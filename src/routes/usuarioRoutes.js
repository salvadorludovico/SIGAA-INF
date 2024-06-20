import { Router } from 'express';
import { createUsuario, getUsuarioById, getAllUsuarios, updateUsuario, deleteUsuario } from '../controllers/usuarioController.js';

const router = Router();

router.post('/usuarios', createUsuario);
router.get('/usuarios/:id', getUsuarioById);
router.get('/usuarios', getAllUsuarios);
router.put('/usuarios/:id', updateUsuario);
router.delete('/usuarios/:id', deleteUsuario);

export default router;
