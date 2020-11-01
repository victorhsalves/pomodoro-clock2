const { LexModelBuildingService } = require('aws-sdk');
const firebase = require('firebase');
const Utils = require('../utils/utils');
const aws = require('aws-sdk');

//const s3 = new aws.s3();

module.exports = {
    async ListFiles(req, res, next) {
        const filesRef = firebase.database().ref('files/');
        filesRef.once("value").then((snapshot) => {
            return res.json(snapshot.val());
        }).catch((e) => {
            return res.json({ err: e });
        });
    },
    async SaveFilesMetadata(req, res) {
        const { originalname: name, size, key, location: url = '' } = req.file;
        const { name: author } = req.user;

        if(url == ''){
            var newUrl = `${process.env.APP_URL}/files/${key}`;
        }else{
            var newUrl = url;
        }
        newUrl= newUrl.split(' ').join('%20')
        var newFile = {
            author,
            name,
            size,
            key,
            newUrl,
            timestamp: Date.now()
        }
        return firebase.database().ref('files').push().set(newFile)
            .then(() => {
                
                return res.json({ message: 'Success' });
            })
            .catch((e) => {
                return res.json({ err: 'Falhou ' + e });
            })
    }
}
