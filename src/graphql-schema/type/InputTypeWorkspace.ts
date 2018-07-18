import { GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt, GraphQLFloat, GraphQLID, GraphQLObjectType } from 'graphql';

const BoundInputType = new GraphQLInputObjectType({
    name: 'BoundInput',
    fields: {
        x: { type: GraphQLFloat },
        y: { type: GraphQLFloat },
        width: { type: GraphQLFloat },
        height: { type: GraphQLFloat },
    }
});

const PlacementType = new GraphQLInputObjectType({
    name: 'PlacementInput',
    fields: {
        isRelativeBounds: { type: GraphQLBoolean },
        bounds: { type: BoundInputType },
        isVisible: { type: GraphQLBoolean },
        windowState: { type: GraphQLString },
    }
});

const AppInputType = new GraphQLInputObjectType({
    name: 'AppInput',
    fields: {
        appId: { type: GraphQLString },
        version: { type: GraphQLFloat },
        template: { type: GraphQLString },
        url: { type: GraphQLString },
        name: { type: GraphQLString },
        title: { type: GraphQLString },
        zoomFactor: { type: GraphQLFloat },
        placement: { type: PlacementType },
        instanceId: { type: GraphQLString },
        channel: { type: GraphQLInt },
        context: { type: GraphQLString },
        persistData: { type: GraphQLString }
    }
});

const LinkInputType = new GraphQLInputObjectType({
    name: 'LinkInput',
    fields: {
        SourceInstanceId: { type: GraphQLString },
        TargetInstanceId: { type: GraphQLString },
        TargetEntityId: { type: GraphQLString },
        RicPassingOption: { type: GraphQLString }
    }
});

const WorkspaceInputType = new GraphQLInputObjectType({
    name: 'WorkspaceInput',
    fields: {
        uuid: {
            type: GraphQLID
        },
        version: {
            type: GraphQLString
        },
        apps: { type: new GraphQLList(AppInputType) },
        links: { type: new GraphQLList(LinkInputType) },
        entities: { type: new GraphQLList(GraphQLString) }
    }
});

export { WorkspaceInputType, AppInputType, LinkInputType, BoundInputType };