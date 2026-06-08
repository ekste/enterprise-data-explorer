import { NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getPreferredTheme, type Theme } from "../utils/getPreferredTheme";

export function AppLayout() {
const [theme, setTheme] = useLocalStorage<Theme>(
  "theme",
  getPreferredTheme(),
);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <header className="appHeader">
        <div className="appHeader__brand">
          <div className="appHeader__brandName">Enterprise Data Explorer</div>
        </div>
        <nav className="appHeader__nav" aria-label="Main navigation">
          <NavLink to="/" className="appHeader__link">
            Customers
          </NavLink>
          <NavLink to="/virtualised" className="appHeader__link">
            Virtualised
          </NavLink>
        </nav>

        <button
          type="button"
          className="main__button"
          onClick={() =>
            setTheme((currentTheme) =>
              currentTheme === "light" ? "dark" : "light",
            )
          }
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>

      <Outlet />
    </>
  );
}
