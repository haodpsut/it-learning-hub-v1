
import React, { useState, useEffect, useCallback } from 'react';
import ContentPanel from './ContentPanel';

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const initialHtml = `<h1>Hello, Coder!</h1>
<p>You can write your HTML here.</p>
<button id="myBtn">Click Me</button>
`;
const initialCss = `body {
  font-family: sans-serif;
  color: #333;
  text-align: center;
  margin-top: 50px;
}
button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
}
`;
const initialJs = `const button = document.getElementById('myBtn');
button.addEventListener('click', () => {
  alert('JavaScript is working!');
});
`;

const HtmlCssJsLab: React.FC = () => {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [srcDoc, setSrcDoc] = useState('');
  const [showHint, setShowHint] = useState(false);

  const debouncedHtml = useDebounce(html, 500);
  const debouncedCss = useDebounce(css, 500);
  const debouncedJs = useDebounce(js, 500);
  
  const updateSrcDoc = useCallback(() => {
    setSrcDoc(`
      <html>
        <head>
          <style>${debouncedCss}</style>
        </head>
        <body>
          ${debouncedHtml}
          <script>${debouncedJs}<\/script>
        </body>
      </html>
    `);
  }, [debouncedHtml, debouncedCss, debouncedJs]);

  useEffect(() => {
    const timer = setTimeout(() => updateSrcDoc(), 250);
    return () => clearTimeout(timer);
  }, [debouncedHtml, debouncedCss, debouncedJs, updateSrcDoc]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full min-h-[80vh]">
      <div className="flex flex-col gap-4">
        <ContentPanel title="Problem Description" className="flex-shrink-0">
          <p className="text-gray-300">
            Welcome to the web development lab! Your task is to use HTML, CSS, and JavaScript to create a simple interactive element.
            Try modifying the code to change the text, style the button differently, or alter the JavaScript alert message.
          </p>
          <div className="mt-4">
             <button
                onClick={() => setShowHint(!showHint)}
                className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
              >
                {showHint ? 'Hide' : 'Show'} Hint
              </button>
              {showHint && <p className="text-yellow-300 mt-2 p-3 bg-gray-700/50 rounded">Hint: Try changing the `background-color` in the CSS tab to another value like `red` or `#28a745`.</p>}
          </div>
        </ContentPanel>
        <div className="flex-1 grid grid-rows-3 gap-2">
            <EditorPanel title="HTML" value={html} onChange={setHtml} />
            <EditorPanel title="CSS" value={css} onChange={setCss} />
            <EditorPanel title="JavaScript" value={js} onChange={setJs} />
        </div>
      </div>
      <div className="flex flex-col">
          <ContentPanel title="Live Preview" className="flex-1 flex flex-col">
              <iframe
                  srcDoc={srcDoc}
                  title="output"
                  sandbox="allow-scripts"
                  className="w-full h-full flex-1 bg-white rounded-md border-4 border-gray-700"
              />
          </ContentPanel>
      </div>
    </div>
  );
};

interface EditorPanelProps {
    title: string;
    value: string;
    onChange: (value: string) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({title, value, onChange}) => (
    <div className="bg-gray-800 rounded-lg flex flex-col h-full">
        <div className="bg-gray-700 px-4 py-2 rounded-t-lg font-mono text-sm">{title}</div>
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 w-full p-2 bg-gray-900 text-gray-200 font-mono text-sm resize-none border-t-0 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            spellCheck="false"
        />
    </div>
);


export default HtmlCssJsLab;
