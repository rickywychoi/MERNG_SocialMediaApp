const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const User = require('../../models/User');
const { SECRET_KEY } = require('../../config')

const generateToken = user => {
    return jwt.sign(
    {
        id: user.id,
        email: user.email,
        username: user.username
    }, 
    SECRET_KEY, 
    { expiresIn: '1h' }
    );
}

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            
            const user = await User.findOne({ username });
            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }
            console.log("User", user)
            
            // const match = await bcrypt.compare(password, user.password);
            // if (!match) {
            //     errors.general = 'Wrong credentials';
            //     throw new UserInputError('Wrong credentials', { errors });
            // }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },

        async register(
            _, 
            { 
                registerInput: { username, email, password, confirmPassword }
            }
        ) {
            // Validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            // Check user duplicates
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }

            // Hash password and create JWT
            password = await bcrypt.genSalt(12, (err, salt) => {
                return bcrypt.hash(password, salt);
            });

            const newUser = new User({
                username,
                password,
                email,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            console.log("Saved user", res);

            const token = generateToken(res);

            return {
                // ...res._doc,
                id: res._id,
                token
            }
        }
    }
}