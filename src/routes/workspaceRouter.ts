import * as express from 'express';
import Workspace from '../models/workspace';
const workspaceRouter = express.Router();

// For TEST REST API

// Get All workspace && Save workpace from MongoDB
workspaceRouter.route('/')
    .get((req, res) => {
        Workspace.find({}, (err, workspace) => {
            res.json(workspace);
        });
    })
    .post((req, res) => {
        let workspace = new Workspace(req.body);
        workspace.save();
        res.status(201).send(workspace);
    });

workspaceRouter.route('/:appId')
    .delete((req, res) => {
        Workspace.findOne({ 'apps.appId': req.params.appId })
            .then((response: any) => {
                response.apps = response.apps.filter(function (app: any) {
                    return app.appId !== req.params.appId;
                });
                response.save();
                res.status(204).send('removed');
            }).catch((err: any) => {
                res.status(500).send(err);
            });
    });

workspaceRouter.route('/app')
    .post((req, res) => {
        Workspace.findOne({}, (err, workspace: any) => {
            if (err) {
                res.status(500).send(err);
            }
            workspace.apps.push(req.body);
            let _workspace = new Workspace(workspace);
            _workspace.save();
            res.status(201).send(_workspace);
        });
    })
    .put((req, res) => {
        let appId = req.body.appId;
        Workspace.findOne({}, (err, response: any) => {
            if (err) {
                res.status(500).send(err);
            }
            for (let app of response.apps) {
                if (app.appId === appId) {
                    Object.keys(req.body).forEach(function (key) {
                        app[key] = req.body[key];
                    });
                }
            }
            let _workspace = new Workspace(response);
            _workspace.save();
            res.status(201).send(_workspace);
        });

    });

export default workspaceRouter;