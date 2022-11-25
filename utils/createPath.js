
module.exports = function createPath(folders, parentId) {
    const folderList = [];
    function checkParent(parentId = null) {
        if (parentId == null) {
            return 0;
        }
        else {
            let parentFolder = folders.filter(f => f._id == parentId)
            folderList.unshift(parentFolder[0].folderName)
            checkParent(parentFolder[0].parentId)
        }
    }

    checkParent(parentId)
    return folderList;

}