import {
  useState,
} from "react";

import {
  NavLink,
  Outlet,
} from "react-router-dom";

const menuItems = [
  {
    text: "ホーム",
    path: "/",
    icon: "⌂",
  },
  {
    text: "予定一覧",
    path: "/events",
    icon: "□",
  },
  {
    text: "予定登録",
    path: "/events/new",
    icon: "+",
  },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const navigation = (
    <nav
      className="side-menu"
      aria-label="メインメニュー"
    >
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/"}
          className={({ isActive }) =>
            isActive
              ? "side-menu__item is-active"
              : "side-menu__item"
          }
          onClick={closeMobileMenu}
        >
          <span
            className="side-menu__icon"
            aria-hidden="true"
          >
            {item.icon}
          </span>
          <span>{item.text}</span>
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="app-shell">
      <header className="top-bar">
        <button
          type="button"
          className="icon-button top-bar__menu"
          aria-label="メニューを開く"
          aria-expanded={mobileOpen}
          onClick={() =>
            setMobileOpen(
              (current) => !current
            )
          }
        >
          <span aria-hidden="true">☰</span>
        </button>

        <h1 className="top-bar__title">
          予定管理
        </h1>
      </header>

      <aside className="desktop-sidebar">
        {navigation}
      </aside>

      {mobileOpen && (
        <div className="mobile-drawer">
          <button
            type="button"
            className="mobile-drawer__backdrop"
            aria-label="メニューを閉じる"
            onClick={closeMobileMenu}
          />

          <aside className="mobile-drawer__panel">
            {navigation}
          </aside>
        </div>
      )}

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
