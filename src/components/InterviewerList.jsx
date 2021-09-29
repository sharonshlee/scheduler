import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props;

  const parsedInterviewers = interviewers.map((i) => {
    return (
      <InterviewerListItem
        id={i.id}
        name={i.name}
        avatar={i.avatar}
        selected={i.id === interviewer}
        setInterviewer={setInterviewer}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}
