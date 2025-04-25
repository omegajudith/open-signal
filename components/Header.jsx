
// 'use client';

// import Link from 'next/link';
// import { useState } from 'react';

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-[#04205f]/80 backdrop-blur-md shadow-lg shadow-sky-400/50">
//       <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
//         <Link href="/" className="text-xl sm:text-2xl font-bold text-white">
//           OpenSignal
//         </Link>

//         <div className="hidden sm:flex space-x-6">
//           <Link href="/" className="text-white hover:text-sky-300 transition-colors">
//             Home
//           </Link>
//           <Link href="/blog" className="text-white hover:text-sky-300 transition-colors">
//             Blog
//           </Link>
//           <Link href="/about" className="text-white hover:text-sky-300 transition-colors">
//             About
//           </Link>
//           {/* <Link href="/portfolio" className="text-white hover:text-sky-300 transition-colors">
//             Portfolio
//           </Link> */}
//           <Link href="/contact" className="text-white hover:text-sky-300 transition-colors">
//             Contact
//           </Link>
//           <Link href="/disclaimer" className="text-white hover:text-sky-300 transition-colors">
//             Disclaimer
//           </Link>
//         </div>

//         <button
//           className="sm:hidden text-white focus:outline-none bg-[#04205f]/90 p-2 rounded-md"
//           onClick={toggleMenu}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
//           </svg>
//         </button>
//       </nav>

//       <div
//         className={`sm:hidden fixed top-0 right-0 h-full w-64 bg-[#04205f]/90 backdrop-blur-md shadow-lg transition-transform duration-300 ease-in-out ${
//           isMenuOpen ? 'animate-slideIn' : 'animate-slideOut hidden'
//         }`}
//       >
//         <div className="flex justify-end p-4">
//           <button onClick={toggleMenu} className="text-white focus:outline-none">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//         <ul className="flex flex-col space-y-6 px-6">
//           <li>
//             <Link href="/" className="text-white hover:text-sky-300 transition-colors text-lg" onClick={toggleMenu}>
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link href="/blog" className="text-white hover:text-sky-300 transition-colors text-lg" onClick={toggleMenu}>
//               Blog
//             </Link>
//           </li>
//           <li>
//             <Link href="/about" className="text-white hover:text-sky-300 transition-colors text-lg" onClick={toggleMenu}>
//               About
//             </Link>
//           </li>
//           {/* <li>
//             <Link href="/portfolio" className="text-white hover:text-sky-300 transition-colors text-lg" onClick={toggleMenu}>
//               Portfolio
//             </Link>
//           </li> */}
//           <li>
//             <Link href="/contact" className="text-white hover:text-sky-300 transition-colors text-lg" onClick={toggleMenu}>
//               Contact
//             </Link>
//           </li>
//           <li>
//             <Link href="/disclaimer" className="text-white hover:text-sky-300 transition-colors text-lg" onClick={toggleMenu}>
//               Disclaimer
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </header>
//   );
// }








'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#04205f]/80 backdrop-blur-md shadow-lg shadow-sky-400/50">
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl sm:text-2xl font-bold text-white">
          OpenSignal
        </Link>

        <div className="hidden sm:flex space-x-6">
          <Link href="/" className="text-white hover:text-sky-300 transition-colors">
            Home
          </Link>
          <Link href="/blog" className="text-white hover:text-sky-300 transition-colors">
            Blog
          </Link>
          <Link href="/about" className="text-white hover:text-sky-300 transition-colors">
            About
          </Link>
          {/* <Link href="/portfolio" className="text-white hover:text-sky-300 transition-colors">
            Portfolio
          </Link> */}
          <Link href="/contact" className="text-white hover:text-sky-300 transition-colors">
            Contact
          </Link>
          <Link href="/disclaimer" className="text-white hover:text-sky-300 transition-colors">
            Disclaimer
          </Link>
        </div>

        <button
          className="sm:hidden text-white focus:outline-none bg-[#04205f]/90 p-3 rounded-md border-2 border-white/30"
          onClick={toggleMenu}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </nav>

      <div
        className={`sm:hidden fixed top-0 right-0 h-full w-64 bg-[#04205f]/90 backdrop-blur-md shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'animate-slideIn' : 'animate-slideOut hidden'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col space-y-6 px-6">
          <li>
            <Link href="/" className="text-white hover:text-sky-300 transition-colors text-lg" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-white hover:text-sky-300 transition-colors text-lg" onClick={toggleMenu}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white hover:text-sky-300 transition-colors text-lg" onClick={toggleMenu}>
              About
            </Link>
          </li>
          {/* <li>
            <Link href="/portfolio" className="text-white hover:text-sky-300 transition-colors text-lg" onClick={toggleMenu}>
              Portfolio
            </Link>
          </li> */}
          <li>
            <Link href="/contact" className="text-white hover:text-sky-300 transition-colors text-lg" onClick={toggleMenu}>
              Contact
            </Link>
              Contact
            </li>
          <li>
            <Link href="/disclaimer" className="text-white hover:text-sky-300 transition-colors text-lg" onClick={toggleMenu}>
              Disclaimer
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}