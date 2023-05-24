function displayParticipants(participants) {

  let data = [];
  for (s in participants) {
    let temp = [];
    for (a in participants[s].assigned) {
      temp.push(participants[s].assigned[a]);
    }
    data.push(temp);
  }

  // console.log(data);
  PARTICIPANT_ASSIGNMENTS.getRange(2,6,data.length, data[0].length).setValues(data);
  // console.log(participants);
}

function displaySessions(sessions, numSessions) {

  const currentSessions = SESSION_SETUP.getRange(1,6,1,SESSION_SETUP.getLastColumn()-5).getValues();
  if (currentSessions[0].length > numSessions) {
    const difference = currentSessions[0].length - numSessions + 1;
    SESSION_SETUP.getRange(1,SESSION_SETUP.getLastColumn()-difference,SESSION_SETUP.getLastRow(),difference).clearContent().removeCheckboxes();
  }


  let data = [[]];
  for (name in sessions) {
    let temp = [];
    for (num in sessions[name].sessions) {
      if (data[0].length < numSessions) data[0].push(`Session ${num}`)
      temp.push(sessions[name].sessions[num].active);
    }
    data.push(temp);
  }
  
  // console.log(data);
  SESSION_SETUP.getRange(1,6,1, data[0].length).setValues([data[0]]);
  SESSION_SETUP.getRange(2,6,data.length, data[0].length).insertCheckboxes().check();
  // console.log(participants);
}
