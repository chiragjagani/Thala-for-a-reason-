import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';

const ThalaComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [playVideo, setPlayVideo] = useState(false);
  const containerRef = useRef(null);
  const [showCopyButton, setShowCopyButton] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Reset validation message only if the input is a valid string or number
    if (!isNaN(value) || (typeof value === 'string' && value.length === 7)) {
      setValidationMessage('');
    }

    // Clear the result and stop playing the video when the input is empty
    if (value === '') {
      setResult('');
      setPlayVideo(false);
    }
  };

  const handleInputFocus = () => {
    // Clear validation message when input gains focus
    setValidationMessage('');
  };

  const handleSubmit = () => {
    // Validate input
    if (inputValue === '') {
      setValidationMessage('Please enter a valid string or number ❌.');
      return;
    }

    // Process the input and set the result
    if (
      (typeof inputValue === 'string' &&
        (inputValue.length === 7 || inputValue.toLowerCase() === 'dhoni')) ||
      inputValue.toLowerCase() === 'thala' ||
      inputValue === '7'
    ) {
      setResult(`${inputValue} is Thala for a reason 😃7️⃣🙌`);
      setPlayVideo(true);
    } else if (!isNaN(inputValue)) {
      const digitSum = inputValue
        .toString()
        .split('')
        .map(Number)
        .reduce((acc, digit) => acc + digit, 0);

      if (digitSum === 7) {
        setResult(`${inputValue} is Thala for a reason! 😃7️⃣🙌`);
        setPlayVideo(true);
      } else {
        setResult(`${inputValue} is Not Thala for a reason!😥`);
        setPlayVideo(false);
      }
    } else {
      setResult(`${inputValue} is Not Thala for a reason!😥`);
      setPlayVideo(false);
    }

    // Show the Copy & Share button after submitting
    setShowCopyButton(true);
  };

  const handleCopyToClipboard = () => {
    const textArea = document.createElement('textarea');
    textArea.value = result;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Result copied to clipboard!');
  };

  useEffect(() => {
    // Update the YouTube video width when the container width changes
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const youtubeComponent = document.getElementById('youtubeComponent');
        if (youtubeComponent) {
          youtubeComponent.style.width = `${containerWidth}px`;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="container mx-auto p-4 bg-white rounded shadow-md">
      <label className="block mb-2 font-semibold">
        Enter a string or number:
        <input
          type="text"
          className="border p-2 w-full mb-2 md:mb-0 md:mr-2"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
      </label>
      <button
        className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700 font-semibold w-full md:w-auto mb-2 md:mb-0"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <p className="mt-2 text-red-500 font-bold">{validationMessage}</p>
      {result && (
        <div className="flex flex-col mt-2" ref={containerRef}>
          <p className="font-bold text-blue-500">{result}</p>
          {playVideo && result.includes('Thala for a reason') && (
            <YouTube
              id="youtubeComponent"
              videoId="hYq2NkE3Sh4"
              opts={{ width: '100%', height: '360', playerVars: { autoplay: 1 } }}
            />
          )}
          <div className={`flex items-center mt-2 ${showCopyButton ? 'flex' : 'hidden'}`}>
            <button
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-2 rounded hover:from-green-500 hover:to-blue-700 ml-2 font-semibold"
              onClick={handleCopyToClipboard}
            >
              Copy & Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThalaComponent;
