const Sequelize = require('sequelize');
const db = require('../db/connection');

const Job = db.define('job', { // "db.define" is the alternatively mode remember of see "db.Model"
    // attributes
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    salary: {
        type: Sequelize.STRING,
    },
    company: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    new_job: {
        type: Sequelize.INTEGER,
    }
    
});

module.exports = Job