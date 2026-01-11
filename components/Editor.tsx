"use client";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

import { useState, useEffect } from 'react';
import { 
  Bold, Italic, Underline as UnderlineIcon, List, Heading1, Heading2, 
  Table as TableIcon, Printer, AlignLeft, AlignCenter, AlignRight, 
  ListOrdered, Strikethrough, User, Hash, Briefcase
} from 'lucide-react';

const Editor = () => {
  const [pages, setPages] = useState(1);
  // Header/Footer State
  const [caseInfo, setCaseInfo] = useState({
    caseNumber: "CASE-2026-001",
    clientName: "John Doe",
    attorneyName: "OpenSphere Legal"
  });

  const editor = useEditor({
    immediatelyRender: false, 
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: true }),
      TableRow, TableHeader, TableCell,
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[9in]',
      },
    },
    content: `<h1>Re: I-140 Petition for Extraordinary Ability</h1><p>Dear Immigration Officer, this letter is to support...</p>`,
    onUpdate: ({ editor }) => {
      const height = editor.view.dom.scrollHeight;
      setPages(Math.max(1, Math.ceil(height / 1056)));
    },
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col items-center py-6">
      
      {/* 1. Top Input Panel (For Header Info) */}
      <div className="w-full max-w-[8.5in] bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm flex flex-wrap gap-4 items-center justify-between no-print">
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
          <Hash size={16} className="text-slate-400" />
          <input 
            className="bg-transparent outline-none text-sm font-medium w-32" 
            value={caseInfo.caseNumber}
            onChange={(e) => setCaseInfo({...caseInfo, caseNumber: e.target.value})}
            placeholder="Case #"
          />
        </div>
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
          <User size={16} className="text-slate-400" />
          <input 
            className="bg-transparent outline-none text-sm font-medium w-40" 
            value={caseInfo.clientName}
            onChange={(e) => setCaseInfo({...caseInfo, clientName: e.target.value})}
            placeholder="Client Name"
          />
        </div>
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
          <Briefcase size={16} className="text-slate-400" />
          <input 
            className="bg-transparent outline-none text-sm font-medium w-40" 
            value={caseInfo.attorneyName}
            onChange={(e) => setCaseInfo({...caseInfo, attorneyName: e.target.value})}
            placeholder="Attorney/Firm"
          />
        </div>
      </div>

      {/* 2. Premium Toolbar */}
      <div className="sticky top-[68px] z-40 bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm rounded-2xl p-1.5 mb-10 flex items-center gap-0.5 px-3 no-print">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} icon={<Bold size={18} />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} icon={<Italic size={18} />} />
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} icon={<UnderlineIcon size={18} />} />
        <div className="w-[1px] h-6 bg-gray-200 mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} icon={<Heading1 size={18} />} />
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} icon={<AlignCenter size={18} />} />
        <div className="w-[1px] h-6 bg-gray-200 mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} icon={<List size={18} />} />
        <ToolbarButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()} active={false} icon={<TableIcon size={18} />} />
        <button onClick={() => window.print()} className="ml-2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"><Printer size={18} /></button>
      </div>

      {/* 3. Editor Surface with Fixed Header/Footer */}
      <div className="relative shadow-2xl printable-area bg-white">
        
        {/* Dynamic Headers/Footers on every page */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {Array.from({ length: pages }).map((_, i) => (
            <div key={i} className="absolute w-full" style={{ top: `${i * 11}in`, height: '11in' }}>
              
              {/* Header Section */}
              <div className="flex justify-between items-center px-[1in] py-10 text-[10px] text-gray-400 border-b border-gray-50 uppercase tracking-widest font-medium">
                <span>{caseInfo.attorneyName}</span>
                <span>Case: {caseInfo.caseNumber}</span>
              </div>

              {/* Page Number (Footer) */}
              <div className="absolute bottom-10 w-full text-center text-xs text-gray-300 font-serif italic">
                {caseInfo.clientName} — Page {i + 1} of {pages}
              </div>

              {/* Page Break Line (Editor only) */}
              <div className="absolute bottom-0 w-full border-t border-dashed border-gray-200 no-print" />
            </div>
          ))}
        </div>

        {/* Real Editor Content */}
        <div className="relative z-10">
           <EditorContent editor={editor} />
        </div>
      </div>

      <style jsx global>{`
        .printable-area {
          width: 8.5in;
          min-height: 11in;
          padding: 1.5in 1in 1.2in 1in; /* Top padding increased for Header */
          position: relative;
        }

        .ProseMirror {
          outline: none !important;
        }

        @media print {
          @page { size: letter; margin: 0; }
          body { background: white !important; }
          .no-print { display: none !important; }
          .printable-area {
            box-shadow: none !important;
            border: none !important;
            padding: 1.5in 1in 1.2in 1in !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

const ToolbarButton = ({ onClick, active, icon }: { onClick: () => void, active: boolean, icon: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-xl transition-all ${
      active ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-100 text-slate-500'
    }`}
  >
    {icon}
  </button>
);

export default Editor;