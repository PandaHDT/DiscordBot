const { ownerID } = require('../../config.json');
const permissions = require('../../permissions.json');

function getAdminLevel(userId) {
    if (userId === ownerID) return 5;
    return permissions[userId] || 0;
}

function hasAdminLevel(userId, requiredLevel) {
    return getAdminLevel(userId) >= requiredLevel;
}

module.exports = {
    getAdminLevel,
    hasAdminLevel
};
