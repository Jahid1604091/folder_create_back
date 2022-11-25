const fs = require('fs');
const express = require('express');
const FolderModel = require('../FolderModel');
const createPath = require('../utils/createPath');
const router = express.Router();

router.delete('/:id', async (req, res) => {
    try {
        const folder = await FolderModel.findById(req.params.id);

        if (!folder) {
            res.status(201).json({ message: 'No Folder' })
        }
        else {
            //check if it is a child -> simply remove it -> if no subitems
            const subitems = await FolderModel.find({ parentId: req.params.id })
            const folders = await FolderModel.find({});
            if (subitems.length === 0) {
                //delete from db
                await folder.remove();
            }
            else{
                //delete all from db
                await FolderModel.deleteMany({ parentId: req.params.id })
                await folder.remove();
            }


            //delete children from dir
            const path = createPath(folders,folder.parentId);
            let pathDir = './';
            for (let i = 0; i < Object.values(path).length; i++) {
                pathDir = pathDir + path[i] + '/'
            }
            fs.rm(pathDir+folder.folderName,{ recursive: true },err=>{
                if(err){
                    throw err;
                }
            })
            return res.status(200).json({ message: 'Folder Deleted' })
        }
    } catch (err) {
        console.error(err);
    }
})
module.exports = router;
