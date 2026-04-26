import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/reviews", label: "Reviews" },
  { to: "/features", label: "Features" },
  { to: "/interviews", label: "Interviews" },
  { to: "/reviews/far-lone-sails/intro", label: "Far: Lone Sails" },
  { to: "/manifesto", label: "Manifesto" },
  { to: "/contact", label: "Contact" }
];

export function BurgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={`burger-button${open ? " is-open" : ""}`}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        >
          <span className="burger-line burger-line-top" />
          <span className="burger-line burger-line-bottom" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="menu-overlay" />
        <Dialog.Content className="menu-content">
          <Dialog.Title className="sr-only">Main navigation</Dialog.Title>
          <nav className="menu-nav" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="menu-link"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
