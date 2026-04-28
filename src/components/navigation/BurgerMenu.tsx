import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useId, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/reviews", label: "Reviews" },
  { to: "/features", label: "Features" },
  { to: "/interviews", label: "Interviews" },
  { to: "/reviews/far-lone-sails/intro", label: "Far: Lone Sails" },
  { to: "/manifesto", label: "Manifesto" },
  { to: "/contact", label: "Contact" }
];

const MENU_LABEL_OPEN = "Open navigation menu";
const MENU_LABEL_CLOSE = "Close navigation menu";
const CLOSE_MENU_ON_NAVIGATION = true;

export function BurgerMenu() {
  const location = useLocation();
  const menuId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (CLOSE_MENU_ON_NAVIGATION && open) {
      setOpen(false);
    }
  }, [location.pathname]);

  const handleMenuLinkSelect = () => {
    if (CLOSE_MENU_ON_NAVIGATION) {
      setOpen(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={`burger-button${open ? " is-open" : ""}`}
          aria-controls={menuId}
          aria-expanded={open}
          aria-label={open ? MENU_LABEL_CLOSE : MENU_LABEL_OPEN}
        >
          <span className="burger-line burger-line-top" />
          <span className="burger-line burger-line-bottom" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="menu-overlay" />
        <Dialog.Content id={menuId} className="menu-content">
          <Dialog.Title className="sr-only">Main navigation</Dialog.Title>
          <Dialog.Close asChild>
            <button
              type="button"
              className="burger-button is-open menu-close-button"
              aria-label={MENU_LABEL_CLOSE}
            >
              <span className="burger-line burger-line-top" />
              <span className="burger-line burger-line-bottom" />
            </button>
          </Dialog.Close>
          <NavLink
            to="/"
            className={({ isActive }) => `menu-brand-link${isActive ? " is-active" : ""}`}
            onClick={handleMenuLinkSelect}
          >
            SecondPeak
          </NavLink>
          <nav className="menu-nav" aria-label="Main">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `menu-link${isActive ? " is-active" : ""}`}
                onClick={handleMenuLinkSelect}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
