import React from "react";
import Image from "next/image";
import logoPng from "../assets/images/logo.png";
import styles from "../styles/logo.module.scss";

export default function logo() {
  return (
    <div className={styles.logo}>
      <Image src={logoPng} alt="logo" />
      <p>Keep</p>
    </div>
  );
}
