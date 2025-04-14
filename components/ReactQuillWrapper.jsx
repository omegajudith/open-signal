
'use client';

import { useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function ReactQuillWrapper({ value, onChange, className, modules }) {
  const quillRef = useRef(null);

  // Default toolbar without custom handlers
  const defaultModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['image', 'video', 'link'],
        ['clean'],
      ],
    }),
    []
  );

  // Function to move media to the top of the content
  const moveMediaToTop = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content || '<p></p>', 'text/html');
    const images = Array.from(doc.querySelectorAll('img'));
    const videos = Array.from(doc.querySelectorAll('iframe'));

    // If no media, return the original content
    if (images.length === 0 && videos.length === 0) return content;

    // Extract all media
    const media = [...images, ...videos].map(el => el.outerHTML);
    doc.querySelectorAll('img, iframe').forEach(el => el.remove());

    // Reconstruct the content with media at the top
    const remainingContent = doc.body.innerHTML || '<p></p>';
    const newContent = `<div>${media.join('')}</div>${remainingContent}`;
    return newContent;
  };

  // Handle content changes and move media to the top
  const handleChange = (newValue, delta, source, editor) => {
    if (source === 'user') {
      const updatedContent = moveMediaToTop(newValue);
      onChange(updatedContent);
    } else {
      onChange(newValue);
    }
  };

  return (
    <ReactQuill
      ref={quillRef}
      value={value}
      onChange={handleChange}
      className={className}
      modules={modules || defaultModules}
      theme="snow"
    />
  );
}













