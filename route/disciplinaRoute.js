const express = require('express');
const router = express.Router();
const Disciplina = require('../models/disciplina');
const Aluno = require('../models/aluno');

// Get disciplinas 
router.get('/', async (req, res) => {
    try {
        const disciplinas = await Disciplina.find().populate('alunos');
        res.json(disciplinas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get disciplina por ID 
router.get('/:id', getDisciplina, async (req, res) => {
    try {
        const disciplina = await Disciplina.findById(req.params.id).populate('alunos');
        res.json(disciplina);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create disciplina
router.post('/', async (req, res) => {
    const disciplina = new Disciplina({
        nome: req.body.nome,
        cargaHoraria: req.body.cargaHoraria,
        sala: req.body.sala
    });

    try {
        const newDisciplina = await disciplina.save();
        res.status(201).json(newDisciplina);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update disciplina
router.patch('/:id', getDisciplina, async (req, res) => {
    if (req.body.nome != null) {
        res.disciplina.nome = req.body.nome;
    }
    if (req.body.cargaHoraria != null) {
        res.disciplina.cargaHoraria = req.body.cargaHoraria;
    }
    if (req.body.sala != null) {
        res.disciplina.sala = req.body.sala;
    }
    try {
        const updatedDisciplina = await res.disciplina.save();
        res.json(updatedDisciplina);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete disciplina (e todos os alunos associados)
router.delete('/:id', getDisciplina, async (req, res) => {
    try {
        await Aluno.deleteMany({ fk_idTurma: res.disciplina._id });
        await res.disciplina.remove();
        res.json({ message: 'Disciplina e alunos associados removidos' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//  obter disciplina por ID
async function getDisciplina(req, res, next) {
    let disciplina;
    try {
        disciplina = await Disciplina.findById(req.params.id);
        if (disciplina == null) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.disciplina = disciplina;
    next();
}

module.exports = router;
