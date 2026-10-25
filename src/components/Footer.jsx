export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-5 md:px-10 py-8">
      <div className="mx-auto max-w-6xl text-xs text-white/45">
        © {new Date().getFullYear()} • Built with React + Vite 
      </div>
    </footer>
  );
}
