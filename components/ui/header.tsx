'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';

interface HeaderProps {
  onNavClick: (id: string) => void;
}

const links = [
  { label: 'Services', id: 'services' },
  { label: 'Stories', id: 'testimonials' },
  { label: 'About', id: 'about' },
];

export function Header({ onNavClick }: HeaderProps) {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleNavClick = (id: string) => {
    setOpen(false);
    onNavClick(id);
  };

  const isDark = scrolled || open;

  return (
    <header
      className={cn(
        'sticky top-0 z-[200] flex w-full justify-center md:transition-all md:ease-out',
        { 'md:top-4': scrolled && !open },
      )}
    >
      <div
        className={cn(
          'w-full max-w-5xl',
          { 'md:max-w-4xl md:rounded-2xl md:shadow-lg': scrolled && !open },
        )}
        style={{
          background: isDark ? 'var(--primary)' : 'var(--bg)',
          borderColor: isDark ? 'rgba(156,213,255,0.18)' : 'rgba(53,88,114,0.1)',
          backdropFilter: scrolled && !open ? 'blur(12px)' : undefined,
        }}
      >
        <nav
          className="flex w-full items-center justify-between md:transition-all md:ease-out"
          style={{ height: '70px', paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 bg-transparent border-0 cursor-pointer select-none"
            style={{ padding: 0 }}
            aria-label="Go to top"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="8" stroke={isDark ? '#9CD5FF' : '#7AAACE'} strokeWidth="1.5" />
              <circle cx="10" cy="10" r="3" fill={isDark ? '#9CD5FF' : '#7AAACE'} />
            </svg>
            <span
              className="text-[1.2rem] font-semibold tracking-[0.02em] transition-colors duration-300"
              style={{ fontFamily: 'var(--display)', color: isDark ? 'var(--text-on-dark)' : 'var(--primary)' }}
            >
              AAMO
            </span>
          </button>

          {/* Desktop links + CTA */}
          <div className="hidden items-center gap-4 md:flex">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="rounded-md text-[0.875rem] font-normal tracking-[0.04em] bg-transparent border-0 cursor-pointer transition-colors duration-200"
                style={{
                  color: scrolled ? 'rgba(247,248,240,0.7)' : 'rgba(53,88,114,0.78)',
                  padding: '0.5rem 1.25rem',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.color = scrolled ? 'var(--text-on-dark)' : 'var(--primary)';
                  el.style.background = scrolled ? 'rgba(122,170,206,0.12)' : 'rgba(53,88,114,0.06)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.color = scrolled ? 'rgba(247,248,240,0.7)' : 'rgba(53,88,114,0.78)';
                  el.style.background = 'transparent';
                }}
                onFocus={e => {
                  const el = e.currentTarget;
                  el.style.color = scrolled ? 'var(--text-on-dark)' : 'var(--primary)';
                  el.style.background = scrolled ? 'rgba(122,170,206,0.12)' : 'rgba(53,88,114,0.06)';
                }}
                onBlur={e => {
                  const el = e.currentTarget;
                  el.style.color = scrolled ? 'rgba(247,248,240,0.7)' : 'rgba(53,88,114,0.78)';
                  el.style.background = 'transparent';
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className="rounded-lg font-semibold text-[0.825rem] whitespace-nowrap border-0 cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-md"
              style={{
                background: scrolled ? 'var(--accent-lt)' : 'var(--primary)',
                color: scrolled ? 'var(--primary)' : 'var(--text-on-dark)',
                padding: '0.5rem 1.5rem',
                marginLeft: '1rem',
              }}
            >
              Book Free Consult
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md border-0 cursor-pointer bg-transparent"
            style={{ color: isDark ? 'var(--text-on-dark)' : 'var(--primary)' }}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </button>
        </nav>

        {/* Mobile fullscreen overlay */}
        <div
          className={cn(
            'fixed top-[70px] right-0 bottom-0 left-0 z-[199] flex flex-col overflow-hidden md:hidden',
            open ? 'block' : 'hidden',
          )}
          style={{ background: 'var(--primary)', borderTop: '1px solid rgba(156,213,255,0.18)' }}
        >
          <div
            data-slot={open ? 'open' : 'closed'}
            className={cn(
              'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
              'flex h-full w-full flex-col justify-between gap-y-2',
            )}
            style={{ padding: '1rem' }}
          >
            <div className="grid gap-y-1">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="w-full text-left rounded-lg text-[1rem] border-0 cursor-pointer transition-colors duration-150 bg-transparent"
                  style={{ fontFamily: 'var(--sans)', color: 'var(--text-on-dark)', padding: '0.75rem 1rem' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(122,170,206,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  onFocus={e => { e.currentTarget.style.background = 'rgba(122,170,206,0.12)'; }}
                  onBlur={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2" style={{ paddingBottom: '1rem' }}>
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full rounded-full font-semibold text-[0.95rem] border-0 cursor-pointer transition-colors duration-200"
                style={{ background: 'var(--secondary)', color: 'var(--text-on-dark)', padding: '0.75rem' }}
              >
                Book Free Consultation →
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
