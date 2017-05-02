var config = require('config.json');
var express = require('express');
var router = express.Router();
var classroomService = require('services/classroom.service');

// routes
router.post('/authenticate', authenticate);
router.post('/create', create);
router.get('/', getAll);
router.get('/current', getCurrent);
router.put('/:_id', update);
router.delete('/:_id', _delete);

router.get('/teacher/:teacherId',getByTeacherId);
router.get('/student/:studentId',getByStudentId);
router.put('/:roomName', sendReq);

module.exports = router;

function authenticate(req, res) {
    classroomService.authenticate(req.body._id)
        .then(function (classroom) {
            if (classroom) {
                // authentication successful
                res.send(classroom);
            } else {
                // authentication failed'
                res.status(401).send('classroom authentication error');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function create(req, res) {
    classroomService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    classroomService.getAll()
        .then(function (classroom) {
            res.send(classroom);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    classroomService.getById(req.classroom.sub)
        .then(function (classroom) {
            if (classroom) {
                res.send(classroom);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    classroomService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    classroomService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

//Specific Methods
function getByTeacherId(req, res) {
    console.log("Hejhej1");
    classroomService.getByTeacherId(req.params)
        .then(function (classroom) {
            if (classroom) {
                res.send(classroom);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getByStudentId(req, res) {
    console.log("Hejhej2");
    classroomService.getByStudentId(req.params)
        .then(function (classroom) {
            if (classroom) {
                res.send(classroom);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function sendReq(req, res){
    classroomService.sendReq(req.params, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
