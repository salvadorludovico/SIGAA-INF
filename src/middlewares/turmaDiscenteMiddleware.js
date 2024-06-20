import DiscenteTurma from '../models/discenteTurmaModel.js';

export async function isDiscenteinTurma() {
    const { turma_id, discente_id } = req.body;
    const discenteExistente = await DiscenteTurma.findOne({ where: { turma_id, discente_id } });
    if (discenteExistente) {
        return res.status(400).json({
            message: 'Você já está matriculado nesta turma',
            statusCode: 400
        });
    }
    next();
}