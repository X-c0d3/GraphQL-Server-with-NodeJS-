import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt, GraphQLFloat, GraphQLID } from 'graphql';

const BoundType = new GraphQLObjectType({
    name: 'Bound',
    fields: {
        x: { type: GraphQLFloat },
        y: { type: GraphQLFloat },
        width: { type: GraphQLFloat },
        height: { type: GraphQLFloat }
    }
});

const PlacementType = new GraphQLObjectType({
    name: 'Placement',
    fields: {
        isRelativeBounds: { type: GraphQLBoolean },
        bounds: { type: BoundType },
        isVisible: { type: GraphQLBoolean },
        windowState: { type: GraphQLString }
    }
});

const AppType = new GraphQLObjectType({
    name: 'App',
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

const LinkType = new GraphQLObjectType({
    name: 'Link',
    fields: {
        SourceInstanceId: { type: GraphQLString },
        TargetInstanceId: { type: GraphQLString },
        TargetEntityId: { type: GraphQLString },
        RicPassingOption: { type: GraphQLString }
    }
});

const WorkspaceType = new GraphQLObjectType({
    name: 'Workspace',
    fields: {
        uuid: {
            type: GraphQLID
        },
        version: {
            type: GraphQLString
        },
        apps: { type: new GraphQLList(AppType) },
        links: { type: new GraphQLList(LinkType) }
    }
});

export default WorkspaceType;