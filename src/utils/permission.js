const permissions = require('../../permissions.json');

const levels = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo']; // Alpha = 0 (höchstes), Echo = 4 (niedrigstes)

function getAdminLevel(userId) {
    return permissions[userId] || null;
}

function hasAdminLevel(userId, requiredLevel) {
    const userLevel = getAdminLevel(userId);
    if (!userLevel) return false;
    const userIndex = levels.indexOf(userLevel);
    const requiredIndex = levels.indexOf(requiredLevel);
    return userIndex <= requiredIndex; // Alpha (0) >= Bravo (1) usw.
}

module.exports = {
    getAdminLevel,
    hasAdminLevel,
    levels
};
