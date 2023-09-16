const express = require('express');

const app = express();

const publicDirectoryPath = '../public';
app.use(express.static(path.join(__dirname, publicDirectoryPath)));

const port = 4000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})