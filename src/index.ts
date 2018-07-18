import * as express from 'express';
import * as mongoose from 'mongoose';
import { schema } from './graphql-schema/schema';
import * as bodyParser from 'body-parser';
import * as graphqlMiddleware from 'express-graphql';
import workspaceRouter from './routes/workspaceRouter';
import defaultRouter from './routes/defaultRouter';

const PORT = 5000;
const MONGODB_User = 'eikon5workspace';
const MONGODB_Pass = '1234';
const MONGODB_Host = '192.168.99.100';
const MONGODB_Port = '27017';
const MONGODB_DATABASE_NAME = 'workspace_db';

// Setup MongoDb connection
mongoose.connect(`mongodb://${MONGODB_User}:${MONGODB_Pass}@${MONGODB_Host}:${MONGODB_Port}/${MONGODB_DATABASE_NAME}`);
mongoose.connection.once('open', () => {
    console.log('connected to database');
});
mongoose.connection.on('error', console.error.bind(console, 'connection error'));

const app = express();

// Parse application/json
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// GraphQL UI
app.use('/graphiql', graphqlMiddleware({
    schema,
    graphiql: true
}));

// REST API For test
// app.use('/api/workspace', workspaceRouter);
// app.use(defaultRouter);

app.set('port', process.env.PORT || PORT);
app.listen(app.get('port'), '0.0.0.0', () => {
    console.log('App is running on http://localhost:%d in %s ', app.get('port'), app.get('env'));
});