import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    // show SAVING indicator
    transition(SAVING, true);

    // if bookInterview promise is resolved, transition to show
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function remove() {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers} // getInterviewersForDay
          onCancel={() => back()} //return to the EMPTY state
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          name={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers} // getInterviewersForDay
          onCancel={() => back()} //return to the EMPTY state
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={remove}
          onCancel={() => back()}
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save the appointment."
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment." onClose={() => back()} />
      )}
    </article>
  );
}
