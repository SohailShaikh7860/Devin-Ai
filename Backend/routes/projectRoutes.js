import { Router } from "express";
import { body } from "express-validator";
import * as projectController from "../controllers/project_controller.js";
import { authUser } from "../middleware/authMid.js";

const router = Router();

router.post('/create-project', authUser,
    body('name').isString().withMessage('Name is required'),
    projectController.createProjectController
);

router.get('/all',authUser,projectController.getAllProjectsController);

router.put('/add-user',authUser,
    body('projectId').isString().withMessage('Project ID is required'),
    body('users').isArray({ min: 1 }).withMessage('Users array is required').bail()
        .custom((users) => users.every(id => typeof id === 'string')).withMessage('All user IDs must be strings'),
    projectController.addUserToProjectController);


    router.get('/get-project/:projectId', authUser,
    projectController.getProjectByIdController
);
export default router;