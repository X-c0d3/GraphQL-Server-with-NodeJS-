import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import WorkspaceType from './type/queryTypeWorkspace';
import Workspace from '../models/workspace';

const queryWorkspace = new GraphQLObjectType({
    name: 'Query',
    fields: {
        workspaceAll: {     // Get all workspace
            type: new GraphQLList(WorkspaceType),
            async resolve(root, args, context, info) {
                return await Workspace.find()
                    .catch((err: any) => {
                        console.log(err);
                    });
            }
        },
        workspaceById: {
            type: WorkspaceType,
            args: {
                uuid: {
                    type: GraphQLString
                }
            },
            async resolve(root, args) {
                return await Workspace.findOne({ 'uuid': args.uuid })
                    .catch((err: any) => {
                        console.log(err);
                    });
            }
        },
    }
});

export default queryWorkspace;