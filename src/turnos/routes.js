const express = require('express');
const router = express.Router();

const { turnosController: controller } = require('../shared/dependencies');

/**
 * @swagger
 * /api/turnos:
 *   get:
 *     summary: Lista todos los turnos
 *     tags: [Turnos]
 *     responses:
 *       200:
 *         description: Lista de turnos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Turno'
 */
router.get('/', async (req, res) => {
    try {
        let turnos = await controller.getAllTurnos();
        res.status(200).json(turnos);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * @swagger
 * /api/turnos/{id}:
 *   get:
 *     summary: Obtiene un Turno por Id
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del turno
 *     responses:
 *       200:
 *         description: Turno encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turno'
 *       404:
 *         description: Turno no encontrado
 */
router.get('/:id', async (req, res) => {
    try {
        let turno = await controller.getTurnoById(req.params.id);
        if (!turno) {
            return res.status(404).json({message: 'Turno no encontrado'});
        }
        res.status(200).json(turno);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * @swagger
 * /api/turnos:
 *   post:
 *     summary: Crea un nuevo turno
 *     tags: [Turnos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paciente
 *               - medico
 *             properties:
 *               paciente:
 *                 type: integer
 *                 format: int64
 *                 description: Id del Paciente
 *               medico:
 *                 type: integer
 *                 format: int64
 *                 description: id del Médico
 *               fechaHora:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y Hora del Turno
 *     responses:
 *       201:
 *         description: Turno creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turno'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', async (req, res) => {
    try {
        let newTurno = await controller.crearTurno(req.body);
        res.status(201).json(newTurno);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

/**
 * @swagger
 * /api/turnos/{id}:
 *   put:
 *     summary: Actualiza un turno existente
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del Turno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Turno'
 *     responses:
 *       200:
 *         description: Turno actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turno'
 *       404:
 *         description: Turno no encontrado
 */
router.put('/:id', async (req, res) => {
    try {
        let updatedTurno = await controller.updateTurno(req.params.id, req.body);
        if (!updatedTurno) {
            return res.status(404).json({message: 'Turno no encontrado'});
        }
        res.status(200).json(updatedTurno);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * @swagger
 * /api/turnos/{id}:
 *   delete:
 *     summary: Elimina un Turno
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del Turno
 *     responses:
 *       204:
 *         description: Turno eliminado exitosamente
 *       404:
 *         description: Turno no encontrado
 */
router.delete('/:id', async (req, res) => {
    try {
        let deleted = await controller.deleteTurno(req.params.id);
        if (!deleted) {
            return res.status(404).json({message: 'Turno no encontrado'});
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;
