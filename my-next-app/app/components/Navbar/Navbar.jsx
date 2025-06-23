"use client";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Heart, User } from "lucide-react";
import Image from "next/image";
// import { navLinks } from "../../data/NavbarData";
import SearchBar from "./Navsearch";
import { fetchNavbarItems } from "../../utils/api"; // 👈 Import API call

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [navLinks, setNavLinks] = useState([]);

  const toggleSubmenu = (index) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    const loadNavbar = async () => {
      try {
        const data = await fetchNavbarItems();
        setNavLinks(data); // This should match your MongoDB structure
      } catch (err) {
        console.error("Error fetching navbar:", err);
      }
    };
    loadNavbar();
  }, []);

  const renderMobileSubmenu = (submenu) => {
    return submenu.map((section, subIndex) => (
      <div key={section._id || subIndex} className="mt-2 space-y-1">
        {section.heading && (
          <div className="text-sm font-semibold text-gray-700">
            {section.heading}
          </div>
        )}
        {(section.links || []).map((item, itemIndex) => (
          <a
            key={item._id || itemIndex}
            href={item.href}
            className="block text-sm text-gray-600 hover:text-black pl-2"
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
    ));
  };

  return (
    <nav className="px-4 py-3 shadow-sm">
      {/* Top Navigation */}
      <div className="flex items-center px-4 lg:px-18 justify-between">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Image
            src="/palmonas-logo.png"
            alt="PALMONAS Logo"
            width={180}
            height={50}
            className="object-contain"
          />
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="w-3/5">
            <SearchBar />
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4">
          <User className="cursor-pointer" />
          <div className="relative cursor-pointer">
            <Heart />
            <span className="absolute -top-1 -right-2 text-xs bg-black text-white rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </div>
          <div className="relative cursor-pointer">
            <ShoppingBag />
            <span className="absolute -top-1 -right-2 text-xs bg-black text-white rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mt-3 md:hidden">
        <SearchBar isMobile />
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 z-40 bg-white text-black p-6 shadow-lg transition-transform duration-500 ease-in-out transform md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setIsOpen(false)} aria-label="Close Menu">
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-4">
          {navLinks.map((link, index) => (
            <div key={link._id || index}>
              <div
                className="flex justify-between items-center cursor-pointer py-2 border-b"
                onClick={() =>
                  link.submenu ? toggleSubmenu(index) : setIsOpen(false)
                }
              >
                <div className="flex items-center space-x-2">
                  <span className="text-base font-medium">{link.label}</span>
                </div>
                {link.submenu && (
                  <span className="text-xl">
                    {openSubmenus[index] ? "−" : "+"}
                  </span>
                )}
              </div>
              {link.submenu && openSubmenus[index] && (
                <div className="pl-2">{renderMobileSubmenu(link.submenu)}</div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-center mt-8 space-x-8 text-sm font-medium text-gray-700">
        {navLinks.map((link, index) => (
          <div key={link._id || index} className="relative group">
            <div className="flex items-center space-x-1 cursor-pointer hover:text-black">
              <span>{link.label}</span>
            </div>

            {Array.isArray(link.submenu) && (
              <div className="absolute left-0 top-full mt-3 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-50 min-w-[500px] grid grid-cols-2 gap-6 p-6">
                {link.submenu.map((section, sIndex) => (
                  <div key={section._id || sIndex}>
                    {section.heading && (
                      <h4 className="text-sm font-semibold text-gray-600 mb-2 border-b pb-1">
                        {section.heading}
                      </h4>
                    )}
                    {(section.links || []).map((item, itemIndex) => (
                      <a
                        key={item._id || itemIndex}
                        href={item.href}
                        className="block text-sm text-gray-700 hover:text-black py-1"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
  