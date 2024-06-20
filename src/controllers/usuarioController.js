import Usuario from '../models/usuarioModel.js'

export async function createUsuario(req, res) {
    const { 
        nome, 
        nascimento, 
        email, 
        senha, 
        curso, 
        docente, 
        coordena_curso,
        vice_diretor,
        status
    } = req.body;
    
    try {
        const newUsuario = await Usuario.create({ nome, nascimento, email, senha, curso, docente, coordena_curso, vice_diretor, status });
        res.status(201).json({
            message: 'Usuário criado com sucesso',
            data: newUsuario,
            statusCode: 201
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao criar usuário',
            error: error.message,
            statusCode: 500
        });
    }
}

export async function getUsuarioById(req, res) {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            res.json({
                data: usuario,
                statusCode: 200
            });
        } else {
            res.status(404).json({
                message: 'Usuário não encontrado',
                statusCode: 404
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao buscar usuário',
            error: error.message,
            statusCode: 500
        });
    }
}

export async function getAllUsuarios(req, res) {
    try {
        const usuarios = await Usuario.findAll();
        res.json({
            data: usuarios,
            statusCode: 200
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao buscar usuários',
            error: error.message,
            statusCode: 500
        });
    }
}

export async function updateUsuario(req, res) {
    const { id } = req.params;
    const { 
        nome, 
        nascimento, 
        email, 
        senha, 
        curso, 
        docente, 
        coordena_curso, 
        vice_diretor, 
        status 
    } = req.body;
    try {
        const [updated] = await Usuario.update({ nome, nascimento, email, senha, curso, docente, coordena_curso, vice_diretor, status }, {
            where: { id }
        });
        if (updated) {
            const updatedUsuario = await Usuario.findByPk(id);
            res.json({
                message: 'Usuário atualizado com sucesso',
                data: updatedUsuario,
                statusCode: 200
            });
        } else {
            res.status(404).json({
                message: 'Usuário não encontrado',
                statusCode: 404
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao atualizar usuário',
            error: error.message,
            statusCode: 500
        });
    }
}

export async function deleteUsuario(req, res) {
    const { id } = req.params;
    try {
        const deleted = await Usuario.destroy({
            where: { id }
        });
        if (deleted) {
            res.json({
                message: 'Usuário deletado com sucesso',
                statusCode: 200
            });
        } else {
            res.status(404).json({
                message: 'Usuário não encontrado',
                statusCode: 404
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao deletar usuário',
            error: error.message,
            statusCode: 500
        });
    }
}
