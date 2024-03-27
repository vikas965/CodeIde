import React, { useState } from 'react';
import axios from 'axios';

function Editor() {
  const [code, setCode] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [language, setLanguage] = useState(71); // Default language ID (e.g., 71 for JavaScript)
  const [submissionToken, setSubmissionToken] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/submit-code', { code, language });
      setSubmissionToken(response.data.submissionToken);
      // Set the output received from the server
      setOutput(response.data.output);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={handleSubmit}>Submit Code</button>
      {submissionToken && <p>Submission Token: {submissionToken}</p>}
      {output && (
        <div>
          <h2>Output:</h2>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}

export default Editor;
