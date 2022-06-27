const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/FlipCartColone`, {

}).then(() => {
    console.log('Database Connection Successfully!!!!')
}).catch(() => {
    console.log('Error in DB Connection!!!!')
});

module.exports = mongoose;