function getAppointmentsForDay(state, day) {
  let dayData = null;
  for (let x of state.days) {
    if (x.name === day) {
      dayData = x;
      break;
    }
  }
  if (!dayData) {
    return [];
  }
  let output = [];
  for (let app of dayData.appointments) {
    output.push(state.appointments[String(app)]);
  }
  return output;
}

function getInterview(state, interview) {
  if (interview === null) return null;

  return {
    student: interview.student,
    interviewer: state.interviewers[(interview.interviewer)]
  };
}

//credit to v for helping
function getInterviewersForDay(state, day) {
  const dayData = state.days.find(x => x.name === day);
  if (!dayData) {
    return [];
  }
  let output = [];
  for (let appointment of dayData.interviewers) {
    output.push(state.interviewers[String(appointment)]);
  }
  return output;
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };