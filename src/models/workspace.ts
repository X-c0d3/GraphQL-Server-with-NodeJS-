import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

// For MongoDB schema models
const WorkspaceSchema = new Schema({
    uuid: String,
    version: String,
    apps: [{
        appId: String,
        version: Number,
        template: String,
        url: String,
        name: String,
        title: String,
        zoomFactor: Number,
        placement: [{
            isRelativeBounds: Boolean,
            bounds: [{
                x: Number,
                y: Number,
                width: Number,
                height: Number
            }],
            isVisible: Boolean,
            windowState: String
        }],
        instanceId: String,
        channel: Number,
        context: String,
        persistData: String,
    }],
    links: [{
        SourceInstanceId: String,
        TargetInstanceId: String,
        TargetEntityId: String,
        RicPassingOption: String,
    }],
    entities: []
});

export default mongoose.model('Workspace', WorkspaceSchema);