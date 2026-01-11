# OpenSphere LegalBridge Editor

A professional, paginated rich-text editor designed for legal petitions and USCIS support letters. This editor provides a seamless word-processing experience with real-time pagination and document metadata synchronization.

## Project Overview

This project solves the challenge of visualizing page boundaries in a web-based rich-text editor. It ensures that legal professionals can draft documents with the confidence that their digital workspace matches the final printed US Letter output.

## Key Features

* **Real-time Pagination**: Automatic page detection based on US Letter (8.5" x 11") dimensions.
* **Dynamic Legal Headers and Footers**: Synchronized fields for Case Numbers, Client Names, and Attorney details across all pages.
* **Advanced Formatting Toolbar**: Over 11 formatting options including tables, text alignment, and standard typography tools.
* **Print Optimization**: CSS media queries ensure the digital editor transitions perfectly to physical print or PDF without UI artifacts.

## Tech Stack

* **Framework**: Next.js 16 (App Router)
* **Bundler**: Turbopack
* **Editor Engine**: Tiptap (ProseMirror-based)
* **Styling**: Tailwind CSS
* **Icons**: Lucide React

## Installation and Setup

1. **Clone the repository:**
```bash
git clone https://github.com/riyatyagi949/Tip-Tap-Editor.git
cd Tip-Tap-Editor

```

2. **Install dependencies:**
```bash
npm install

```


3. **Required Extensions:**
The project utilizes several Tiptap extensions. Ensure these are installed:
```bash
npm install @tiptap/extension-underline @tiptap/extension-text-align @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-cell @tiptap/extension-table-header

```


4. **Run the development server:**
```bash
npm run dev

```

## Engineering Approach

### Pagination Logic

The editor calculates document height based on a 96 DPI standard, where 11 inches equals 1056 pixels. By monitoring the `scrollHeight` of the editor's DOM elements, the application dynamically inserts visual page breaks and increments the page count.

### Architecture Challenges

* **Turbopack Compatibility**: Implemented strict ESM named imports to satisfy the Next.js 16 bundler requirements.
* **SSR Management**: Utilized `next/dynamic` with `ssr: false` and the `immediatelyRender: false` flag to prevent hydration mismatches common in DOM-heavy editors.
* **Global Headers**: Developed a state-driven header system that overlays document metadata onto the editor surface without interfering with the ProseMirror input stream.

## Future Improvements

* Implement manual hard page breaks.
* Add support for footnote management.
* Integration with backend storage for auto-saving drafts.

---

