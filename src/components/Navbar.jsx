const links = [
  ["Home", "#home"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Timeline", "#timeline"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <a
          href="#home"
          className="text-lg font-semibold tracking-wide text-white hover:text-white transition"
        >
          <span className="text-white/50">Dulx</span>
          <span className="text-white">Portfolio</span>
        </a>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          {links.map(([t, href]) => (
            <a
              key={t}
              href={href}
              className="relative text-white/60 hover:text-white transition duration-300 group"
            >
              {t}

              {/* Animated underline */}
              <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
