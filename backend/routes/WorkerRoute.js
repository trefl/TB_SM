import express from "express";
import {
    getWorkers,
    getWorkerById,
    createWorker,
    updateWorker,
    deleteWorker
} from "../controllers/Workers.js"
import { verifyUser, } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/workers', verifyUser, getWorkers);
router.get('/workers/:id', verifyUser, getWorkerById);
router.post('/workers', verifyUser, createWorker);
router.patch('/workers/:id', verifyUser, updateWorker);
router.delete('/workers/:id', verifyUser, deleteWorker);

export default router;