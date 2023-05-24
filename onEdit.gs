function onEdit(e) {
  const value = e.value;
  const row = e.range.getRow();
  const num = e.range.getColumn() - 5;
  
  if (e.source.getSheetName() === 'Session Setup' && e.range.getColumn() >= 6 && e.range.getColumn() <= e.source.getSheetByName('Session Setup').getMaxColumns()) {
    const sessions = getProperty(SESSIONS);

    const id = SESSION_SETUP.getRange(row, 1).getValue();

    sessions[id].sessions[num].active = value;
    // console.log(sessions[id]);

    return setProperty(SESSIONS, sessions)
  }

  if (e.source.getSheetName() === 'Participant Assignments' && e.range.getColumn() >= 6 && e.range.getColumn() <= e.source.getSheetByName('Participant Assignments').getMaxColumns()) {
    const participants = getProperty(PARTICIPANTS);

    const id = PARTICIPANT_ASSIGNMENTS.getRange(row, 2).getValue();

    participants[id].assigned[num] = value;
    // console.log(participants[id]);


    return setProperty(PARTICIPANTS, participants)
  }

}
