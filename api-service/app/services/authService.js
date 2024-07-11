const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const database = require('../../database');

const login = async (payload) => {
    const user = await database('users').where('username', payload.username).first();

    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    const userCreds = { id: user.id };
    const token = jsonWebToken.sign(userCreds, process.env.AUTH_SECRET_KEY, { expiresIn: '1h' });

    return { user, token };
}

const register = async (payload) => {
    const existingUser = await database('users')
        .where('email', payload.email)
        .orWhere('username', payload.username)
        .first();

    if (existingUser) {
        throw new Error('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const [newUser] = await database('users')
        .insert({
            username: payload.username,
            email: payload.email,
            password: hashedPassword,
            created_at: new Date(),
            updated_at: new Date(),
        })
        .returning('*');

    return newUser;
}

module.exports = {
    login,
    register
}
