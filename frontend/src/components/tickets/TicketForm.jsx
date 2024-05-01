import React, { useEffect } from 'react';
import Quill from 'quill';

export default function TicketForm() {
  useEffect(() => {
    const quill = new Quill("#editor", {
      theme: "snow",
    });
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/quill@2.0.0/dist/quill.snow.css"
        rel="stylesheet"
      />
      <div id="editor">
        <p>Hello World!</p>
        <p>Some initial <strong>bold</strong> text</p>
        <p><br /></p>
      </div>
    </>
  );
}
