var friendDataBase = require('../data/friends.js');

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friendDataBase);
    });

    app.post('/api/friends', function (req, res) {
        var potentialFriendScore = req.body.scores;
        var scoreArray = [];
        var friendNum = 0;
        var bestMatch = 0;

        for (var i = 0; i < friendDataBase.length; i++) {
            var scoreDifference = 0;

            for (var j = 0; j < potentialFriendScore.length; j++) {
                scoreDifference += (Math.abs(parseInt(friendDataBase.scores[j]) - parseInt(potentialFriendScore[j])));
            }

            scoreArray.push(scoreDifference);
        }

        for (var i = 0; i < scoreArray.length; i++) {
            if (scoreArray[i] <= scoreArray[bestMatch]) {
                bestMatch = i;
            }
        }
        var returnMatch = friendDataBase[bestMatch];
        res.json(returnMatch);

        friendDataBase.push(req.body);
    });

};