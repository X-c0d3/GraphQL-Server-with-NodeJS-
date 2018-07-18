import { GraphQLSchema } from 'graphql';
import queryWorkspace from './queryWorkspace';
import mutationWorkspace from './mutationWorkspace';

const schema = new GraphQLSchema({
    query: queryWorkspace,
    mutation: mutationWorkspace
    // subscription
});

export { schema };