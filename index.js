import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv";

const app = express();
app.use(cors());
app.use(bodyParser.json());
env.config();

// POST Route
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    // Separate numbers and alphabets
    const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
    const numbers = data.filter(item => /^[0-9]+$/.test(item));
    
    // Extract the highest lowercase alphabet
    const lowerCaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
    const highestLowercaseAlphabet = lowerCaseAlphabets.sort().pop() || null;

    // Sample file validation
    const fileValid = !!file_b64;
    const fileMimeType = fileValid ? "application/octet-stream" : null;
    const fileSizeKb = fileValid ? (Buffer.from(file_b64, 'base64').length / 1024).toFixed(2) : 0;

    // Response object
    const response = {
        is_success: true,
        user_id: "john_doe_17091999", // user ID logic
        email: "john@xyz.com", //  email 
        roll_number: "ABCD123", // roll number
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKb
    };

    res.status(200).json(response);
});

// GET Route
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});