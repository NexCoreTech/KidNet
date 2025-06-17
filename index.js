const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Constant users — always include @stetup
const users = {
  stetup: {
    username: 'stetup',
    bio: 'Your space. Your friends. Your KidNet.',
    domain: 'stetup.com',
    joined: 'March 2025',
    status: 'Owner',
    friends: ['jacob.stetup.com', 'josh.stetup.com', 'emma.stetup.com'],
    avatar: 'https://raw.githubusercontent.com/stetupdev/a/main/IMG_0164.jpg'
  }
};

// Serve index.html for root /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Dynamic profile route like /@stetup
app.get('/@:username', (req, res) => {
  const username = req.params.username.toLowerCase();
  const user = users[username];

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>@${user.username} — KidNet Profile</title>
      <style>
        body { font-family: Arial, sans-serif; background:#1e1e2f; color:#eee; padding:20px; }
        .profile { max-width:600px; margin:auto; background:#2b2b45; border-radius:10px; padding:20px; box-shadow:0 0 12px #444; }
        h1 { color:#82c7ff; }
        .avatar { width:120px; height:120px; border-radius:50%; border:3px solid #82c7ff; margin-bottom:20px; }
        .bio { font-style: italic; margin-bottom:15px; }
        .info p { margin: 5px 0; }
        .friends { margin-top:25px; }
        .friend { background:#3a3a5a; padding:10px; margin-bottom:8px; border-radius:6px; }
      </style>
    </head>
    <body>
      <div class="profile">
        <img src="${user.avatar}" alt="@${user.username} avatar" class="avatar" />
        <h1>@${user.username}</h1>
        <div class="bio">${user.bio}</div>
        <div class="info">
          <p><strong>Joined:</strong> ${user.joined}</p>
          <p><strong>Domain:</strong> ${user.domain}</p>
          <p><strong>Status:</strong> ${user.status}</p>
        </div>
        <div class="friends">
          <h2>Friends</h2>
          ${user.friends.map(f => `<div class="friend">${f}</div>`).join('')}
        </div>
      </div>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`KidNet backend running on port ${PORT}`);
});
