"use strict";
const config = require('../Manager/ChatManager');

exports.getUserList = function (req, res) {
	config.getUserList(function (err, result) {
		res.status(result.status).send(result.body)
	})
}

exports.addNewUser = function (req, res) {
	config.addNewUser(req, function (err, result) {
		res.status(result.status).send(result.body)
	})
}

exports.getQuestions = function (req, res) {
	config.getQuestions(function (err, result) {
		res.status(result.status).send(result.body)
	})
}

exports.getTagsByQuestion = function (req, res) {
	config.getTagsByQuestion(req, function (err, result) {
		res.status(result.status).send(result.body)
	})
}

exports.addNewQuestion = function (req, res) {
	config.addNewQuestion(req, function (err, result) {
		res.status(result.status).send(result.body)
	})
}

exports.addNewTag = function (req, res) {
	config.addNewTag(req, function (err, result) {
		res.status(result.status).send(result.body)
	})
}

exports.updateQuestion = function (req, res) {
	config.updateQuestion(req, function (err, result) {
		res.status(result.status).send(result.body)
	})
}

exports.deleteQuestion = function (req, res) {
	config.deleteQuestion(req, function (err, result) {
		res.status(result.status).send(result.body)
	})
}


exports.updateTag = function (req, res) {
	config.updateTag(req, function (err, result) {
		res.status(result.status).send(result.body)
	})
}


exports.deleteTag = function (req, res) {
	config.deleteTag(req, function (err, result) {
		res.status(result.status).send(result.body)
	})
}

exports.getRequestList = function (req, res) {
	config.getRequestList(function (err, result) {
		res.status(result.status).send(result.body)
	})
}

exports.getRequestListByUser = function (req, res) {
	config.getRequestListByUser(req, function (err, result) {
		res.status(result.status).send(result.body)
	})
}

exports.addNewRequest = function (req, res) {
	config.addNewRequest(req, function (err, result) {
		res.status(result.status).send(result.body)
	})
}

exports.getTags = function (req, res) {
	config.getTags(function (err, result) {
		res.status(result.status).send(result.body)
	})
}

exports.adminLogin = function (req, res) {
	config.adminLogin(req, function (err, result) {
		res.status(result.status).send(result.body)
	})
}

exports.getDashboardCounts = function (req, res) {
	config.getDashboardCounts(function (err, result) {
		res.status(result.status).send(result.body)
	})
}
