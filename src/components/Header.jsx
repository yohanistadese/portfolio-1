import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/resume", label: "Resume" },
];

export default function Header() {
  return (
    <header className="site-header">
      <nav className="nav wrap" aria-label="Main navigation">
        <div className="nav-links">
          {LINKS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end}>
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
