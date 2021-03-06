﻿var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:_id', getById);
router.put('/:_id', update);
router.delete('/:_id', _delete);
router.get('/rooms/:_id', getClassrooms);
router.get('/reqs/:_id', getReqs);
router.put('/exit/:_id', exitClassroom);

router.put('/updateRoom/:_id', updateRoom);
router.put('/removeRoom/:_id', removeRoom);
router.put('/addPendReq/:_id', addPendReq);
router.put('/removePendReq/:_id', removePendReq);
router.get('/check/:_id/:classroom', checkRoom);
module.exports = router;

function exitClassroom(req, res){
    console.log("controller:    " + req.params._id + "    " + req.body._id);
    userService.exitClassroom(req.params._id, req.body._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getClassrooms(req, res){
    userService.getClassrooms(req.params._id)
        .then(function (rooms) {
            res.send(rooms);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getReqs(req, res){
    userService.getReqs(req.params._id)
        .then(function (rooms) {
            res.send(rooms);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function authenticate(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (user) {
            if (user) {
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(401).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function register(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    userService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getById(req, res) {
    userService.getById(req.params._id)
        .then(function (user) {
            if (user) {
                //console.log(user);
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    userService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    userService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateRoom(req, res) {
    userService.updateRoom(req.params, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function removeRoom(req, res) {
    userService.removeRoom(req.params, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function addPendReq(req,res){
     userService.addPendReq(req.params, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function removePendReq(req, res) {
    userService.removePendReq(req.params, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function checkRoom(req, res) {
    userService.checkRoom(req.params._id,req.params.classroom)
        .then(function (data) {
            if (data) {
                //console.log(user);
                res.send(data);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}