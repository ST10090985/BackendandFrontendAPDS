const express = require('express');
const { client } = require("../Backend/db/db.js");
const cors = require('cors');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');


const app = express();
const PORT = process.env.PORT || 3000;


// const express = require('express');
// const { client } = require("../Backend/db/db.js");
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const { ObjectId } = require('mongodb');
// const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//     origin: 'https://localhost:4659', // Replace with your frontend URL
//     credentials: true // Allow credentials to be sent
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));




// Connect to the database
let db;
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db('BankingSystem');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

connectToDatabase();

//Customer functions

// Signup Endpoint
app.post('/signup', async (req, res) => {
    try {
        const { name, surname, idNumber, accountNumber, password } = req.body;
        if (!name || !surname || !idNumber || !accountNumber || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userModel = {
            fullName: `${name} ${surname}`,
            idNumber,
            accountNumber,
            password: hashedPassword,
        };

        const usersCollection = db.collection('users');
        const result = await usersCollection.insertOne(userModel);
        const userID = result.insertedId;

        res.status(201).json({
            message: `Welcome ${userModel.fullName}`,
            data: {
                userID,
                fullName: userModel.fullName,
                idNumber: userModel.idNumber,
                accountNumber: userModel.accountNumber,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    try {
        const { fullName, accountNumber, password } = req.body;
        if (!fullName || !accountNumber || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const usersCollection = db.collection('users');
        // Find user by fullName (assuming it's stored as email) and account number
        const user = await usersCollection.findOne({ fullName, accountNumber });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Successful login
        res.status(200).json({
            message: `Welcome back, ${user.fullName}`,
            userID: user._id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Post Payment
// Payments Endpoint
app.post('/payments', async (req, res) => {
    try {
        // Check if required fields are present
        const { fullName, idNumber, accountNumber, swiftCode, paymentAmount, currency, provider } = req.body;
        if (!fullName || !idNumber || !accountNumber || !swiftCode || !paymentAmount || !currency || !provider) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create payment model with status set to "Pending"
        const paymentModel = {
            fullName,
            idNumber,
            accountNumber,
            swiftCode,
            paymentAmount,
            currency,
            provider,
            status: 'Pending' // Automatically set status to Pending
        };

        const paymentsCollection = db.collection('payments');
        // Insert payment information and get the result
        const result = await paymentsCollection.insertOne(paymentModel);

        // Assign the MongoDB generated _id to paymentID
        const paymentID = result.insertedId;

        res.status(201).json({
            message: 'Payment information successfully recorded',
            paymentID,
            data: paymentModel
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


//Employee functions
// Get Payments 
app.get('/payments', async (req, res) => {
    try {
        const paymentsCollection = db.collection('payments');
        // Fetch all payments from the collection
        const payments = await paymentsCollection.find({}).toArray();

        // Check if there are no payments
        if (payments.length === 0) {
            return res.status(404).json({ message: 'No payments found' });
        }

        res.status(200).json({
            message: 'Payments retrieved successfully',
            data: payments
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Verify Payment
// Update Payment Endpoint
app.patch('/payments/:id', async (req, res) => {
    try {
        const paymentID = req.params.id;
        const { fullName, idNumber, accountNumber, swiftCode, paymentAmount, currency, provider } = req.body;

        
        const updateData = {
            status: 'Verified', // Set status to Verified
        };

        
        if (fullName) updateData.fullName = fullName;
        if (idNumber) updateData.idNumber = idNumber;
        if (accountNumber) updateData.accountNumber = accountNumber;
        if (swiftCode) updateData.swiftCode = swiftCode;
        if (paymentAmount) updateData.paymentAmount = paymentAmount;
        if (currency) updateData.currency = currency;
        if (provider) updateData.provider = provider;

        const paymentsCollection = db.collection('payments');
        // Update the payment in the database
        const result = await paymentsCollection.updateOne(
            { _id: new ObjectId(paymentID) },
            { $set: updateData }
        );

        // Check if a payment was updated
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Fetch the updated payment details
        const updatedPayment = await paymentsCollection.findOne({ _id: new ObjectId(paymentID) });

        res.status(200).json({
            message: 'Payment details updated successfully',
            data: updatedPayment
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Verify Payment
app.patch('/payments/verify/:id', async (req, res) => {
    try {
        const paymentID = req.params.id;
        const { fullName, idNumber, accountNumber, swiftCode, paymentAmount, currency, provider } = req.body;

        
        const updateData = {
            status: 'Verified', // Set status to Verified
        };

        
        if (fullName) updateData.fullName = fullName;
        if (idNumber) updateData.idNumber = idNumber;
        if (accountNumber) updateData.accountNumber = accountNumber;
        if (swiftCode) updateData.swiftCode = swiftCode;
        if (paymentAmount) updateData.paymentAmount = paymentAmount;
        if (currency) updateData.currency = currency;
        if (provider) updateData.provider = provider;

        const paymentsCollection = db.collection('payments');
        // Update the payment in the database
        const result = await paymentsCollection.updateOne(
            { _id: new ObjectId(paymentID) },
            { $set: updateData }
        );

        // Check if a payment was updated
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Fetch the updated payment details
        const updatedPayment = await paymentsCollection.findOne({ _id: new ObjectId(paymentID) });

        res.status(200).json({
            message: 'Payment details updated successfully',
            data: updatedPayment
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Deny Payment 
app.patch('/payments/deny/:id', async (req, res) => {
    try {
        const paymentID = req.params.id;

        // Update the status to "Denied"
        const updateData = {
            status: 'Denied', // Set status to Denied
        };

        const paymentsCollection = db.collection('payments');
        // Update the payment status in the database
        const result = await paymentsCollection.updateOne(
            { _id: new ObjectId(paymentID) },
            { $set: updateData }
        );

        // Check if a payment was updated
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Fetch the updated payment details
        const updatedPayment = await paymentsCollection.findOne({ _id: new ObjectId(paymentID) });

        res.status(200).json({
            message: 'Payment status updated to Denied successfully',
            data: updatedPayment
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Employee Signup 
app.post('/employee/signup', async (req, res) => {
    try {
        // Check if required fields are present
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create employee model
        const employeeModel = {
            username,
            password: hashedPassword, // Store the hashed password
        };

        const employeesCollection = db.collection('employees');
        // Insert employee information and get the result
        const result = await employeesCollection.insertOne(employeeModel);

        // Assign the MongoDB generated _id to employeeID
        const employeeID = result.insertedId;

        res.status(201).json({
            message: `Employee ${employeeModel.username} successfully registered`,
            employeeID,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Employee Login 
app.post('/employee/login', async (req, res) => {
    try {
        // Check if required fields are present
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const employeesCollection = db.collection('employees');
        // Find employee by username
        const employee = await employeesCollection.findOne({ username });

        if (!employee) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Successful login
        res.status(200).json({
            message: `Welcome back, ${employee.username}`,
            employeeID: employee._id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//module.exports = app;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

