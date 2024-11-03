const express = require('express');
const router = express.Router();
const Aluno = require('../models/aluno');
const Disciplina = require('../models/disciplina');

// Get alunos 
router.get('/', async (req, res) => {
    try {
        const alunos = await Aluno.find().populate('fk_idTurma');
        res.json(alunos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get aluno por ID
router.get('/:id', getAluno, (req, res) => {
    res.json(res.aluno);
});

// Create aluno
router.post('/', async (req, res) => {
    const aluno = new Aluno({
        nome: req.body.nome,
        idade: req.body.idade,
        ra: req.body.ra,
        fk_idTurma: req.body.fk_idTurma
    });

    try {
        const newAluno = await aluno.save();
        res.status(201).json(newAluno);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update aluno
router.patch('/:id', getAluno, async (req, res) => {
    if (req.body.nome != null) {
        res.aluno.nome = req.body.nome;
    }
    if (req.body.idade != null) {
        res.aluno.idade = req.body.idade;
    }
    if (req.body.ra != null) {
        res.aluno.ra = req.body.ra;
    }
    if (req.body.fk_idTurma != null) {
        res.aluno.fk_idTurma = req.body.fk_idTurma;
    }
    try {
        const updatedAluno = await res.aluno.save();
        res.json(updatedAluno);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete aluno
router.delete('/:id', getAluno, async (req, res) => {
    try {
        await res.aluno.remove();
        res.json({ message: 'Aluno removido' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// obter aluno por ID
async function getAluno(req, res, next) {
    let aluno;
    try {
        aluno = await Aluno.findById(req.params.id).populate('fk_idTurma');
        if (aluno == null) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.aluno = aluno;
    next();
}

module.exports = router;
