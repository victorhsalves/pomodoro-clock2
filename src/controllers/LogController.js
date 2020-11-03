const firebase = require('firebase');

module.exports = {
    async WriteLog(req, res) {
        const { taskId, action, date, author, timestamp } = req.body;

        return firebase.database().ref('logs/' + taskId).push().set({
            action: action,
            date: date,
            author: author,
            timestamp: timestamp
        }).then(() => {
            return res.json({ message: 'Success' });
        }).catch((e) => {
            return res.json({ err: 'Falhou2 ' + e })
        })

    },
    async ListLogs(req, res, next) {
        const { taskId } = req.params;
        const logsRef = firebase.database().ref('logs/' + taskId);
        logsRef.once("value").then((snapshot) => {
            if (snapshot.val() != null) {
                return res.json(snapshot.val());
            } else {
                return res.status(400).json({ error: 'Not found' })
            }
        }).catch((e) => {
            return res.json({ err: 'Error: ' + e });
        });
    }
}