import Turma from '../models/turma.js';

// Create a new class
export async function createTurma(req, res) {
    const { disciplina_id, letra, semestre_id, plano_id, docente_responsavel, docente_secundario, horario, local, max_alunos, chave_acesso } = req.body;
    try {
        const newTurma = await Turma.create({ disciplina_id, letra, semestre_id, plano_id, docente_responsavel, docente_secundario, horario, local, max_alunos, chave_acesso });
        res.status(201).json({
            message: 'Turma criada com sucesso',
            data: newTurma,
            statusCode: 201
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao criar turma',
            error: error.message,
            statusCode: 500
        });
    }
}

// Get a class by id
export async function getTurmaById(req, res) {
    const { id } = req.params;
    try {
        const turma = await Turma.findByPk(id);
        if (turma) {
            res.json({
                data: turma,
                statusCode: 200
            });
        } else {
            res.status(404).json({
                message: 'Turma não encontrada',
                statusCode: 404
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao buscar turma',
            error: error.message,
            statusCode: 500
        });
    }
}

// Get all classes
export async function getAllTurmas(req, res) {
    try {
        const turmas = await Turma.findAll();
        res.json({
            data: turmas,
            statusCode: 200
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao buscar turmas',
            error: error.message,
            statusCode: 500
        });
    }
}

// Update a class by id
export async function updateTurma(req, res) {
    const { id } = req.params;
    const { disciplina_id, letra, semestre_id, plano_id, docente_responsavel, docente_secundario, horario, local, max_alunos, chave_acesso } = req.body;
    try {
        const [updated] = await Turma.update({ disciplina_id, letra, semestre_id, plano_id, docente_responsavel, docente_secundario, horario, local, max_alunos, chave_acesso }, {
            where: { id }
        });
        if (updated) {
            const updatedTurma = await Turma.findByPk(id);
            res.json({
                message: 'Turma atualizada com sucesso',
                data: updatedTurma,
                statusCode: 200
            });
        } else {
            res.status(404).json({
                message: 'Turma não encontrada',
                statusCode: 404
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao atualizar turma',
            error: error.message,
            statusCode: 500
        });
    }
}

// Delete a class by id
export async function deleteTurma(req, res) {
    const { id } = req.params;
    try {
        const deleted = await Turma.destroy({
            where: { id }
        });
        if (deleted) {
            res.json({
                message: 'Turma deletada com sucesso',
                statusCode: 200
            });
        } else {
            res.status(404).json({
                message: 'Turma não encontrada',
                statusCode: 404
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao deletar turma',
            error: error.message,
            statusCode: 500
        });
    }
}
