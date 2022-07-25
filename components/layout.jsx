import React, { useState, useRef, useEffect } from "react";
import Logo from "./logo";
import SearchBar from "./searchBar";
import styles from "../styles/layout.module.scss";
import {
  MdMenu,
  MdLightbulbOutline,
  MdDeleteOutline,
  MdOutlineModeEditOutline,
  MdOutlineArchive,
} from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { TbLayoutList, TbLayoutDashboard, TbSearch } from "react-icons/tb";
import MdMore from "./MdMore";

const SIDEBAR_ITEMS = [
  {
    icon: <MdLightbulbOutline size={25} />,
    label: "Notes",
  },
  {
    icon: <MdOutlineModeEditOutline size={25} />,
    label: "Edit labels",
  },
  {
    icon: <MdOutlineArchive size={25} />,
    label: "Archive",
  },
  {
    icon: <MdDeleteOutline size={25} />,
    label: "Bin",
  },
];

export default function Layout({ children }) {
  const [layout, setLayout] = useState("grid");
  const [navIsOpen, setNavIsOpen] = useState(true);
  const myRef = useRef(null);

  function toggleLayout() {
    setLayout(layout === "grid" ? "list" : "grid");
  }

  function toggleNav() {
    setNavIsOpen(!navIsOpen);
  }

  useEffect(() => {
    const width = window.innerWidth;
    console.log(width);

    if (width < 500) {
      setNavIsOpen(false);
    }

    return () => setNavIsOpen(true);
  }, []);

  return (
    <div>
      <div className={styles.navbar}>
        {/* column */}
        <div className="flex">
          <span className="hover_effect">
            <MdMenu size={25} onClick={() => toggleNav()} />
          </span>
          <Logo />
        </div>

        {/* column */}
        <SearchBar />

        {/* column */}
        <div className="flex">
          <span className="hover_effect">
            <TbSearch
              size={25}
              color="gray"
              className={styles.mobile_search_icon}
            />
          </span>

          <span className="hover_effect">
            {layout === "grid" ? (
              <TbLayoutList
                size={25}
                onClick={() => toggleLayout()}
                color="gray"
              />
            ) : (
              <TbLayoutDashboard
                size={25}
                onClick={() => toggleLayout()}
                color="gray"
              />
            )}
          </span>

          <span className="hover_effect">
            <FiSettings size={25} color="gray" />
          </span>

          <span className="hover_effect">
            <MdMore color="gray" />
          </span>
        </div>
      </div>
      <main className={navIsOpen ? styles.main : styles.nav_close}>
        <div className={styles.sidebar}>
          <ul className={styles.sidebar_link}>
            {SIDEBAR_ITEMS.map((item, index) => {
              return (
                <li key={index}>
                  {item.icon}
                  {navIsOpen ? <p>{item.label}</p> : null}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
