module.exports = function authenticateUser(user, password) {
    if (!user || !password) {
        return false;
    }

    return !/[A-Z]/.test(user);
}