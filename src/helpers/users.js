import jwt from 'jsonwebtoken';

const PRIVATE_KEY = "superSecretStringNowoneShouldKnowOrTheCanGenerateTokens";

export const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    };
    const options = {
        expiresIn: '1d'
    };
    return jwt.sign(payload, PRIVATE_KEY, options);
}