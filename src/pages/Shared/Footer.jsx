import React from "react";
import Logo from "../../components/Logo";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-20">
      {/* Gradient divider (same as navbar) */}
      <div className="h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="mt-6 rounded-2xl bg-white/70 backdrop-blur-xl shadow-lg border border-gray-200">
          <div className="px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="space-y-4">
              <Logo />
              <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                ScholarStream helps students discover verified scholarships and
                manage applications worldwide — simple, fast, and reliable.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="hover:text-indigo-600 transition">
                  <a href="/">Home</a>
                </li>
                <li className="hover:text-indigo-600 transition">
                  <a href="/all-scholarships">All Scholarships</a>
                </li>
                <li className="hover:text-indigo-600 transition">
                  <a href="/dashboard">Dashboard</a>
                </li>
                <li className="hover:text-indigo-600 transition">
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="hover:text-indigo-600 transition">
                  <a href="/about">About Us</a>
                </li>
                <li className="hover:text-indigo-600 transition">
                  <a href="/faq">FAQs</a>
                </li>
                <li className="hover:text-indigo-600 transition">
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li className="hover:text-indigo-600 transition">
                  <a href="/terms">Terms & Conditions</a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">
                Stay Connected
              </h4>
              <div className="flex gap-3">
                {[FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube].map(
                  (Icon, idx) => (
                    <a
                      key={idx}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-indigo-500 hover:text-indigo-600 hover:shadow-md transition-all"
                    >
                      <Icon />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} ScholarStream. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
