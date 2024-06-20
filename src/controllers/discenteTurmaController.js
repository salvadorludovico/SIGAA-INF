import DiscenteTurma from '../models/discenteTurmaModel.js';

export async function insereDiscenteTurma(req, res) {
    const { turma_id, aluno_id, status = "CURSANDO" } = req.body;
    try {
        const newDiscenteTurma = await DiscenteTurma.create({ turma_id, aluno_id, status });
        res.status(201).json({
            message: 'Discente matriculado na turma com sucesso',
            data: newDiscenteTurma,
            statusCode: 201
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao matricular discente na turma',
            error: error.message,
            statusCode: 500
        });
    }
}

export async function getDiscenteTurmaById(req, res) {
    const { turma_id, aluno_id } = req.params;
    try {
        const discenteTurma = await DiscenteTurma.findOne({
            where: { turma_id, aluno_id }
        });
        if (discenteTurma) {
            res.json({
                data: discenteTurma,
                statusCode: 200
            });
        } else {
            res.status(404).json({
                message: 'Matrícula não encontrada',
                statusCode: 404
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao buscar matrícula',
            error: error.message,
            statusCode: 500
        });
    }
}

export async function getAllDiscenteTurmas(req, res) {
    try {
        const discenteTurmas = await DiscenteTurma.findAll();
        res.json({
            data: discenteTurmas,
            statusCode: 200
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao buscar matrículas',
            error: error.message,
            statusCode: 500
        });
    }
}

export async function updateDiscenteTurmaStatus(req, res) {
    const { turma_id, aluno_id } = req.params;
    const { status } = req.body;
    try {
        const [updated] = await DiscenteTurma.update({ status }, {
            where: { turma_id, aluno_id }
        });
        if (updated) {
            const updatedDiscenteTurma = await DiscenteTurma.findOne({
                where: { turma_id, aluno_id }
            });
            res.json({
                message: 'Status atualizado com sucesso',
                data: updatedDiscenteTurma,
                statusCode: 200
            });
        } else {
            res.status(404).json({
                message: 'Matrícula não encontrada',
                statusCode: 404
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao atualizar status',
            error: error.message,
            statusCode: 500
        });
    }
}

export async function removeDiscenteTurma(req, res) {
    const { turma_id, aluno_id } = req.params;
    try {
        const deleted = await DiscenteTurma.destroy({
            where: { turma_id, aluno_id }
        });
        if (deleted) {
            res.json({
                message: 'Matrícula deletada com sucesso',
                statusCode: 200
            });
        } else {
            res.status(404).json({
                message: 'Matrícula não encontrada',
                statusCode: 404
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao deletar matrícula',
            error: error.message,
            statusCode: 500
        });
    }
}
