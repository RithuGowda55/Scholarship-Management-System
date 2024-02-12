// hdvjshhkbkzlbzhsdbvljdshvljn
// Import required modules
const express = require('express');
const mysql = require('mysql');

// Create an Express application
const app = express();
const port = 5500;

// Create a MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root', // Replace with your MySQL username
//     password: 'Oscar@123', // Replace with your MySQL password
//     database: 'miniproject' // Replace with your MySQL database name
// });

// Connect to the MySQL database
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL database:', err);
//         return;
//     }
//     console.log('Connected to MySQL database');
// });

app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/frontend/public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/frontend/views/authentication.html');
// });
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/views/authentication.html');
});

app.get('/student.html', (req, res) => {
    res.sendFile(__dirname + '/frontend/views/student.html');
});
app.get('/student.html', (req, res) => {
    res.sendFile(__dirname + '/frontend/views/student.html');
});
app.get('/register.html', (req, res) => {
    res.sendFile(__dirname + '/frontend/views/register.html');
});

// this is for address details

// Route to handle address details form submission
app.post('/Next1', (req, res) => {
    const formData = req.body;
    const sql = 'INSERT INTO address_details (Student_ID, Name, Gender, Email, Home_District, Home_Taluk, Assembly_Constituency, Pin_Code, Permanent_Address, Domicile_of_Karnataka) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [formData.Student_ID, formData.Name, formData.Gender, formData.Email, formData.Home_District, formData.Home_Taluk, formData.Assembly_Constituency, formData.Pin_Code, formData.Permanent_Address, formData.Domicile_of_Karnataka];
    db.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).send('Error inserting data');
        } else {
            res.send('Data inserted successfully');
        }
    });
});








// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});