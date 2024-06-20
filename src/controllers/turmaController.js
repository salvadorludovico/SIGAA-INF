import Turma from '../models/turmaModel.js';

export async function createTurma(req, res) {
    const { 
        disciplina_id, 
        letra, 
        semestre_id, 
        plano_id, 
        docente_responsavel_id, 
        docente_secundario_id, 
        horario, 
        local, 
        max_alunos, 
        chave_acesso 
    } = req.body;
    
    try {
            const newTurma = await Turma.create({ 
            disciplina_id: disciplina_id, 
            letra: letra, 
            semestre_id: semestre_id, 
            plano_id: plano_id ? plano_id : null, 
            docente_responsavel_id: docente_responsavel_id ? docente_responsavel_id : null, 
            docente_secundario_id: docente_secundario_id ? docente_secundario_id : null, 
            horario: horario, 
            local: local ? local : null, 
            max_alunos: max_alunos, 
            chave_acesso: chave_acesso ? chave_acesso : null
        });

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

export async function updateTurma(req, res) { 
    const { id } = req.params;
    const { 
        letra, 
        plano_id, 
        docente_responsavel_id, 
        docente_secundario_id, 
        horario, 
        local, 
        max_alunos, 
        chave_acesso 
    } = req.body;

    const turma = await Turma.findByPk(id);

    if (!turma) {
        return res.status(404).json({
            message: 'Turma não encontrada',
            statusCode: 404
        });
    }
    
    try {
        const [updated] = await Turma.update({ 
            letra: letra,  
            plano_id: plano_id ? plano_id : turma.plano_id, 
            docente_responsavel_id: docente_responsavel_id ? docente_responsavel_id : turma.docente_responsavel_id, 
            docente_secundario_id: docente_secundario_id ? docente_secundario_id : turma.docente_secundario_id, 
            horario: horario ? horario : turma.horario, 
            local: local ? local : turma.local, 
            max_alunos: max_alunos ? max_alunos : turma.max_alunos, 
            chave_acesso: chave_acesso ? chave_acesso : turma.chave_acesso
        }, {
            where: { id }
        });
        if (updated) {
            const updatedTurma = await Turma.findByPk(id);
            res.json({
                message: 'Turma atualizada com sucesso',
                data: updatedTurma,
                statusCode: 200
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

export async function getAllTurmasByUsuario(req, res) {
    const { usuario_id } = req.body; 

    try {
        const turmasDocente = await Turma.findAll({
            where: {
                [Op.or]: [
                    { docente_responsavel: usuario_id },
                    { docente_secundario: usuario_id }
                ]
            }
        });

        const turmasDiscente = await DiscenteTurma.findAll({
            where: { aluno_id: usuario_id },
            include: [{ model: Turma }]
        });

        const turmasDiscenteList = turmasDiscente.map(d => d.Turma);
        const turmas = [...new Set([...turmasDocente, ...turmasDiscenteList])];

        res.json({
            data: turmas,
            statusCode: 200
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao buscar turmas do usuário',
            error: error.message,
            statusCode: 500
        });
    }
}

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
