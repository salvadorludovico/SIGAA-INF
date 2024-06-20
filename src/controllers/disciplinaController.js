import Disciplina from '../models/disciplinaModel.js';

// Create a new discipline
export async function createDisciplina(req, res) {
    const { codigo, ementa, ch_teorica, ch_pratica, curso } = req.body;
    try {
        const newDisciplina = await Disciplina.create({ codigo, ementa, ch_teorica, ch_pratica, curso });
        res.status(201).json({
            message: 'Disciplina criada com sucesso',
            data: newDisciplina,
            statusCode: 201
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao criar disciplina',
            error: error.message,
            statusCode: 500
        });
    }
}

// Get a discipline by id
export async function getDisciplinaById(req, res) {
    const { id } = req.params;
    try {
        const disciplina = await Disciplina.findByPk(id);
        if (disciplina) {
            res.json({
                data: disciplina,
                statusCode: 200
            });
        } else {
            res.status(404).json({
                message: 'Disciplina não encontrada',
                statusCode: 404
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao buscar disciplina',
            error: error.message,
            statusCode: 500
        });
    }
}

// Get all disciplines
export async function getAllDisciplinas(req, res) {
    try {
        const disciplinas = await Disciplina.findAll();
        res.json({
            data: disciplinas,
            statusCode: 200
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao buscar disciplinas',
            error: error.message,
            statusCode: 500
        });
    }
}

// Update a discipline by id
export async function updateDisciplina(req, res) {
    const { id } = req.params;
    const { codigo, ementa, ch_teorica, ch_pratica, curso } = req.body;
    try {
        const [updated] = await Disciplina.update({ codigo, ementa, ch_teorica, ch_pratica, curso }, {
            where: { id }
        });
        if (updated) {
            const updatedDisciplina = await Disciplina.findByPk(id);
            res.json({
                message: 'Disciplina atualizada com sucesso',
                data: updatedDisciplina,
                statusCode: 200
            });
        } else {
            res.status(404).json({
                message: 'Disciplina não encontrada',
                statusCode: 404
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao atualizar disciplina',
            error: error.message,
            statusCode: 500
        });
    }
}

// Delete a discipline by id
export async function deleteDisciplina(req, res) {
    const { id } = req.params;
    try {
        const deleted = await Disciplina.destroy({
            where: { id }
        });
        if (deleted) {
            res.json({
                message: 'Disciplina deletada com sucesso',
                statusCode: 200
            });
        } else {
            res.status(404).json({
                message: 'Disciplina não encontrada',
                statusCode: 404
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao deletar disciplina',
            error: error.message,
            statusCode: 500
        });
    }
}
