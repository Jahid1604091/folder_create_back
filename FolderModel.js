const mongoose = require('mongoose');

const folderSchema = mongoose.Schema({
    folderName: String,
    depthLevel: Number,
    parentId:String,
}, { timestamps: true })


module.exports = Folder = mongoose.model('Folder', folderSchema)
