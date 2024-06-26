const mysql = require("mysql2");

const queries = {
    //Authentication

    CreatePassawordTable:

    `CREATE TABLE IF NOT EXISTS users (
        username VARCHAR(255) PRIMARY KEY,
        password VARCHAR(255) NOT NULL
    );
    `,

    InsertIntoPassword:
    `
    INSERT INTO users (username, password) VALUES (?,?);

    `,
    FetchPassword:
    `
    SELECT username, password FROM users WHERE username = ? and password = ?;

    `,


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
    `,

    CreateAdminView:

        `
    CREATE OR REPLACE VIEW admin_view AS
SELECT 
    a.Student_ID,
    a.SSLC_CBSE_ICSE_Reg_Number,
    a.Student_Name_as_in_SSLC_CBSE_ICSE,
    a.College_District,
    a.College_Taluk,
    a.University_or_Board_Name,
    a.College_Name,
    a.Course_and_Course_Year,
    a.Course_Discipline_or_Branch,
    a.University_Registration_or_SATS_Number,
    a.Course_Duration,
    a.Counselling_Details,
    a.Counselling_Seat_Type,
    a.State_Scholarship_Portal,
    ci.Religion,
    ci.Category,
    ci.Caste_Certificate_Number,
    ci.Name_as_in_Caste_Certificate,
    ci.Caste,
    ci.Subcaste,
    ci.Income_Certificate_Number,
    ci.Name_as_in_Income_Certificate,
    ci.Income_in_Rs,
    ad.Name,
    ad.Gender,
    ad.Email,
    ad.Home_District,
    ad.Home_Taluk,
    ad.Assembly_Constituency,
    ad.Pin_Code,
    ad.Permanent_Address,
    ad.Domicile_of_Karnataka,
    s.Board_Type,
    s.DOB,
    s.Year_of_Passing
FROM 
    academic_details a, 
    address_details ad, 
    caste_income_details ci,  
    sslc_details s 
WHERE
    a.Student_ID = ad.Student_ID 
    AND ad.Student_ID = ci.Student_ID 
    AND a.SSLC_CBSE_ICSE_Reg_Number = s.SSLC_CBSE_ICSE_Reg_Number;

    `,
    GetAdminView:
        `
    SELECT * FROM admin_view ;
    
    `,
    GetAdminViewById:
        `
    SELECT * FROM admin_view WHERE Student_ID = ?;
    `,

    AcademicDetailsData:
        `select * from academic_details;`,

    AddressDetailsData:
        `select * from address_details;`,

    CasteIncomeDetailsData:
        `select * from caste_income_details;`,

    SslcDetailsData:
        `select * from sslc_details;`,

    AcademicDelete:
        `
    DELETE FROM academic_details WHERE Student_ID = ?;
    `,

    AddressDelete:
        `
    DELETE FROM caste_income_details WHERE Student_ID = ?;
    `,
    CasteIncomeDelete:
        `
    DELETE FROM address_details WHERE Student_ID = ?;
    `,
    SslcDelete:
        `
    DELETE FROM sslc_details WHERE SSLC_CBSE_ICSE_Reg_Number = (
        SELECT SSLC_CBSE_ICSE_Reg_Number FROM academic_details WHERE Student_ID = ?
        );
    `,

    ViewTigger:
        `
    select * from audit_trail;
    `,

    AnnouncementDates:
        `CREATE TABLE IF NOT EXISTS announce (
        SchemeNumber INT PRIMARY KEY,
        SchemeName VARCHAR(255) NOT NULL,
        SchemeClosingDate DATE NOT NULL,
        DefectiveAppVerificationDate DATE,
        InstituteVerificationDate DATE,
        DNO_SNO_MNO_VerificationDate DATE
    );
    
    `,

    DisplayAnnouncement:
    `
    SELECT * FROM announce;
    `,


    UpdateDates:
        `
    UPDATE announce
    SET 
        SchemeClosingDate = ?,
        DefectiveAppVerificationDate = ?,
        InstituteVerificationDate = ?,
        DNO_SNO_MNO_VerificationDate = ?
    WHERE
        SchemeNumber = ?;

    `,

    InsertIntoAnnouncement:
        `
    INSERT INTO announce(SchemeNumber, SchemeName, SchemeClosingDate, 
        DefectiveAppVerificationDate, InstituteVerificationDate, 
        DNO_SNO_MNO_VerificationDate)
VALUES (?, ?, ?, ?, ?, ?);
`,

    CountOfId:
    `SELECT COUNT(*) AS count 
    FROM (
        SELECT Student_ID FROM academic_details WHERE Student_ID = ?
        UNION ALL
        SELECT Student_ID FROM address_details WHERE Student_ID = ?
        UNION ALL
        SELECT Student_ID FROM caste_income_details WHERE Student_ID = ?
    ) AS combined_tables;
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
            await this.pool.query(queries.CreateAdminView);
            await this.pool.query(queries.AnnouncementDates);
            await this.pool.query(queries.CreatePassawordTable);



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

    async insertIntoPassword(username, password) {
        try {
            await this.pool.query(queries.InsertIntoPassword,
                [username, password]);
        } catch (error) {
            console.error('Error creating: ', error.message);
        }
    }

    async fetchPassword(username, password) {
        try {
            const [[row]] = await this.pool.query(queries.FetchPassword,
                [username, password]);

            return row;
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

    async getAdminViewById(Student_ID) {
        try {
            const [[row]] = await this.pool.query(queries.GetAdminViewById, [Student_ID]);

            return row;
        } catch (error) {
            console.error('Error creating: ', error.message);
            return [];
        }
    }

    async academicDetailsData() {
        try {
            const [rows] = await this.pool.query(queries.AcademicDetailsData);

            return rows;
        } catch (error) {
            console.error('Error creating: ', error.message);
            return [];
        }
    }

    async addressDetailsData() {
        try {
            const [rows] = await this.pool.query(queries.AddressDetailsData);

            return rows;
        } catch (error) {
            console.error('Error creating: ', error.message);
            return [];
        }
    }

    async casteIncomeDetailsData() {
        try {
            const [rows] = await this.pool.query(queries.CasteIncomeDetailsData);

            return rows;
        } catch (error) {
            console.error('Error creating: ', error.message);
            return [];
        }
    }

    async sslcDetailsData() {
        try {
            const [rows] = await this.pool.query(queries.SslcDetailsData);

            return rows;
        } catch (error) {
            console.error('Error creating: ', error.message);
            return [];
        }
    }

    async viewTrigger() {
        try {
            const [rows] = await this.pool.query(queries.ViewTigger);
            return rows;

        } catch (error) {
            console.error('Error creating: ', error.message);
            return [];
        }
    }

    async displayAnnouncement() {
        try {
            const [rows] = await this.pool.query(queries.DisplayAnnouncement);
            return rows;

        } catch (error) {
            console.error('Error creating: ', error.message);
            return [];
        }
    }

    async updateDates(SchemeClosingDate, DefectiveAppVerificationDate, InstituteVerificationDate, DNO_SNO_MNO_VerificationDate, SchemeNumber) {
        try {
            SchemeNumber = parseInt(SchemeNumber);
            const schemeExists = await this.pool.query('SELECT COUNT(*) AS count FROM announce WHERE SchemeNumber = ?', [SchemeNumber]);
    
            if (schemeExists[0][0].count === 0) {
                console.log('Scheme number does not exist');
                return false;
            } else {
                await this.pool.query(queries.UpdateDates, [SchemeClosingDate, DefectiveAppVerificationDate, InstituteVerificationDate, DNO_SNO_MNO_VerificationDate, SchemeNumber]);
                console.log('Announcement updated successfully');
                return true;
            }
        } catch (error) {
            console.error('Error updating announcement:', error);
            return false;
        }
    }
    


    async insertIntoAnnouncement(SchemeNumber, SchemeName, SchemeClosingDate, DefectiveAppVerificationDate, InstituteVerificationDate, DNO_SNO_MNO_VerificationDate) {
        try {
            await this.pool.query(queries.InsertIntoAnnouncement, [SchemeNumber, SchemeName, SchemeClosingDate, DefectiveAppVerificationDate, InstituteVerificationDate, DNO_SNO_MNO_VerificationDate]);
            return true; // Return true if the insertion is successful
        } catch (error) {
            console.error('Error creating: ', error.message);
            return false; // Return false if there's an error
        }
    }

    async countOfId(Student_ID) {
        try {
            const [[row]] = await this.pool.query(CountOfId, [Student_ID, Student_ID, Student_ID]);
            return row.count; // Return the count value
        } catch (error) {
            console.error('Error counting IDs: ', error.message);
            return false; // Return false if there's an error
        }
    }

    



    async deleteRecordss(Student_ID) {
        try {
            // Check if the student exists before attempting deletion
            const studentExists = await this.pool.query(queries.CountOfId, [Student_ID, Student_ID, Student_ID]);
            // const studentExists = await this.countOfId(Student_ID);

            // console.log("Count of student:", studentExists[0].count); // For debugging
            if (studentExists[0].count === 0) {
                // If the student does not exist, throw an error
                throw new Error('Student does not exist');
            }
            
            // Perform deletion of records
            await this.pool.query(queries.SslcDelete, [Student_ID]);
            await this.pool.query(queries.AcademicDelete, [Student_ID]);
            await this.pool.query(queries.AddressDelete, [Student_ID]);
            await this.pool.query(queries.CasteIncomeDelete, [Student_ID]);
            
    
            // If deletion is successful, return success message
            return "check the database";
        } catch (error) {
            console.error('Error deleting records:', error.message);
            // If there's an error, return an error message
            return { success: false, message: error.message };
        }
    }
    
    
    

    // async deleteRecordss1(Student_ID) {
    //     try {
    //         await this.pool.query("DELETE FROM academic_details WHERE Student_ID = ?", [Student_ID]);
    //         await this.pool.query("DELETE FROM address_details WHERE Student_ID = ?", [Student_ID]);
    //         await this.pool.query("DELETE FROM caste_income_details WHERE Student_ID = ?", [Student_ID]);
    //         await this.pool.query("DELETE FROM sslc_details WHERE SSLC_CBSE_ICSE_Reg_Number = (SELECT SSLC_CBSE_ICSE_Reg_Number FROM academic_details WHERE Student_ID = ?)", [Student_ID]);

    //         return true;
    //     }

    //     catch (error) {
    //         console.error('Error deleting records:', error.message);
    //     }
    // }

//     async deleteRecordss1(Student_ID) {
//         try {
//             // Check if the student exists before attempting deletion
//             const [academicDetailsResult] = await this.pool.query("SELECT COUNT(*) AS count FROM academic_details WHERE Student_ID = ?", [Student_ID]);
//             const [addressDetailsResult] = await this.pool.query("SELECT COUNT(*) AS count FROM address_details WHERE Student_ID = ?", [Student_ID]);
//             const [casteIncomeDetailsResult] = await this.pool.query("SELECT COUNT(*) AS count FROM caste_income_details WHERE Student_ID = ?", [Student_ID]);
//             const [sslcDetailsResult] = await this.pool.query("SELECT COUNT(*) AS count FROM sslc_details WHERE SSLC_CBSE_ICSE_Reg_Number = (SELECT SSLC_CBSE_ICSE_Reg_Number FROM academic_details WHERE Student_ID = ?)", [Student_ID]);

//             const academicDetailsCount = academicDetailsResult[0].count;
//             const addressDetailsCount = addressDetailsResult[0].count;
//             const casteIncomeDetailsCount = casteIncomeDetailsResult[0].count;
//             const sslcDetailsCount = sslcDetailsResult[0].count;

//             if (academicDetailsCount > 0 && addressDetailsCount > 0 && casteIncomeDetailsCount > 0 && sslcDetailsCount > 0) {
//                 // Perform deletion of records
//                 // Use transactions for atomicity
//                 await this.pool.beginTransaction();

//                 await this.pool.query("DELETE FROM academic_details WHERE Student_ID = ?", [Student_ID]);
//                 await this.pool.query("DELETE FROM address_details WHERE Student_ID = ?", [Student_ID]);
//                 await this.pool.query("DELETE FROM caste_income_details WHERE Student_ID = ?", [Student_ID]);
//                 await this.pool.query("DELETE FROM sslc_details WHERE SSLC_CBSE_ICSE_Reg_Number = (SELECT SSLC_CBSE_ICSE_Reg_Number FROM academic_details WHERE Student_ID = ?)", [Student_ID]);

//                 await this.pool.commit();

//                 return true; // Deletion successful
//             } else {
//                 // If the student does not exist in any relevant table, return false
//                 return false;
//             }
//         } catch (error) {
//             console.error('Error deleting records:', error.message);
//             // Rollback the transaction in case of an error
//             await this.pool.rollback();
//             throw error; // Rethrow the error to handle it in the route handler
//         }
//     }


};








module.exports = DatabaseManager;