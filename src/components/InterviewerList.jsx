import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  const parsedInterviewers = interviewers.map((item) => {
    return (
      <InterviewerListItem
        key={item.id}
        name={item.name}
        avatar={item.avatar}
        selected={item.id === value}
        setInterviewer={(event) => onChange(item.id)}
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
