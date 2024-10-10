    // Load environment variables from .env file
    require('dotenv').config();

    const express = require('express');
    const mysql = require('mysql2');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const path = require('path'); // Add this line to import the path module


    const app = express();
    const PORT = 5001; // Change this to any unused port number

    // Middleware
    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public')));


    // MySQL connection configuration
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,       // localhost
        user: process.env.DB_USER,       // root
        password: process.env.DB_PASSWORD, // your_password
        database: process.env.DB_NAME    // studentDB
    });

    // Connect to MySQL
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err.message);
            return;
        }
        console.log('Connected to MySQL database!');
    });
    app.get('/', (req, res) => {
        const filePath = path.join(__dirname, 'index.html'); // Specify the path to index.html
        console.log(`Serving HTML file from: ${filePath}`); // Log the path for debugging
        res.sendFile(filePath); // Send the HTML file as a response
    });
    
    // POST route to submit student data
    // POST route to submit student data
app.post('/submit', (req, res) => {
    const { name, email, age, course, techSkills, whyHire } = req.body;

    // Validate that all required fields are present
    if (!name || !email || !age || !course || !techSkills || !whyHire) {
        return res.status(400).send('All fields are required.');
    }

    const sql = 'INSERT INTO students (name, email, age, course, tech_skills, why_hire) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [name, email, age, course, techSkills, whyHire], (err, result) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).send('Error saving data: ' + err.message);
        }
        res.status(201).send('Student information submitted successfully!');
    });
});


    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
