import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import "components/Appointment/styles.scss";

export default function Form(props) {
  const { interviewers, onSave, onCancel } = props;

  const [name, setName] = useState("");
  const [interviewer, setInterviewer] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onSubmit({ name: name, interviewer: interviewer });
  };

  return (
    <form className="appointment" onSubmit={handleSubmit}>
      <card>
        <input
          className="appointment__create-input"
          type="text"
          name="studentName"
          placeholder="Enter Student Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </card>
      <div className="appointment__card-group">
        <card>
          <InterviewerList
            interviewers={interviewers}
            interviewer={interviewer}
            setInterviewer={setInterviewer}
          />
        </card>
        <card className="appointment__card-right">
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
        </card>
      </div>
    </form>
  );
}
