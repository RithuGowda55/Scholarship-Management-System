// import mysql.connector

// db_config = mysql.createConnection({
    // host: 'localhost',
    // user: 'root@localhost',
    // password: 'Oscar@123',
    // database: 'miniproject'
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to database: ' + err.stack);
//         return;
//     }
//     console.log('Connected to database as id ' + db.threadId);
// });

// module.exports = db;

// Server-side code to handle form submissions and insert data into the database

// Server-side code to handle form submissions and insert data into the database

const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root@localhost',
    password: 'Oscar@123',
    database: 'miniproject'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.use(express.urlencoded({ extended: false }));

// Route to handle address details form submission
app.post('/submit/address', (req, res) => {
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

// Route to handle academic details form submission
app.post('/submit/academic', (req, res) => {
    const formData = req.body;
    const sql = 'INSERT INTO academic_details (Student_ID, SSLC_CBSE_ICSE_Reg_Number, Student_Name_as_in_SSLC_CBSE_ICSE, College_District, College_Taluk, University_or_Board_Name, College_Name, Course_and_Course_Year, Course_Discipline_or_Branch, University_Registration_or_SATS_Number, Course_Duration, Counselling_Details, Counselling_Seat_Type, State_Scholarship_Portal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [formData.Student_ID, formData.SSLC_CBSE_ICSE_Reg_Number, formData.Student_Name_as_in_SSLC_CBSE_ICSE, formData.College_District, formData.College_Taluk, formData.University_or_Board_Name, formData.College_Name, formData.Course_and_Course_Year, formData.Course_Discipline_or_Branch, formData.University_Registration_or_SATS_Number, formData.Course_Duration, formData.Counselling_Details, formData.Counselling_Seat_Type, formData.State_Scholarship_Portal];
    db.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).send('Error inserting data');
        } else {
            res.send('Data inserted successfully');
        }
    });
});

// Route to handle caste and income certificate details form submission
app.post('/submit/caste_income', (req, res) => {
    const formData = req.body;
    const sql = 'INSERT INTO caste_income_details (Student_ID, Religion, Category, Caste_Certificate_Number, Name_as_in_Caste_Certificate, Caste, Subcaste, Income_Certificate_Number, Name_as_in_Income_Certificate, Income_in_Rs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [formData.Student_ID, formData.Religion, formData.Category, formData.Caste_Certificate_Number, formData.Name_as_in_Caste_Certificate, formData.Caste, formData.Subcaste, formData.Income_Certificate_Number, formData.Name_as_in_Income_Certificate, formData.Income_in_Rs];
    db.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).send('Error inserting data');
        } else {
            res.send('Data inserted successfully');
        }
    });
});

// Route to handle SSLC details form submission
app.post('/submit/sslc', (req, res) => {
    const formData = req.body;
    const sql = 'INSERT INTO sslc_details (SSLC_CBSE_ICSE_Reg_Number, Board_Type, Year_of_Passing, DOB) VALUES (?, ?, ?, ?)';
    const values = [formData.SSLC_CBSE_ICSE_Reg_Number, formData.Board_Type, formData.Year_of_Passing, formData.DOB];
    db.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).send('Error inserting data');
        } else {
            res.send('Data inserted successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

