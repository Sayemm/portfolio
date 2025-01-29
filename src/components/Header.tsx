import { useState } from "react";
import { Link } from "react-router-dom"; // Optional: If using React Router for navigation
import { Menu, X } from "lucide-react"; // Optional: Icons for mobile menu
import { navLinks } from "../data/navLinks";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-md fixed w-full top-0 left-0 z-0">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">MyPortfolio</h1>

        {/* Desktop Nav Link */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((item) => (
            <Link
              key={item}
              to={`#${item.toLowerCase()}`}
              className="hover:text-yellow-400 transition duration-300"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-gray-800 p-4 space-y-4">
          {navLinks.map((item) => (
            <Link
              key={item}
              to={`#${item.toLowerCase()}`}
              className="block text-center text-white hover:text-yellow-400"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
