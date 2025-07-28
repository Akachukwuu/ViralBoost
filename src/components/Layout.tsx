import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Zap, Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                SignalPro
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`font-medium transition-colors ${
                  isActive("/")
                    ? "text-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                Home
              </Link>
              {user && (
                <Link
                  to="/generate"
                  className={`font-medium transition-colors ${
                    isActive("/generate")
                      ? "text-purple-600"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Generate
                </Link>
              )}
              <Link
                to="/pricing"
                className={`font-medium transition-colors ${
                  isActive("/pricing")
                    ? "text-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                Pricing
              </Link>

              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/auth"
                    className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-purple-100">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className={`font-medium transition-colors ${
                    isActive("/")
                      ? "text-purple-600"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                {user && (
                  <Link
                    to="/generate"
                    className={`font-medium transition-colors ${
                      isActive("/generate")
                        ? "text-purple-600"
                        : "text-gray-600 hover:text-purple-600"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Generate
                  </Link>
                )}
                <Link
                  to="/pricing"
                  className={`font-medium transition-colors ${
                    isActive("/pricing")
                      ? "text-purple-600"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>

                {user ? (
                  <div className="pt-4 border-t border-purple-100">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                      <User className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-purple-100 flex flex-col space-y-2">
                    <Link
                      to="/auth"
                      className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/auth"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-white border-t border-purple-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                SignalPro
              </span>
            </div>
            <p className="text-gray-600 text-center md:text-right">
              © 2025 SignalPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
