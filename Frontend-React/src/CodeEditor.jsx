import React, { useState } from 'react';
import axios from 'axios';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp'; // For C++


import 'ace-builds/src-noconflict/theme-monokai';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const languageOptions = [
    
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
  ];

  const runCode = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Code:', code); // Log the code before sending the request
      console.log('Selected Language:', selectedLanguage); // Log the selected language before sending the request
      
      const response = await axios.post('https://codeide-ir8y.onrender.com/run-code', { code, language: selectedLanguage });
      console.log('Response:', response.data); // Log the response after receiving it
      setOutput(response.data.output);
    } catch (error) {
      setError('An error occurred while running the code.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  console.log('Rendering CodeEditor component'); // Log when the component is rendered
  const getAceMode = (selectedLanguage) => {
    switch (selectedLanguage) {
      case 'javascript':
        return 'javascript';
      case 'python':
        return 'python';
      case 'cpp':
        return 'c_cpp';
      case 'java':
        return 'java';
      default:
        return 'javascript'; // Default to JavaScript mode
    }
  };
  return (
    <div className="code-editor-container">
      <div className="editor-header">
        <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <h2>Code Editor</h2>
        <button onClick={runCode} disabled={loading}>
          {loading ? 'Running...' : 'Run Code'}
        </button>
      </div>
      <div className="editor-wrapper">
        <AceEditor
          mode={getAceMode(selectedLanguage)}
          theme="monokai"
          value={code}
          onChange={setCode}
          fontSize={18}
          lineHeight={24}
          width="100%"
          height="100vh" // 70% of the viewport height
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
        <div className="output-container">
          <div style={{color:"wheatsmoke"}} className="output-header">Output</div>
          <div className="output-content">{output}</div>
          {error && <div className="error-message">Error: {error}</div>}
        </div>
       
      </div>
      
    </div>
  );
};

export default CodeEditor;
