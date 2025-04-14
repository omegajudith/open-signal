

'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#04205f]/80 backdrop-blur-md shadow-lg shadow-sky-400/50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo/Brand */}
        <Link href="/" className="text-2xl font-bold text-white">
          OpenSignal
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-white hover:text-sky-300 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-white hover:text-sky-300 transition-colors">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white hover:text-sky-300 transition-colors">
              About
            </Link>
          </li>
          {/* <li>
            <Link href="/portfolio" className="text-white hover:text-sky-300 transition-colors">
              Portfolio
            </Link>
          </li> */}
          <li>
            <Link href="/contact" className="text-white hover:text-sky-300 transition-colors">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/disclaimer" className="text-white hover:text-sky-300 transition-colors">
              Disclaimer
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}