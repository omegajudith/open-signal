// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-[#04205f] text-white py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Copyright Notice */}
        <p>© 2025 TechSnipers. All rights reserved.</p>

        {/* Social Media Links */}
        <ul className="flex space-x-4">
          <li>
            <a
              href="https://x.com/techsnipers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-sky-300 transition-colors"
            >
              X
            </a>
          </li>
          <li>
            <a
              href="https://tiktok.com/@techsnipers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-sky-300 transition-colors"
            >
              TikTok
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/techsnipers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-sky-300 transition-colors"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}