import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLID } from 'graphql';
import WorkspaceType from './type/queryTypeWorkspace';
import Workspace from '../models/workspace'; // MongoDB model
import { WorkspaceInputType, AppInputType } from './type/InputTypeWorkspace';

const mutationWorkspace = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addWorkspace: {
            type: WorkspaceType,
            args: {
                input: {
                    type: new GraphQLNonNull(WorkspaceInputType)
                }
            },
            async resolve(root, { input }) {
                let workspace = new Workspace(input);
                return await workspace.save().catch((err: any) => {
                    console.log(err);
                });
            }
        },
        removeWorkspace: {
            type: GraphQLBoolean,
            args: {
                uuid: {
                    type: GraphQLID
                }
            },
            async resolve(root, { uuid }) {
                return await Workspace.findOne({ 'uuid': uuid })
                    .then((existWorkspace: any) => {
                        return existWorkspace ? // check exist workspace
                            Workspace.findOneAndRemove({ 'uuid': uuid }).then(() => {
                                return true;
                            }).catch((err: any) => {
                                console.log(err);
                            }) : false;
                    });
            }
        },
        addApp: {
            type: WorkspaceType,
            args: {
                uuid: {
                    type: GraphQLID
                },
                input: {
                    type: AppInputType
                }
            },
            async resolve(root, args) {
                return await Workspace.findOne({ 'uuid': args.uuid })
                    .then((workspace: any) => {
                        workspace.apps.push(args.input);
                        return workspace.save();
                    }).catch((err: any) => {
                        console.log(err);
                    });
            }
        },
        updateApp: {
            type: GraphQLBoolean,
            args: {
                uuid: {
                    type: GraphQLID
                },
                input: {
                    type: AppInputType
                }
            },
            async resolve(root, args) {
                const { uuid, input } = args;
                return await Workspace.findOne({ 'uuid': uuid, 'apps.appId': input.appId })
                    .then((response: any) => {
                        let itemIndex = response.apps.findIndex((app: any) => app.appId === input.appId);
                        if (itemIndex > -1) {
                            response.apps[itemIndex] = args.input;
                            response.save();
                            return true;
                        } else {
                            throw new Error('Not found appId');
                        }
                    }).catch((err: any) => {
                        console.log(err);
                        return false;
                    });
            }
        },
        removeApp: {
            type: GraphQLBoolean,
            args: {
                uuid: {
                    type: GraphQLID
                },
                appId: {
                    type: GraphQLString
                }
            },
            async resolve(root, args) {
                return await Workspace.findOne({ 'uuid': args.uuid })
                    .then((response: any) => {
                        response.apps = response.apps.filter((app: any) => app.appId !== args.appId);
                        response.save();
                        return true;
                    }).catch((err: any) => {
                        console.log(err);
                        return false;
                    });
            }
        }
    }
});

export default mutationWorkspace;