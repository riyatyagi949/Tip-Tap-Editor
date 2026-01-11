"use client";
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/Editor'), { 
  ssr: false,
  loading: () => <div className="h-screen flex items-center justify-center bg-slate-50 italic text-slate-400">Loading OpenSphere Editor...</div> 
});

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F1F3F4]">
      {/* Top Navbar */}
      <nav className="h-14 bg-white border-b border-gray-200 flex items-center px-6 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
          <span className="font-semibold text-gray-700 tracking-tight">LegalBridge <span className="text-gray-400 font-normal">/ Support Letter</span></span>
        </div>
      </nav>
      <Editor />
    </main>
  );
}