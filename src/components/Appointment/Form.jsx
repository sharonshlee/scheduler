import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import "components/Appointment/styles.scss";

export default function Form(props) {
  const { interviewers, onSave, onCancel } = props;

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState({});

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  function validate() {
    if (!name) {
      setError({ name: "Student name cannot be blank" });
      return;
    }

    if (!interviewer) {
      setError({ interviewer: "An interviewer must be selected" });
      return;
    }

    setError({});
    onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setError((prev) => ({ ...prev, name: "" }));
            }}
          />
        </form>

        <section className="appointment__validation">{error.name}</section>
        <div className="appointment__interviewerlist">
          <InterviewerList
            interviewers={interviewers}
            value={interviewer}
            onChange={(value) => {
              setInterviewer((prev) => (prev === value ? "" : value));
              setError((prev) => ({ ...prev, interviewer: "" }));
            }}
          />
          <section className="appointment__validation__interviewer">
            {error.interviewer}
          </section>
        </div>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => cancel()} danger="true">
            Cancel
          </Button>
          <Button
            onClick={() => {
              validate();
            }}
            confirm="true"
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
