const fs = require('fs');
const express = require('express');
const FolderModel = require('../FolderModel');
const router = express.Router();


function createFolder(folders, parentId = null) {
    const folderList = [];
    let folder;
    if (parentId == null) {
       
        folder = folders.filter(f => f.parentId == undefined)
    }
    else {
       
        folder = folders.filter(f => f.parentId == parentId)
    }

    for (let fold of folder) {
        
        folderList.push({
            _id: fold._id,
            folderName: fold.folderName,
            subitems: createFolder(folders, fold._id)
        })
        
    }
    return folderList;
}

router.get('/', async (req, res) => {

    try {
        const folders = await FolderModel.find({});
        if (folders.length === 0) {
            res.status(201).json({ message: 'No Folder' })
        }
        else {
            const folderList = createFolder(folders);
            return res.status(200).json({ folderList })
        }
    } catch (err) {
        console.error(err);
    }
})
module.exports = router;
