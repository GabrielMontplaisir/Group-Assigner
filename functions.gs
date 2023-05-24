function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function hasSession(participant, sessionName) {
  let hasSession = false;
  for (a in participant.assigned) {
    if (participant.assigned[a] === sessionName) hasSession = true;
  }
  return hasSession;
}