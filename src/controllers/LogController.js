const firebase = require('firebase');

module.exports = {
    async WriteLog (req, res) {
        const { taskId, action, date, author, timestamp } = req.body;

        return firebase.database().ref('logs/'+taskId).push().set({
            action: action,
            date: date,
            author: author,
            timestamp: timestamp
        }).then(() => {
            return res.json({ message: 'Success' });
        }).catch((e) => {
            return res.json({ err: 'Falhou2 ' + e })
        })

    }
}