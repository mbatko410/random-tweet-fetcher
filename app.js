require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

// Ensure the bearer token is set in environment variables
const BEARER_TOKEN = process.env.BEARER_TOKEN;
if (!BEARER_TOKEN) {
    console.error('Error: BEARER_TOKEN is not set.');
    process.exit(1);
}

// List of Twitter accounts to fetch tweets from
const accounts = ['cmdrmcbragg', 'androidpeterson', 'felipequote'];

// Serve static files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/getRandomTweet', async (req, res) => {
    try {
        const randomAccount = accounts[Math.floor(Math.random() * accounts.length)];
        const url = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${randomAccount}&count=50`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Twitter API error: ${response.statusText}`);
        }

        const tweets = await response.json();
        const randomTweet = tweets[Math.floor(Math.random() * tweets.length)];

        res.json({
            tweet: randomTweet.text,
            account: randomAccount,
        });
    } catch (error) {
        console.error('Error fetching tweets:', error);
        res.status(500).json({ error: 'Failed to fetch tweet' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
