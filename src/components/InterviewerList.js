import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

//PROPS - interviewers is array of obj, setinterviewer accepts ID and comes from interviewlistitem, and interviewer is number that represents the id

export default function InterviewerList(props) {
  const {interviewers, setInterviewer, interviewer} = props;

  const mappedInt = interviewers.map((item) => {
    return (
      <InterviewerListItem
      key={item.id}
      name={item.name}
      avatar={item.avatar}
      selected={item.id === interviewer}
      setInterviewer={() => setInterviewer(item.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{mappedInt}</ul>
    </section>  
  );
};