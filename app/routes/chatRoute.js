module.exports = function (app) {
    var ChatController = require('../controller/ChatController');

    app.post('/admin/adminLogin', ChatController.adminLogin);
    app.get('/user/getUserList', ChatController.getUserList);
    app.post('/user/addNewUser', ChatController.addNewUser);
    app.get('/question/getQuestions', ChatController.getQuestions);
    app.get('/tags/getTagsByQuestion/:qid', ChatController.getTagsByQuestion);
    app.post('/question/addNewQuestion', ChatController.addNewQuestion);
    app.post('/tags/addNewTag', ChatController.addNewTag);
    app.post('/question/updateQuestion', ChatController.updateQuestion);
    app.delete('/question/deleteQuestion/:qid', ChatController.deleteQuestion);
    app.post('/tags/updateTag', ChatController.updateTag);
    app.delete('/tags/deleteTag/:tid', ChatController.deleteTag);
    app.get('/request/getRequestList', ChatController.getRequestList);
    app.get('/request/getRequestListByUser/:uid', ChatController.getRequestListByUser);
    app.post('/request/addNewRequest', ChatController.addNewRequest);
    app.get('/tags/getTags', ChatController.getTags);
    app.get('/count/getDashboardCounts', ChatController.getDashboardCounts);
}