const bcrypt = require("bcrypt");
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};
async function checkPassword(password, hashedPassword) {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch; // Returns true if matched, false otherwise
    } catch (err) {
        console.error("Error comparing password:", err);
        throw err;
    }
}


module.exports = {
    hashPassword,
    checkPassword
}