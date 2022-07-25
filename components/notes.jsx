import React from "react";
import styles from "../styles/notes.module.scss";

export default function Notes({ notes, setActiveNote }) {
  return (
    <>
      <div className={styles.notes}>
        {notes?.map((note, index) => {
          return (
            <div key={index} onClick={() => setActiveNote(note)}>
              <h4>{note.title}</h4>
              <p>{note.body}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
