export default function Footer() {
  return (
    <footer className="px-5 md:px-10 pb-10">
      <div className="mx-auto max-w-6xl text-xs text-white/45">
        © {new Date().getFullYear()} • Built with React + Vite 
      </div>
    </footer>
  );
}
