import mongoose from 'mongoose'

const recordingSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    title: { type: String, required: true },
    scriptText: { type: String, required: true },
    cueWord: { type: String, required: true },
    actorAudioPath: { type: String, required: true },
    readerAudioPath: { type: String, required: true },
    // reader: { type: String },
    // actor: { type: String },
    createdAt: { type: Date, default: Date.now }
})

const Recording = mongoose.model('Recording', recordingSchema)

export default Recording 