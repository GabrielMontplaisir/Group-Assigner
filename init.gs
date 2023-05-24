function onInstall(e) {
  onOpen();
}

function onOpen(e) {
  const sessions = getProperty(SESSIONS) || setProperty(SESSIONS, {});
  console.log(sessions);
  const participants = getProperty(PARTICIPANTS) || setProperty(PARTICIPANTS, {});
  console.log(participants);
  const numSessions = getProperty(NUM_SESSIONS) || setProperty(NUM_SESSIONS, 4);
  console.log(numSessions);
  const numChoices = getProperty(NUM_CHOICES) || setProperty(NUM_CHOICES, 8);
  console.log(numChoices);
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem("Show Sidebar", "doGet")
  .addToUi();
};

function doGet(e) {
  var html = HtmlService.createTemplateFromFile('Sidebar')
    .evaluate();

  html
    .setTitle('Group Creator')
    .setWidth(300);
    
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.     
    .showSidebar(html);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}