var db = require('../models');
const EFile = db.efiles;
const mime = require('mime');
var multer = require('multer');
var fs = require('fs')

var path = require('path');
var appDir = path.dirname(require.main.filename);


exports.upload = (req, res, file) => {
    console.log(file);
    if(!req.file) {
        res.json({msg:'File not exists' });
    }else {
        EFile.create({
            file_type: req.file.mimetype,
            file_name: req.file.filename,
            original_name: req.file.originalname,
            file_size: req.file.size,
            uri: req.file.destination + req.file.filename + '.' + mime.getExtension(req.file.mimetype),
            created_at: Date.now(),
            updated_at: Date.now(),
            file_extension: mime.getExtension(req.file.mimetype)
        }).then((row) => {
            if (row.file_id) {
                let new_file_name = 'efile-' + row.file_id + '.' + mime.getExtension(req.file.mimetype);
                let file_uri = '/public/upload/' + new_file_name;
                EFile.update({file_name: new_file_name, uri: file_uri},
                    {
                        where: {
                            file_name: req.file.filename
                        }
                    })
                    .then()

                fs.rename(req.file.path, appDir + '/resources/efiles' + file_uri, function (err) {
                    if (err) throw err
                    console.log('Successfully move file')
                })

                res.json({
                    success: true,
                    data: row.file_id,
                    messages: ['File uploaded with success']
                });

            }
            // res.json({msg:'File uploaded successfully! -> filename = ' + req.file.originalname });

        }).catch(err => {
            console.log(err);
            res.json({msg: 'Error', detail: err});
        });
        var appDir = path.dirname(require.main.filename);
    }
};


exports.getImageByStyle = (req, res, next) => {
    EFile.findById(req.params.file_id).then(efile => {
        if (!efile) {
            return_default_image(res)
        } else {
            const file_path = appDir + '/resources/efiles/' + efile.uri;
            if (fs.existsSync(!path)) {
                return_default_image(res)
            } else {
                res.sendFile(file_path);
            }
        }
    })
}


function return_default_image(res) {
    const default_file_path = appDir + '/resources/efiles/public/upload/efile-532.png';
    res.sendFile(default_file_path);
}


exports.getVideoByStyle = (req, res, next) => {
Efile.findById(req.params.file_id).then(efile => {
    const path = appDir + '/resources/efiles/' + efile.uri;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;
        const chunksize = (end-start)+1;
        const file = fs.createReadStream(path, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res)
    }
})
}
