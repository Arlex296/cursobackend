import express from 'express';


import { createEleccion, deleteEleccionById, getEleccion, getEleccionById, updateEleccion } from '../constrollers/eleccionesController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();
router.post("/", verifyUser, createEleccion);
router.get("/", getEleccion);
router.get("/:id", getEleccionById);
router.put("/:id", verifyUser, updateEleccion);
router.delete("/:id", verifyUser, deleteEleccionById);

export default router;