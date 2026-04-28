import { useEffect, useMemo, useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { BurgerMenu } from "../../components/navigation/BurgerMenu";
import { SiteFooter } from "../../components/shell/SiteFooter";

export type SiteLayoutOutletContext = {
  setHomeFooterInView: (isInView: boolean) => void;
};

const HOME_ROUTE = "/";

export function SiteLayout() {
  const location = useLocation();
  const [isHomeFooterInView, setHomeFooterInView] = useState(false);

  const isHomeRoute = location.pathname === HOME_ROUTE;
  const showHomeFooter = isHomeRoute && isHomeFooterInView;

  useEffect(() => {
    if (!isHomeRoute) {
      setHomeFooterInView(false);
    }
  }, [isHomeRoute]);

  const outletContext = useMemo<SiteLayoutOutletContext>(
    () => ({ setHomeFooterInView }),
    []
  );

  return (
    <div className="site-root">
      <header className="site-header">
        <NavLink
          to="/"
          className={({ isActive }) => `site-brand${isActive ? " is-active" : ""}`}
          aria-label="Go to home page"
        >
          SecondPeak
        </NavLink>
        <BurgerMenu />
      </header>
      <main className="site-main">
        <Outlet context={outletContext} />
      </main>
      {showHomeFooter ? <SiteFooter /> : null}
    </div>
  );
}
