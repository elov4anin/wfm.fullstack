const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'WORKING'
    })
})

app.listen(5000, () => console.log('server started'));