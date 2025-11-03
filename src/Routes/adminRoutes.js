import { deleteUser, getAllUsers, getSingleUser, getStats } from "../Controllers/adminControllers";
import { Router } from "express";


const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getSingleUser);
router.get('/stats', getStats);
router.delete('/users/:id', deleteUser);


export default router;