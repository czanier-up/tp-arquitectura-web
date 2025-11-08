const express = require('express');
const router = express.Router();

const {medicosController: controller} = require('../shared/dependencies');

/**
 * @swagger
 * /api/medicos:
 *   get:
 *     summary: Lista todos los Médicos
 *     tags: [Medicos]
 *     responses:
 *       200:
 *         description: Lista de Médicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medico'
 */
router.get('/', async (req, res) => {
    try {
        let medicos = await controller.getAllMedicos();
        res.status(200).json(medicos);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * @swagger
 * /api/medicos/{id}:
 *   get:
 *     summary: Obtiene un médico por Id
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del Médico
 *     responses:
 *       200:
 *         description: Médico encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medico'
 *       404:
 *         description: Médico no encontrado
 */
router.get('/:id', async (req, res) => {
    try {
        let medico = await controller.getMedicoById(req.params.id);
        if (!medico) {
            return res.status(404).json({message: 'Médico no encontrado'});
        }
        res.status(200).json(medico);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * @swagger
 * /api/medicos:
 *   post:
 *     summary: Crea un nuevo Médico
 *     tags: [Medicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - matricula
 *               - email
 *             properties:
 *               matricula:
 *                 type: integer
 *                 format: int64
 *                 description: Número de Matricula
 *               nombre:
 *                 type: string
 *                 description: Nombre del Médico
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del Médico
 *               especialidad:
 *                 type: string
 *                 description: Especialidad del Médico
 *     responses:
 *       201:
 *         description: Médico creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medico'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', async (req, res) => {
    try {
        let newMedico = await controller.createMedico(req.body);
        res.status(201).json(newMedico);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

/**
 * @swagger
 * /api/medicos/{id}:
 *   put:
 *     summary: Actualiza un médico existente
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del Médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matricula:
 *                 type: integer
 *                 format: int64
 *                 description: Número de Matricula
 *               nombre:
 *                 type: string
 *                 description: Nombre del médico
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del médico
 *               especialidad:
 *                 type: string
 *                 description: Especialidad del Médico
 *     responses:
 *       200:
 *         description: Médico actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medico'
 *       404:
 *         description: Médico no encontrado
 */
router.put('/:id', async (req, res) => {
    try {
        let updatedMedico = await controller.updateMedico(req.params.id, req.body);
        if (!updatedMedico) {
            return res.status(404).json({message: 'Médico no encontrado'});
        }
        res.status(200).json(updatedMedico);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * @swagger
 * /api/medicos/{id}:
 *   delete:
 *     summary: Elimina un Médico
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del Médico
 *     responses:
 *       204:
 *         description: Médico eliminado exitosamente
 *       404:
 *         description: Médico no encontrado
 */
router.delete('/:id', async (req, res) => {
    try {
        let deleted = await controller.deleteMedico(req.params.id);
        if (!deleted) {
            return res.status(404).json({message: 'Médico no encontrado'});
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * @swagger
 * /api/medicos/{id}/turnos:
 *   get:
 *     summary: Lista los turnos para un Médico
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del Médico
 *     responses:
 *       200:
 *         description: Lista de Turnos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   paciente:
 *                     $ref: '#/components/schemas/Paciente'
 *                   medico:
 *                     $ref: '#/components/schemas/Medico'
 *                   horario:
 *                      type: string
 *                      format: time
 *                      description: Hora del Turno
 *                   fecha:
 *                      type: string
 *                      format: date
 *                      description: Fecha del Turno
 *                   estado:
 *                     type: string
 *                     enum: [Pendiente, Atendido]
 *                     description: Estado del Turno
 */
router.get('/:id/turnos', async (req, res) => {
    try {
        let medico = await controller.getMedicoById(req.params.id);
        if (!medico) {
            return res.status(404).json({message: 'Médico no encontrado'});
        }
        let turnos = await controller.getTurnosByMedico(medico);
        res.status(200).json(turnos);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;
