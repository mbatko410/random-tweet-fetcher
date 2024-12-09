document.getElementById('fetchTweetButton').addEventListener('click', () => {
    fetch('/api/getRandomTweet')
        .then(response => response.json())
        .then(data => {
            const tweetDisplay = document.getElementById('tweetDisplay');
            if (data.tweet && data.account) {
                tweetDisplay.innerHTML = `<strong>@${data.account}:</strong> ${data.tweet}`;
            } else {
                tweetDisplay.textContent = "No tweet found.";
            }
        })
        .catch(error => {
            console.error('Error fetching tweet:', error);
            const tweetDisplay = document.getElementById('tweetDisplay');
            tweetDisplay.textContent = "An error occurred while fetching the tweet.";
        });
});
