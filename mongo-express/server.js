// backend/index.js
import express from "express";
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Function to decode base64 encoded string
function decodeBase64(encodedString) {
    return Buffer.from(encodedString, 'base64').toString('utf-8');
}

// Endpoint to submit code to JudgeAPI
app.post('/run-code', async (req, res) => {
    try {
        const { code, language } = req.body;
        console.log("Code:", code); // Log code for debugging
        console.log("Language:", language); // Log language for debugging
        
        const languageIds = {
            "javascript": 63,
            "python": 71,
            "java": 62,
            "cpp": 54
        };

        const response = await axios.post('https://judge0.p.rapidapi.com/submissions', {
            source_code: code,
            language_id: languageIds[language],
            stdin: '',
            base64_encoded: true, // Set base64_encoded to true
            fields: '*' // Receive all available attributes
        }, {
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'x-rapidapi-key': '150023bfa3msh47155ee1eba08f2p1ab268jsneeae2d2568e3', // Replace with your JudgeAPI key
            }
        });

        console.log("Response from JudgeAPI:", response.data); // Log response for debugging
        
        const submissionToken = response.data.token;
        const output = await pollSubmissionResult(submissionToken);
        const decodedOutput = decodeBase64(output); // Decode base64 encoded output
        
        res.json({ output: decodedOutput, submissionToken }); // Send decoded output and submission token in the response
    } catch (error) {
        console.error("Error:", error); // Log error for debugging
        res.status(500).json({ error: 'An error occurred' });
    }
});

async function pollSubmissionResult(submissionToken) {
    try {
        let output = null;
        let retries = 0; // Variable to limit the number of retries
        while (output === null && retries < 10) { // Limit retries to avoid infinite loop
            const response = await axios.get(`https://judge0.p.rapidapi.com/submissions/${submissionToken}`, {
                params: {
                    base64_encoded: true, // Set base64_encoded query parameter to true
                    fields: '*' // Receive all available attributes
                },
                headers: {
                    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                    'x-rapidapi-key': '150023bfa3msh47155ee1eba08f2p1ab268jsneeae2d2568e3', // Replace with your JudgeAPI key
                }
            });

            const submissionStatus = response.data.status.id;
            console.log("Submission Status:", submissionStatus); // Log submission status for debugging
            if (submissionStatus < 3) {
                // Still in queue or processing
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before polling again
                retries++; // Increment the number of retries
            } else if (submissionStatus === 3) {
                // Finished executing
                output = response.data.stdout;
            } else {
                // Submission failed
                console.error("Submission failed:", response.data); // Log submission failure for debugging
                throw new Error('Submission failed');
            }
        }
        if (output === null) {
            throw new Error('Timeout: Submission result not available');
        }
        return output;
    } catch (error) {
        throw new Error('Error polling submission result: ' + error.message);
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
