const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  uid: Number,
  username: String,
  email: String,
  mobile: String,
  status: Number,
  created_at: String,
  updated_at: String
})

const QuestionSchema = mongoose.Schema({
  qid: Number,
  question: String,
  answer: String,
  created_at: String,
  updated_at: String
})

const TagSchema = mongoose.Schema({
  tid: Number,
  qid: Number,
  tag: String,
  created_at: String,
  updated_at: String
})

const RequestSchema = mongoose.Schema({
  rid: Number,
  uid: Number,
  username: String,
  request: String,
  created_at: String,
  status: Number
})

const AdminSchema = mongoose.Schema({
  aid: Number,
  username: String,
  password: String,
  status: Number
})

module.exports = {
  User: mongoose.model('User', UserSchema, 'UserMaster'),
  Question: mongoose.model('Question', QuestionSchema, 'QuestionMaster'),
  Tag: mongoose.model('Tag', TagSchema, 'TagMaster'),
  Request: mongoose.model('Request', RequestSchema, 'RequestMaster'),
  Admin: mongoose.model('Admin', AdminSchema, 'adminMaster')
};