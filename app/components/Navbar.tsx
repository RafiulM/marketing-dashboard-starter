import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import './Navbar.module.css';

interface NavbarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  brand?: {
    name: string;
    logo?: string;
  };
}

interface NavLink {
  href: string;
  label: string;
  active?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  user = { name: 'John Doe', email: 'john@example.com' },
  brand = { name: 'Marketing Dashboard' }
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks: NavLink[] = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/reports', label: 'Reports' },
  ];

  const handleLogout = () => {
    window.location.href = '/api/auth/logout';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Logo/Title */}
        <div className="navbar-brand">
          <Link href="/dashboard" className="navbar-brand-link">
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className="navbar-logo" />
            ) : (
              <span className="navbar-brand-text">{brand.name}</span>
            )}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-nav-desktop">
          <ul className="navbar-nav-list">
            {navLinks.map((link) => (
              <li key={link.href} className="navbar-nav-item">
                <Link
                  href={link.href}
                  className={`navbar-nav-link ${
                    isActive(link.href) ? 'navbar-nav-link-active' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* User Menu */}
        <div className="navbar-user-menu">
          <DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="navbar-user-trigger">
                <div className="navbar-user-info">
                  <span className="navbar-user-name">{user.name}</span>
                  <span className="navbar-user-email">{user.email}</span>
                </div>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="navbar-user-avatar" />
                ) : (
                  <div className="navbar-user-avatar-placeholder">
                    <User className="navbar-user-avatar-icon" />
                  </div>
                )}
                <ChevronDown className={`navbar-user-chevron ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="navbar-user-dropdown">
              <DropdownMenuLabel className="navbar-user-dropdown-label">
                {user.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="navbar-user-dropdown-item">
                <User className="navbar-user-dropdown-icon" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="navbar-user-dropdown-item navbar-user-dropdown-logout"
                onClick={handleLogout}
              >
                <LogOut className="navbar-user-dropdown-icon" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-mobile-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <X className="navbar-mobile-icon" />
          ) : (
            <Menu className="navbar-mobile-icon" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="navbar-mobile">
          <ul className="navbar-mobile-list">
            {navLinks.map((link) => (
              <li key={link.href} className="navbar-mobile-item">
                <Link
                  href={link.href}
                  className={`navbar-mobile-link ${
                    isActive(link.href) ? 'navbar-mobile-link-active' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="navbar-mobile-user">
            <div className="navbar-mobile-user-info">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="navbar-mobile-user-avatar" />
              ) : (
                <div className="navbar-mobile-user-avatar-placeholder">
                  <User className="navbar-mobile-user-avatar-icon" />
                </div>
              )}
              <div className="navbar-mobile-user-details">
                <span className="navbar-mobile-user-name">{user.name}</span>
                <span className="navbar-mobile-user-email">{user.email}</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="navbar-mobile-logout"
              onClick={handleLogout}
            >
              <LogOut className="navbar-mobile-logout-icon" />
              Log out
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;