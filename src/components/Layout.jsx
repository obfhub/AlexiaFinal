import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./layout/Header";
import FooterPremium from "./layout/FooterPremium";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <FooterPremium />
    </div>
  );
}