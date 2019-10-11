function selectUserByName(state, name) {
  const filteredNames = state.users.filter(user => user.name === name);
  return filteredNames;
}

export function getAppointmentsForDay (state, day) {
  const appointments = [];

  const filteredDay = state.days.filter(dayITem => dayITem.name === day);
  // console.log(filteredDay);
  if (filteredDay.length === 0) {
    return appointments;
  } else {
    filteredDay[0].appointments.map(id =>
      appointments.push(state.appointments[id])
    );
  }

  return appointments;
};