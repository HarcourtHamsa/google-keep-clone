import React from "react";
import { TbSearch } from "react-icons/tb";
import styles from '../styles/searchBar.module.scss'

export default function searchBar() {
  return (
    <div className={styles.searchBar}>
      <TbSearch size={25} />
      <input placeholder="Search" />
    </div>
  );
}
