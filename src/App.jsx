import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

const App = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  // New states for texts
  const [primaryText, setPrimaryText] = useState('');

  const posterRef = useRef();

  useEffect(() => {
    return () => {
      if (uploadedImage) URL.revokeObjectURL(uploadedImage);
    };
  }, [uploadedImage]);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const downloadAsPNG = () => {
    if (!posterRef.current) return;

    html2canvas(posterRef.current, { useCORS: true, scale: 2 }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'poster.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  return (
    <div className="poster-container">
      <div className="poster-wrapper" ref={posterRef}>
        <img
          src="/msf nellaya pravarthana fund.png"
          alt="Poster Background"
          className="poster-bg"
        />

        {/* Upload Area */}
        <label className="upload-area" title="Click to upload image">
          {uploadedImage && (
            <div className="image-wrapper">
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="uploaded-image"
                style={{
                  transform: `scale(${zoom}) translate(${offsetX}px, ${offsetY}px)`,
                }}
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </label>

        {/* Display texts on poster */}
        <p className="text-primary">{primaryText || 'Primary text here'}</p>
     
      </div>

      {/* Text input controls */}
      <div className="controls-container">
        <div
          className="control-group"
          style={{ flexDirection: 'column', alignItems: 'flex-start' }}
        >
          <label htmlFor="primaryText">Primary Text:</label>
          <textarea
            id="primaryText"
            rows="2"
            style={{ width: '100%', maxWidth: '768px' }}
            value={primaryText}
            onChange={e => setPrimaryText(e.target.value)}
            placeholder="Enter primary text"
          />
        </div>

        {/* Image Controls only show if image uploaded */}
        {uploadedImage && (
          <>
            <div className="control-group">
              <label htmlFor="zoom">Zoom:</label>
              <input
                type="range"
                id="zoom"
                min="1"
                max="2"
                step="0.01"
                value={zoom}
                onChange={e => setZoom(parseFloat(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label htmlFor="offsetX">Left/Right:</label>
              <input
                type="range"
                id="offsetX"
                min="-50"
                max="50"
                step="1"
                value={offsetX}
                onChange={e => setOffsetX(parseInt(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label htmlFor="offsetY">Up/Down:</label>
              <input
                type="range"
                id="offsetY"
                min="-50"
                max="50"
                step="1"
                value={offsetY}
                onChange={e => setOffsetY(parseInt(e.target.value))}
              />
            </div>
          </>
        )}
      </div>

      <button className="download-button" onClick={downloadAsPNG}>
        Download as PNG
      </button>
    </div>
  );
};

export default App;
