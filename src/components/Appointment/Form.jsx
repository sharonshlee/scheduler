import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import "components/Appointment/styles.scss";

export default function Form(props) {
  const { name, interviewer, interviewers, onSave, onCancel } = props;

  const [name1, setName] = useState("");
  const [interviewer1, setInterviewer] = useState(null);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => onCancel()} danger>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave({ name: name, interviewer: interviewer });
            }}
            confirm
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
