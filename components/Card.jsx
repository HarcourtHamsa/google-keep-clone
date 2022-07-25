import React, { useState } from "react";
import { useFormik } from "formik";
import styles from "../styles/card.module.scss";
import { MdPersonAddAlt, MdMoreVert } from "react-icons/md";
import { GrUndo, GrRedo } from "react-icons/gr";

function Card({ note, toggle, deleteNote, createNote, updateNote }) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: note?.title,
      body: note?.body,
    },

    onSubmit: (values) => {
      console.log(values);

      if (values.body === undefined && values.title === undefined) {
        return;
      }

      if (note) {
        updateNote(values);
        toggle();
      } else {
        createNote(values);
        formik.resetForm();
      }
    },
  });

  return (
    <div className={styles.card}>
      <input
        placeholder="Title"
        autoFocus
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
      />
      <textarea
        placeholder="Take a note..."
        name="body"
        rows={10}
        value={formik.values.body}
        onChange={formik.handleChange}
      />

      <div className="card-footer">
        <div className="icons">
          <span className="hover_effect">
            <MdPersonAddAlt />
          </span>
          <span
            className="hover_effect"
            onClick={() => setDrawerIsOpen(!drawerIsOpen)}
          >
            <MdMoreVert />
          </span>
          <span className="hover_effect">
            <GrUndo />
          </span>
          <span className="hover_effect">
            <GrRedo />
          </span>
        </div>

        <button
          type="submit"
          onClick={() => {
            formik.handleSubmit();
            toggle();
          }}
        >
          Close
        </button>

        {drawerIsOpen && (
          <div className="drawer">
            <ul>
              <li onClick={() => deleteNote()}>Delete note</li>
              <li>Add label</li>
              <li>Make a copy</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
