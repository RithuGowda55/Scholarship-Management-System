const mysql = require("mysql2");

const queries = {
    // ACADEMIC DETAILS QUERIES

    CreateAcademicTable:
    `
    CREATE TABLE IF NOT EXISTS academic_details (
        Student_ID INT PRIMARY KEY,
        SSLC_CBSE_ICSE_Reg_Number VARCHAR(50) NOT NULL,
        Student_Name_as_in_SSLC_CBSE_ICSE VARCHAR(255) NOT NULL,
        College_District VARCHAR(100) NOT NULL,
        College_Taluk VARCHAR(100) NOT NULL,
        University_or_Board_Name VARCHAR(255) NOT NULL,
        College_Name VARCHAR(255) NOT NULL,
        Course_and_Course_Year VARCHAR(50) NOT NULL,
        Course_Discipline_or_Branch VARCHAR(255) NOT NULL,
        University_Registration_or_SATS_Number VARCHAR(50) NOT NULL,
        Course_Duration VARCHAR(50) NOT NULL,
        Counselling_Details VARCHAR(255),
        Counselling_Seat_Type VARCHAR(50) NOT NULL,
        State_Scholarship_Portal VARCHAR(50) NOT NULL  
    );

    `,
    InsertIntoAcademicTable:
    `
    INSERT INTO academic_details (Student_ID, SSLC_CBSE_ICSE_Reg_Number, Student_Name_as_in_SSLC_CBSE_ICSE, College_District, College_Taluk, University_or_Board_Name, College_Name, Course_and_Course_Year, Course_Discipline_or_Branch, University_Registration_or_SATS_Number, Course_Duration, Counselling_Details, Counselling_Seat_Type, State_Scholarship_Portal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

    `,



    // CASTE TABLE QUERIES

    CreateCasteTable:
    `
    CREATE TABLE IF NOT EXISTS caste_income_details (
        Student_ID INT PRIMARY KEY,
        Religion VARCHAR(50) NOT NULL,
        Category VARCHAR(50), 
        Caste_Certificate_Number VARCHAR(50) NOT NULL,
        Name_as_in_Caste_Certificate VARCHAR(255) NOT NULL,
        Caste VARCHAR(100),
        Subcaste VARCHAR(100),
        Income_Certificate_Number VARCHAR(50) NOT NULL,
        Name_as_in_Income_Certificate VARCHAR(255) NOT NULL,
        Income_in_Rs INT NOT NULL
    );  
    
    `,

    InsertIntoCasteTable:
    'INSERT INTO caste_income_details (Student_ID, Religion, Category, Caste_Certificate_Number, Name_as_in_Caste_Certificate, Caste, Subcaste, Income_Certificate_Number, Name_as_in_Income_Certificate, Income_in_Rs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',


    CreateAddressTable:
    `
    CREATE TABLE IF NOT EXISTS address_details (
        Student_ID INT PRIMARY KEY,
        Name VARCHAR(255),
        Gender ENUM('Male', 'Female', 'Other'),
        Email VARCHAR(255),
        Home_District VARCHAR(100),
        Home_Taluk VARCHAR(100),
        Assembly_Constituency VARCHAR(100),
        Pin_Code VARCHAR(10),
        Permanent_Address VARCHAR(255),
        Domicile_of_Karnataka ENUM('Yes', 'No')
    );
    `,

    InsertIntoAddressTable:
    `
    INSERT INTO address_details
    (Student_ID, Name, Gender, Email, Home_District, Home_Taluk, Assembly_Constituency, Pin_Code, Permanent_Address, Domicile_of_Karnataka)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,

    // sslc details

    CreateSslcTable:
    `
    CREATE TABLE IF NOT EXISTS sslc_details (
        SSLC_CBSE_ICSE_Reg_Number VARCHAR(50) PRIMARY KEY,
        Board_Type ENUM('SSLC', 'CBSE', 'ICSE', 'OTHER STATE BOARD', 'KOS', 'NIOS') NOT NULL,
        Year_of_Passing YEAR NOT NULL,
        DOB DATE NOT NULL
    );
    
    `,

    InsertIntoSslcTable:
    `INSERT INTO sslc_details (SSLC_CBSE_ICSE_Reg_Number, Board_Type, Year_of_Passing, DOB) VALUES (?, ?, ?, ?)`,

    CreateStudentView:
    `
    CREATE OR REPLACE VIEW student_view AS
    SELECT 
        a.Student_ID,
        s.DOB,
        a.SSLC_CBSE_ICSE_Reg_Number,
        c.Caste_Certificate_Number,
        c.Income_Certificate_Number,
        c.Name_as_in_Caste_Certificate,
        ad.Gender,
        ad.Email,
        ad.Domicile_of_Karnataka,
        a.Counselling_Seat_Type,
        a.State_Scholarship_Portal
    FROM 
        academic_details a, caste_income_details c, address_details ad, sslc_details s
    WHERE a.Student_ID = c.Student_ID AND c.Student_ID = ad.Student_ID AND s.SSLC_CBSE_ICSE_Reg_Number = a.SSLC_CBSE_ICSE_Reg_Number;
    `,

    GetStudentView:
    `
    SELECT * FROM student_view;
    `,

    GetStudentViewById:
    `
    SELECT * FROM student_view WHERE Student_ID = ?;
    `
};


class DatabaseManager {
    constructor() {
        this.pool = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "Oscar@123",
            database: "miniproject",
            timezone: '+00:00',
        }).promise();

        this.createTables();
    }

    async createTables() {
        try {
            await this.pool.query(queries.CreateAddressTable);
            await this.pool.query(queries.CreateAcademicTable);
            await this.pool.query(queries.CreateCasteTable);
            await this.pool.query(queries.CreateSslcTable);
            await this.pool.query(queries.CreateStudentView);
        } catch (error) {
            console.error('Error creating: ', error.message);
        }
    }

    async insertIntoAddressTable(Student_ID, Name, Gender, Email, Home_District, Home_Taluk, Assembly_Constituency, Pin_Code, Permanent_Address, Domicile_of_Karnataka) {
        try {
            await this.pool.query(queries.InsertIntoAddressTable,
                [Student_ID, Name, Gender, Email, Home_District, Home_Taluk, Assembly_Constituency, Pin_Code, Permanent_Address, Domicile_of_Karnataka]);
        } catch (error) {
            console.error('Error creating: ', error.message);
        }
    }
    
    // USER QUERIES

    // for academic_deatails

    async insertIntoAcademicTable(Student_ID, SSLC_CBSE_ICSE_Reg_Number, Student_Name_as_in_SSLC_CBSE_ICSE, College_District, College_Taluk, University_or_Board_Name, College_Name, Course_and_Course_Year, Course_Discipline_or_Branch, University_Registration_or_SATS_Number, Course_Duration, Counselling_Details, Counselling_Seat_Type, State_Scholarship_Portal) {
        try {
            await this.pool.query(queries.InsertIntoAcademicTable,
            [Student_ID, SSLC_CBSE_ICSE_Reg_Number, Student_Name_as_in_SSLC_CBSE_ICSE, College_District, College_Taluk, University_or_Board_Name, College_Name, Course_and_Course_Year, Course_Discipline_or_Branch, University_Registration_or_SATS_Number, Course_Duration, Counselling_Details, Counselling_Seat_Type, State_Scholarship_Portal]);
        } catch (error) {
            console.error('Error creating: ', error.message);
        }
    }
    // for caste details

    async insertIntoCasteTable(Student_ID, Religion, Category, Caste_Certificate_Number, Name_as_in_Caste_Certificate, Caste, Subcaste, Income_Certificate_Number, Name_as_in_Income_Certificate, Income_in_Rs) {
        try {
            await this.pool.query(queries.InsertIntoCasteTable,
            [Student_ID, Religion, Category, Caste_Certificate_Number, Name_as_in_Caste_Certificate, Caste, Subcaste, Income_Certificate_Number, Name_as_in_Income_Certificate, Income_in_Rs]);
        } catch (error) {
            console.error('Error creating: ', error.message);
        }
    }

    // for sslc details

    async insertIntoSslcTable(SSLC_CBSE_ICSE_Reg_Number, Board_Type, Year_of_Passing, DOB) {
        try {
            await this.pool.query(queries.InsertIntoSslcTable,
            [SSLC_CBSE_ICSE_Reg_Number, Board_Type, Year_of_Passing, DOB]);
        } catch (error) {
            console.error('Error creating: ', error.message);
        }
    }

    // For views

    async getStudentViewById(Student_ID) {
        try {
            const [[row]] = await this.pool.query(queries.GetStudentViewById, [Student_ID]);

            return row;
        } catch (error) {
            console.error('Error creating: ', error.message);
            return [];
        }
    }
        
    
};





module.exports = DatabaseManager;