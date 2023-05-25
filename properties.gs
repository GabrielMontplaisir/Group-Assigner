function getProperty(prop) {
    let props = PropertiesService.getDocumentProperties().getProperty(prop);
    props = JSON.parse(props);
  return props
}

function setProperty(prop, value) {
 return PropertiesService.getDocumentProperties().setProperty(prop, JSON.stringify(value))
}

function resetProperties() {
  PropertiesService.getDocumentProperties().deleteAllProperties();
  onOpen();
  getParticipants();
  getSessions();
  return 'Document properties succesfully reset.'
}

const updateValues = (sessions, choices) => {
  if (sessions !== undefined) setProperty(NUM_SESSIONS, sessions);
  if (choices !== undefined) setProperty(NUM_CHOICES, choices);

  getParticipants();
  getSessions();

  return 'Updated Settings.'
}

function eraseAssignments() {
  getParticipants();

  const sessions = getProperty(SESSIONS);
  for (id in sessions) {
    for (s in sessions[id].sessions) {
      sessions[id].sessions[s].list = [];
    }
  }

  setProperty(SESSIONS, sessions);

  return "Erased participant assignments."
}