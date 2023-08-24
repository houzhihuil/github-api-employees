const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
// const fetch = require('node-fetch'); // Import the fetch library

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Define routes that need custom behavior
app.get('/', (req, res) => {
  // Handle your custom logic here
  res.json({ message: 'Welcome to my node APIs! Enter /api/employees to try it.' });
});

const jsonServerApp = jsonServer.create();
const jsonRouter = jsonServer.router('employees.json');
const jsonMiddlewares = jsonServer.defaults();

jsonServerApp.use(jsonMiddlewares);
jsonServerApp.use(jsonRouter);

// Mount the json-server app under a specific path
app.use('/api', jsonServerApp);

// GitHub Access Token
// const GITHUB_ACCESS_TOKEN = 'YOUR_GITHUB_ACCESS_TOKEN';
const GITHUB_ACCESS_TOKEN = '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';
// Route to fetch GitHub data using the token
app.get('/github-data', async (req, res) => {
  // const githubUrl = 'https://api.github.com/repos/:owner/:repo'; // Replace with the actual GitHub API URL
  const githubUrl = 'https://api.github.com/repos/:houzhihuil/github-api-employees'
  try {
    const response = await fetch(githubUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    res.status(500).json({ error: 'An error occurred while fetching GitHub data.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
