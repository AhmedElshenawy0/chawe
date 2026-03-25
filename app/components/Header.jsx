function Header() {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#f8f9fd]">
      <h1 className="text-lg font-bold text-[#49225b]">WE AI Assistant</h1>

      <div className="flex items-center gap-6 text-[#655a70]">
        <div className="flex items-center gap-2 cursor-pointer">
          🌐 <span>العربية</span>
        </div>
        ❓
      </div>
    </header>
  );
}
