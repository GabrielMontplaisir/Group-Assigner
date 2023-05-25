const SESSIONS = 'sessions';
const PARTICIPANTS = 'participants';
const NUM_SESSIONS = 'numSessions';
const NUM_CHOICES = 'numChoices';
const SESSION_SETUP = SpreadsheetApp.getActive().getSheetByName('Session Setup');
const PARTICIPANT_SETUP = SpreadsheetApp.getActive().getSheetByName('Participant Setup');
const PARTICIPANT_ASSIGNMENTS = SpreadsheetApp.getActive().getSheetByName('Participant Assignments');

function getParticipants() {
  const data = PARTICIPANT_SETUP.getDataRange().getValues();
  const participants = getProperty(PARTICIPANTS);
  const numSessions = getProperty(NUM_SESSIONS);

  for (let i=1; i < data.length; i++) {
    if (data[i][1]) {
      participants[data[i][1]] = {
        'name': data[i][5],
        'homeroom': data[i][2],
        'choices': [...new Set(data[i].slice(6))],
        'assigned': {}
      }

      for (let n = 0; n < numSessions; n++) participants[data[i][1]].assigned[n+1] = "";
    }
  }

  PARTICIPANT_ASSIGNMENTS.getRange(2,6,PARTICIPANT_ASSIGNMENTS.getLastRow()-1, PARTICIPANT_ASSIGNMENTS.getLastColumn()-5).clearContent();
  // console.log(students);
  return setProperty(PARTICIPANTS, participants)
}

function getSessions() {
  const data = SESSION_SETUP.getDataRange().getValues();
  const sessions = getProperty(SESSIONS); 
  const numSessions = getProperty(NUM_SESSIONS);

  for (let i = 1; i < data.length; i++) {
    if (data[i][0]) {
      sessions[data[i][0]] = {
        'room': data[i][1],
        'maxParticipants': data[i][4],
        'sessions': {}
      }

      for (let n = 0; n < numSessions; n++) sessions[data[i][0]].sessions[n+1] = {
        "active": 'TRUE',
        "list": []
      };
    };
  }
  // console.log(workshops);
  setProperty(SESSIONS, sessions);
  displaySessions(sessions, numSessions);

  return sessions
}

function assignParticipants() {
  const participants = getProperty(PARTICIPANTS);
  const sessions = getProperty(SESSIONS);
  const numChoices = getProperty(NUM_CHOICES);

  const assign = (s, id, num) => {
    if (sessions[s].sessions[num].active === 'TRUE' && sessions[s].sessions[num].list.length < sessions[s].maxParticipants) {
      participants[id].assigned[num] = s;
      sessions[s].sessions[num].list.push(participants[id].name);
      // console.log(`${count} -- Assigning session ${s} ${num} (${sessions[s].sessions[num].list.length}) to ${participants[id].name} -- Choices remaining: ${participants[id].choices} -- ${participants[id].assigned}`);
    }
  }

  let count = 0;
  while (count < numChoices) {
    for (s in sessions) {
      // console.log(s);
      for (id in participants) {
        const lowestArr = [];
        for (l in sessions[s].sessions) {
          lowestArr.push(sessions[s].sessions[l].list.length);
        }
        let lowest = lowestArr.indexOf(Math.min(...lowestArr))+1;
        let second = Math.min(lowestArr.findIndex((v) => v !== lowest)) + 1;

        const duplicate = hasSession(participants[id], s);
        if (duplicate) continue;

        if (participants[id].choices[count] === s) {
          if (!participants[id].assigned[lowest]) {
            assign(s,id,lowest);
          } else if (second !== 0 && !participants[id].assigned[second]) {
            assign(s,id,second);
          } else {
            for (num in participants[id].assigned) {
              if (!participants[id].assigned[num]) {
                assign(s,id,num);
                break;
              };
            }
          } 
        }
      }
    }
    count++;
  }


  setProperty(PARTICIPANTS, participants);
  setProperty(SESSIONS, sessions);

  displayParticipants(participants);

  // console.log(students);
  // console.log(workshops);
  return "Assigned sessions to workshops. View on 'Participant Assignments' tab."
}

function randomAssign() {
  const participants = getProperty(PARTICIPANTS);
  const sessions = getProperty(SESSIONS);

  const participantArray = [];
  for (id in participants) {
    for (a in participants[id].assigned) {
      if (!participants[id].assigned[a]) {
        participantArray.push([id, a]);
      }
    }
  }

  const freeSessionsArray = [];
    for (s in sessions) {
      for (l in sessions[s].sessions) {
        if (sessions[s].sessions[l].active === 'TRUE' && sessions[s].sessions[l].list.length < sessions[s].maxParticipants) {
          freeSessionsArray.push([s,l]);
        }
      }
  }
  // console.log(participantArray.length);

  let i = 0;
  while (participantArray.length > 0) {
    console.log(i);
    console.log(participantArray[i][0], participantArray[i][1]);
    const relevantSessions = freeSessionsArray.filter((elem) => elem[1] === participantArray[i][1]);
    const randomValue = getRandomInt(0, relevantSessions.length);
    const randomSession = relevantSessions[randomValue][0];
    const sessionNum = relevantSessions[randomValue][1];
    const current = participants[participantArray[i][0]];
    console.log(randomSession, sessionNum);
    // console.log(current, participantArray[i][1]);
    
    const duplicate = hasSession(current, randomSession);
    if (duplicate) {
      i++;
      if (i >= participantArray.length) i=0;
      continue;
    };

    if (sessions[randomSession].sessions[sessionNum].list.length < sessions[randomSession].maxParticipants) {
      current.assigned[participantArray[i][1]] = randomSession;
      sessions[randomSession].sessions[sessionNum].list.push(current.name);
      console.log(`Assigning ${randomSession} to ${current.name} at session ${participantArray[i][1]}`);
      participantArray.splice(i, 1);
    }

    if (sessions[randomSession].sessions[sessionNum].list.length >= sessions[randomSession].maxParticipants) {
      console.log(`Removing ${freeSessionsArray[randomValue][0]} from queue.`);
      const findSession = freeSessionsArray.findIndex((elem) => elem[0] === randomSession && elem[1] === sessionNum);
      freeSessionsArray.splice(findSession,1);
      };

    i++;
    if (i >= participantArray.length) i=0;
  };

  setProperty(PARTICIPANTS, participants);
  setProperty(SESSIONS, sessions);
  displayParticipants(participants);

  return "Allocated remaining open slots to participants. View on 'Participant Assignments' tab."
}