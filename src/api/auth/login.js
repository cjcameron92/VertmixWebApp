import { NextApiRequest, NextApiResponse } from 'next';
import DiscordOAuth2 from 'discord-oauth2';

const oauth = new DiscordOAuth2({
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    redirectUri: process.env.DISCORD_REDIRECT_URI,
});

export default async function handler(req, res) {
    const url = oauth.generateAuthUrl({
        scope: ['identify'],
    });

    res.redirect(url);
}