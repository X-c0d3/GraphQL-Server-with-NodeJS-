import * as express from 'express';
const defaultRouter = express.Router();

defaultRouter.route('/')
    .get((req, res) => {
        res.send('<center><h2></br>Workspace service V 1.0</h2></center>');
    });

export default defaultRouter;