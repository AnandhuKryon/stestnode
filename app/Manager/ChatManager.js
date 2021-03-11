"use strict";
const { Tag, Question, User, Request, Admin } = require('../models/chatModel');

const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const path = require('path');
const multer = require('multer');
const passwordHash = require('password-hash');
const fs = require('fs');
var jwt = require('jsonwebtoken');



const moment = require('moment')
let currentDateAndTime = moment().format("DD-MM-YYYY HH:mm:ss");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


function adminLogin(req, cb) {
    Admin.find({ "username": req.body.username }, function (err, users) {
        if (err) {
            console.log(err)
            cb(null, {
                status: 403,
                body: {
                    status: false,
                    message: err,
                    data: null,
                }
            })
        }
        else {
            console.log(users)
            if (users.length == 0) {
                cb(null, {
                    status: 200,
                    body: {
                        status: false,
                        message: 'No user found',
                        data: null,
                    }
                })
            }
            else {
                if (users[0].password !== req.body.password) {
                    cb(null, {
                        status: 200,
                        body: {
                            status: false,
                            message: 'Wrong password',
                            data: null,
                        }
                    })
                }
                else {
                    cb(null, {
                        status: 200,
                        body: {
                            status: true,
                            message: 'success',
                            data: users[0]
                        }
                    })
                }
            }
        }
    });
}

function getUserList(cb) {
    User.find({}, function (err, users) {
        if (err) {
            console.log(err)
            cb(null, {
                status: 403,
                body: {
                    status: false,
                    message: err,
                    data: null,
                }
            })
        }
        else {
            cb(null, {
                status: 200,
                body: {
                    status: true,
                    message: 'success',
                    data: users,
                }
            })
        }
    });
}

async function addNewUser(req, cb) {
    let recentData = await User.findOne({}, {}, { sort: { 'uid': -1 } });
    let reqObj = {
        uid: recentData.uid + 1,
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        status: 1,
        created_at: currentDateAndTime,
        updated_at: currentDateAndTime
    }
    let obj = new User(reqObj)
    obj.save(function (err, obj) {
        if (err) {
            console.log(err)
            cb(null, {
                status: 403,
                body: {
                    status: false,
                    message: err,
                    data: null,
                }
            })
        }
        else {
            console.log("inserted");
            cb(null, {
                status: 200,
                body: {
                    status: true,
                    message: 'Added',
                    data: reqObj,
                }
            })
        }
    });
}

function getQuestions(cb) {
    Question.find({}, function (err, questions) {
        if (err) {
            console.log(err)
            cb(null, {
                status: 403,
                body: {
                    status: false,
                    message: err,
                    data: null,
                }
            })
        }
        else {
            cb(null, {
                status: 200,
                body: {
                    status: true,
                    message: 'success',
                    data: questions,
                }
            })
        }
    });
}

function getTagsByQuestion(req, cb) {
    Tag.find({ "qid": req.params.qid }, function (err, tags) {
        if (err) {
            console.log(err)
            cb(null, {
                status: 403,
                body: {
                    status: false,
                    message: err,
                    data: null,
                }
            })
        }
        else {
            cb(null, {
                status: 200,
                body: {
                    status: true,
                    message: 'success',
                    data: tags,
                }
            })
        }
    });
}


async function addNewQuestion(req, cb) {
    let checkExist = await Question.find({ "question": req.body.question });
    if (checkExist.length > 0) {
        cb(null, {
            status: 200,
            body: {
                status: false,
                message: 'Question already in use',
                data: null,
            }
        })
    }
    else {
        let recentData = await Question.findOne({}, {}, { sort: { 'qid': -1 } });
        let reqObj = {
            qid: recentData.qid + 1,
            question: req.body.question,
            answer: req.body.answer,
            created_at: currentDateAndTime,
            updated_at: currentDateAndTime
        }
        let obj = new Question(reqObj)
        obj.save(function (err, obj) {
            if (err) {
                console.log(err)
                cb(null, {
                    status: 403,
                    body: {
                        status: false,
                        message: err,
                        data: null,
                    }
                })
            }
            else {
                console.log("inserted");
                cb(null, {
                    status: 200,
                    body: {
                        status: true,
                        message: err,
                        data: obj,
                    }
                })
            }
        });
    }

}

async function addNewTag(req, cb) {
    let recentData = await Tag.findOne({}, {}, { sort: { 'tid': -1 } });
    let checkExist = await Tag.find({ "tag": req.body.tag });
    if (checkExist.length > 0) {
        cb(null, {
            status: 200,
            body: {
                status: false,
                message: 'Tag name already in use',
                data: null,
            }
        })
    }
    else {
        let reqObj = {
            tid: recentData.tid + 1,
            qid: req.body.qid,
            tag: req.body.tag,
            created_at: currentDateAndTime,
            updated_at: currentDateAndTime
        }
        let obj = new Tag(reqObj)
        obj.save(function (err, obj) {
            if (err) {
                console.log(err)
                cb(null, {
                    status: 403,
                    body: {
                        status: false,
                        message: err,
                        data: null,
                    }
                })
            }
            else {
                console.log("inserted");
                cb(null, {
                    status: 200,
                    body: {
                        status: true,
                        message: 'success',
                        data: obj,
                    }
                })
            }
        });
    }
}

async function updateQuestion(req, cb) {
    let checkExist = await Question.find({ "question": req.body.question });
    if (checkExist.length > 0) {
        if (checkExist.filter(el => el.qid == req.body.qid).length > 0) {
            let reqObj = {
                question: req.body.question,
                answer: req.body.answer,
                updated_at: currentDateAndTime
            }
            Question.findOneAndUpdate({ "qid": req.body.qid }, reqObj, function (err, obj) {
                if (err) {
                    console.log(err)
                    cb(null, {
                        status: 403,
                        body: {
                            status: false,
                            message: err,
                            data: null,
                        }
                    })
                }
                else {
                    console.log("updated");
                    cb(null, {
                        status: 200,
                        body: {
                            status: true,
                            message: 'success',
                            data: obj,
                        }
                    })
                }
            });
        }
        else {
            cb(null, {
                status: 200,
                body: {
                    status: false,
                    message: 'Question already in use',
                    data: null,
                }
            })

        }
    }
    else {
        let reqObj = {
            question: req.body.question,
            answer: req.body.answer,
            updated_at: currentDateAndTime
        }
        Question.findOneAndUpdate({ "qid": req.body.qid }, reqObj, function (err, obj) {
            if (err) {
                console.log(err)
                cb(null, {
                    status: 403,
                    body: {
                        status: false,
                        message: err,
                        data: null,
                    }
                })
            }
            else {
                console.log("updated");
                cb(null, {
                    status: 200,
                    body: {
                        status: true,
                        message: 'success',
                        data: obj,
                    }
                })
            }
        });
    }
}


async function deleteQuestion(req, cb) {
    let checkExist = await Question.find({ "qid": req.params.qid });
    if (checkExist.length == 0) {
        cb(null, {
            status: 200,
            body: {
                status: false,
                message: 'Question not found',
                data: null,
            }
        })
    }
    else {
        Question.deleteOne({ "qid": req.params.qid }, function (err, obj) {
            if (err) {
                console.log(err)
                cb(null, {
                    status: 403,
                    body: {
                        status: false,
                        message: err,
                        data: null,
                    }
                })
            }
            else {
                Tag.deleteMany({ "qid": req.params.qid }, function (err, obj) {
                    if (err) {
                        console.log(err)
                        cb(null, {
                            status: 403,
                            body: {
                                status: false,
                                message: err,
                                data: null,
                            }
                        })
                    }
                    else {
                        console.log("deleted");
                        cb(null, {
                            status: 200,
                            body: {
                                status: true,
                                message: 'success',
                                data: obj,
                            }
                        })
                    }
                });
            }
        });
    }
}


async function updateTag(req, cb) {
    let checkExist = await Tag.find({ "tag": req.body.tag });
    if (checkExist.length > 0) {
        cb(null, {
            status: 200,
            body: {
                status: false,
                message: 'Tag already in use',
                data: null,
            }
        })
    }
    else {
        let reqObj = {
            tid: req.body.tid,
            qid: req.body.qid,
            tag: req.body.tag,
            updated_at: currentDateAndTime
        }
        Tag.findOneAndUpdate({ "tid": req.body.tid }, reqObj, function (err, obj) {
            if (err) {
                console.log(err)
                cb(null, {
                    status: 403,
                    body: {
                        status: false,
                        message: err,
                        data: null,
                    }
                })
            }
            else {
                console.log("updated");
                cb(null, {
                    status: 200,
                    body: {
                        status: true,
                        message: 'success',
                        data: obj,
                    }
                })
            }
        });
    }
}


async function deleteTag(req, cb) {
    let checkExist = await Tag.find({ "tid": req.params.tid });
    if (checkExist.length == 0) {
        cb(null, {
            status: 200,
            body: {
                status: false,
                message: 'Tag not found',
                data: null,
            }
        })
    }
    else {
        Tag.deleteMany({ "tid": req.params.tid }, function (err, obj) {
            if (err) {
                console.log(err)
                cb(null, {
                    status: 403,
                    body: {
                        status: false,
                        message: err,
                        data: null,
                    }
                })
            }
            else {
                console.log("deleted");
                cb(null, {
                    status: 200,
                    body: {
                        status: true,
                        message: 'success',
                        data: null,
                    }
                })
            }
        });

    }
}

function getRequestList(cb) {
    Request.find({}, function (err, list) {
        if (err) {
            console.log(err)
            cb(null, {
                status: 403,
                body: {
                    status: false,
                    message: err,
                    data: null,
                }
            })
        }
        else {
            cb(null, {
                status: 200,
                body: {
                    status: true,
                    message: 'success',
                    data: list,
                }
            })
        }
    });
}

function getRequestListByUser(req, cb) {
    Request.find({ "uid": req.params.uid }, function (err, list) {
        if (err) {
            console.log(err)
            cb(null, {
                status: 403,
                body: {
                    status: false,
                    message: err,
                    data: null,
                }
            })
        }
        else {
            cb(null, {
                status: 200,
                body: {
                    status: true,
                    message: 'success',
                    data: list,
                }
            })
        }
    });
}


async function addNewRequest(req, cb) {
    let recentData = await Request.findOne({}, {}, { sort: { 'rid': -1 } });
    let reqObj = {
        rid: recentData.rid + 1,
        uid: req.body.uid,
        username: req.body.username,
        request: req.body.request,
        created_at: currentDateAndTime,
        status: 1
    }
    let obj = new Request(reqObj)
    obj.save(function (err, obj) {
        if (err) {
            console.log(err)
            cb(null, {
                status: 403,
                body: {
                    status: false,
                    message: err,
                    data: null,
                }
            })
        }
        else {
            console.log("inserted");
            cb(null, {
                status: 200,
                body: {
                    status: true,
                    message: 'success',
                    data: obj,
                }
            })
        }
    });
}

function getTags(cb) {
    Tag.find({}, function (err, tags) {
        if (err) {
            console.log(err)
            cb(null, {
                status: 403,
                body: {
                    status: false,
                    message: err,
                    data: null,
                }
            })
        }
        else {
            cb(null, {
                status: 200,
                body: {
                    status: true,
                    message: 'success',
                    data: tags,
                }
            })
        }
    });
}


async function getDashboardCounts(cb) {
    let UserCount = await User.countDocuments();
    let QuesCount = await Question.countDocuments();
    let RequestCount = await Request.countDocuments();
    cb(null, {
        status: 200,
        body: {
            status: true,
            message: 'success',
            data: {
                userCount: UserCount,
                questionCount: QuesCount,
                requestCount: RequestCount
            }
        }
    })
}

module.exports = {
    adminLogin: adminLogin,
    getUserList: getUserList,
    addNewUser: addNewUser,
    getQuestions: getQuestions,
    getTagsByQuestion: getTagsByQuestion,
    addNewQuestion: addNewQuestion,
    addNewTag: addNewTag,
    updateQuestion: updateQuestion,
    deleteQuestion: deleteQuestion,
    updateTag: updateTag,
    deleteTag: deleteTag,
    getRequestList: getRequestList,
    getRequestListByUser: getRequestListByUser,
    addNewRequest: addNewRequest,
    getTags: getTags,
    getDashboardCounts: getDashboardCounts
}







