import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { createClient } from "next-sanity";
import styles from "../styles/index.module.scss";
import Notes from "../components/notes";
import Portal from "../HOCs/Portal";
import { MdPersonAddAlt, MdUndo, MdMoreVert } from "react-icons/md";
import Card from "../components/Card";

const client = createClient({
  projectId: "jxu2d129",
  dataset: "production",
  useCdn: false,
  apiVersion: "2022-07-17",
  token: process.env.SANITY_ACCESS_TOKEN,
});

export default function Index() {
  const [notes, setNotes] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeNote, setActiveNote] = useState(null);

  const inputRef = useRef(null);

  const openModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  function toggle() {
    setIsOpen(!isOpen);
  }

  function deleteNote() {
    client
      .delete(activeNote._id)
      .then(() => {
        console.log("Note deleted");
        setActiveNote(null);
        setIsOpen(false);
      })
      .catch((err) => {
        console.error("Delete failed: ", err.message);
      });
  }

  function createNote(values) {
    client
      .create({
        _type: "notes",
        title: values.title,
        body: values.body,
      })
      .then((res) => {
        console.log(`Bike was created, document ID is ${res._id}`);
      });

      
  }

  function updateNote(values) {
    client
      .patch(activeNote._id)
      .set({ title: values.title, body: values.body })
      .commit()
      .then((doc) => {
        console.log("Hurray, the document is updated! New document:");
        console.log(doc);
      })
      .catch((err) => {
        console.error("Oh no, the update failed: ", err.message);
      });

      setActiveNote(null)
  }

  useEffect(() => {
    async function fetchData() {
      const res = await client.fetch(`*[_type=="notes"]`);
      setNotes(res);
    }

    fetchData();
  }, [notes]);

  return (
    <div className={styles.body}>
      <div className={styles.text_area}>
        {!isOpen ? (
          <input
            className={styles.catalyst}
            placeholder="Take a note..."
            onClick={() => toggle()}
            onBlur={() => toggle()}
          />
        ) : (
          <Card
            note={activeNote}
            toggle={toggle}
            deleteNote={deleteNote}
            createNote={createNote}
          />
        )}
      </div>

      <Notes notes={notes} setActiveNote={setActiveNote} />

      {activeNote && (
        <Portal>
          <div
            className={styles.overlay}
            onClick={() => setActiveNote(null)}
          ></div>
          <div className={styles.modal}>
            <Card
              note={activeNote}
              toggle={toggle}
              deleteNote={deleteNote}
              createNote={createNote}
              updateNote={updateNote}
            />
          </div>
        </Portal>
      )}
    </div>
  );
}
