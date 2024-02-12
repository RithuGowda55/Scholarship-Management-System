const db = require('../config/database');

// Register function
exports.register = (req, res) => {
    const { name, email, scholarshipType } = req.body; // Example fields, adjust as per your form

    // Insert into database
    db.query('INSERT INTO students (name, email, scholarshipType) VALUES (?, ?, ?)', [name, email, scholarshipType], (err, result) => {
        if (err) {
            console.error('Error registering student: ' + err.message);
            return res.status(500).send('Error registering student');
        }
        return res.status(200).send('Student registered successfully');
    });
};

// View specifications function
exports.viewSpecifications = (req, res) => {
    // Retrieve specifications from database and send response
    db.query('SELECT * FROM specifications', (err, results) => {
        if (err) {
            console.error('Error fetching specifications: ' + err.message);
            return res.status(500).send('Error fetching specifications');
        }
        return res.status(200).json(results);
    });
};
