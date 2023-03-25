import { NextApiRequest, NextApiResponse } from 'next';
import DiscordOAuth2 from 'discord-oauth2';

const oauth = new DiscordOAuth2({
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    redirectUri: process.env.DISCORD_REDIRECT_URI,
});

export default async function handler(req, res) {
    try {
        const code = req.query.code;
        const token = await oauth.tokenRequest({
            code,
            scope: ['identify'],
            grantType: 'authorization_code',
        });

        const user = await oauth.getUser(token.access_token);

        // Here you can handle the user's login in your own application
        // For example, you can create a session or a JWT token

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}