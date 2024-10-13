const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;  // Use environment port if available

// Enable CORS
app.use(cors());

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com', // External MySQL database
    user: 'sql12737420',
    password: 'i6XC5b3vEa',
    database: 'sql12737420'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);  // Exit the server if the database connection fails
    } else {
        console.log('Connected to the MySQL database successfully');
    }
});

// Define the /login POST route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    // Insert username and password into the database
    const query = 'INSERT INTO login (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).send('Error inserting data');
        }
        // Send back the ID of the newly created user
        res.status(201).send({ id: results.insertId });
    });
});

// Handle server listening
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Access the server at http://localhost:${port}/`);
});
