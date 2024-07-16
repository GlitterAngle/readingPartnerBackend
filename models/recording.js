import mongoose from 'mongoose'

const recordingSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    title: {type: String, required: true},
    reader: {type: String},
    actor: {type: String}
})

const Recording = mongoose.model('Recording', recordingSchema)

export default Recording 