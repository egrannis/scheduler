import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

//PROPS - interviewers is array of obj, setinterviewer accepts ID and comes from interviewlistitem, and interviewer is number that represents the id

function InterviewerList(props) {
  const {interviewers, onChange, value} = props;

  const mappedInt = interviewers.map((interviewer) => {
    const {id, name, avatar} = interviewer;
    return (
      <InterviewerListItem
      key={id}
      name={name}
      avatar={avatar}
      selected={id === value}
      setInterviewer={() => onChange(id)}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;
