const express = require('express');
const router = express.Router();

const { pacientesController: controller } = require('../shared/dependencies');

/**
 * @swagger
 * /api/pacientes:
 *   get:
 *     summary: Lista todos los pacientes
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
 */
router.get('/', async (req, res) => {
    try {
        let pacientes = await controller.getAllPacientes();
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/pacientes/{id}:
 *   get:
 *     summary: Obtiene un paciente por Id
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id del paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente no encontrado
 */
router.get('/:id', async (req, res) => {
    try {
        let paciente = await controller.getPacienteById(req.params.id);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/pacientes:
 *   post:
 *     summary: Crea un nuevo paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dni
 *               - nombre
 *               - apellido
 *               - email
 *             properties:
 *               dni:
 *                 type: integer
 *                 format: int64
 *                 description: Dni del paciente
 *               nombre:
 *                 type: string
 *                 description: Nombre del paciente
 *               apellido:
 *                 type: string
 *                 description: Apellido del paciente
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del paciente
 *     responses:
 *       201:
 *         description: Paciente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', async (req, res) => {
    try {
        let newPaciente = await controller.createPaciente(req.body);
        res.status(201).json(newPaciente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/pacientes/{id}:
 *   put:
 *     summary: Actualiza un paciente existente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: integer
 *                 format: int64
 *                 description: Dni del paciente
 *               nombre:
 *                 type: string
 *                 description: Nombre del paciente
 *               apellido:
 *                 type: string
 *                 description: Apellido del paciente
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del paciente
 *     responses:
 *       200:
 *         description: Paciente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente no encontrado
 */
router.put('/:id', async (req, res) => {
    try {
        let updatedPaciente = await controller.updatePaciente(req.params.id, req.body);
        if (!updatedPaciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.status(200).json(updatedPaciente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/pacientes/{id}:
 *   delete:
 *     summary: Elimina un paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del paciente
 *     responses:
 *       204:
 *         description: Paciente eliminado exitosamente
 *       404:
 *         description: Paciente no encontrado
 */
router.delete('/:id', async (req, res) => {
    try {
        let deleted = await controller.deletePaciente(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
