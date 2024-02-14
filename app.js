// hdvjshhkbkzlbzhsdbvljdshvljn
// Import required modules
const express = require('express');
const mysql = require('mysql2');
const router = express.Router(); 
// const path = require('path'); 

// Create an Express application
const app = express();
const port = 5500;

// app.set('views', path.join(__dirname, 'views'));

// Set the view engine to 'ejs'
// app.set('view engine', 'ejs');

// Database handler
const DatabaseManager = require('./database');
const DBHandler = new DatabaseManager();

// Create a MySQL connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'Oscar@123', // Replace with your MySQL password
    database: 'miniproject' // Replace with your MySQL database name
}).promise();

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
    res.sendFile(__dirname + '/frontend/views/index.html');
});

app.get('/authentication1.html', (req, res) => {
    res.sendFile(__dirname + '/frontend/views/authentication1.html');
});
app.get('/student.html', (req, res) => {
    res.sendFile(__dirname + '/frontend/views/student.html');
});
app.get('/register.html', (req, res) => {
    res.sendFile(__dirname + '/frontend/views/register.html');
});

app.get('/acknowledge.html', (req, res) => {
    res.sendFile(__dirname + '/frontend/views/acknowledge.html');
});

app.get('/authentication2.html', (req, res) => {
    res.sendFile(__dirname + '/frontend/views/authentication2.html');
});

app.get('/admin_dashboard.html', (req, res) => {
    res.sendFile(__dirname + '/frontend/views/admin_dashboard.html');
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/frontend/views/index.html');
});

app.get('/studentopt.html', (req, res) => {
    res.sendFile(__dirname + '/frontend/views/studentopt.html');
});

app.get('/viewspec', (req, res) => {
    res.sendFile(__dirname + '/frontend/views/viewspec.html');
});

app.get('/view1', (req, res) => {
    res.sendFile(__dirname + '/frontend/views/viewspec.html');
});

// this is for address details

// Route to handle address details form submission
app.post('/Next1', async (req, res) => {
    const formData = req.body;

    await DBHandler.insertIntoAddressTable(formData.Student_ID, formData.Name, formData.Gender, formData.Email, formData.Home_District, formData.Home_Taluk, formData.Assembly_Constituency, formData.Pin_Code, formData.Permanent_Address, formData.Domicile_of_Karnataka);
});

app.post('/Next2', async (req, res) => {
    const formData = req.body;
    
    await DBHandler.insertIntoAcademicTable(formData.Student_ID, formData.SSLC_CBSE_ICSE_Reg_Number, formData.Student_Name_as_in_SSLC_CBSE_ICSE, formData.College_District, formData.College_Taluk, formData.University_or_Board_Name, formData.College_Name, formData.Course_and_Course_Year, formData.Course_Discipline_or_Branch, formData.University_Registration_or_SATS_Number, formData.Course_Duration, formData.Counselling_Details, formData.Counselling_Seat_Type, formData.State_Scholarship_Portal);
    
});

app.post('/Next3', async (req, res) => {
    const formData = req.body;
   
    await DBHandler.insertIntoCasteTable(formData.Student_ID, formData.Religion, formData.Category, formData.Caste_Certificate_Number, formData.Name_as_in_Caste_Certificate, formData.Caste, formData.Subcaste, formData.Income_Certificate_Number, formData.Name_as_in_Income_Certificate, formData.Income_in_Rs);
});

app.post('/Next4', async (req, res) => {
    const formData = req.body;

    await DBHandler.insertIntoSslcTable(formData.SSLC_CBSE_ICSE_Reg_Number, formData.Board_Type, formData.Year_of_Passing, formData.DOB);

    
    res.sendFile(__dirname + '/frontend/views/acknowledge.html');
});

// app.get('/student/${Student_ID}', async (req, res) => {
//     const studentId = req.params.id;

//     try {
//         // Call your function to fetch student information based on the studentId
//         const student = await DBHandler.getStudentViewById(studentId);

//         // Check if student is found
        // if (student) {
        //     // Send the student information as JSON response
        //     res.json(student);
        // } else {
        //     // If student is not found, send a 404 response
        //     res.status(404).json({ error: 'Student not found' });
        // }
//     } catch (error) {
//         // If there's an error, send a 500 response
//         console.error('Error fetching student:', error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

app.get('/student/:Student_ID', async (req, res) => {
    const studentId = req.params.Student_ID; // Extracting student ID from the route parameter
    console.log(studentId);
    
    try {
        const student = await DBHandler.getStudentViewById(studentId);

        if (student) {
            // Send the student information as JSON response
            res.json(student);
            // res.render('viewspec', { student });
            return;
        } else {
            // If student is not found, send a 404 response
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        // If there's an error, send a 500 response
        console.error('Error fetching student:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }

    // Send the viewspec.html file regardless of whether the student was found or not
    // res.sendFile(__dirname + '/frontend/views/viewspec.html');
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});