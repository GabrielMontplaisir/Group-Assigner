# Group-Assigner
A Google Apps Script which allows you to assign participants to groups based on their preferences, or randomly. Comes with a sidebar. Also allows you to assign the groups manually, and to set "blocked" sessions (i.e. if the group is only available in the morning, you can block off the afternoon sessions). 

## Usage

**Rule of thumb**: If it's coloured or has a background, do not touch. You may edit the values where the background is blank. Some tabs or sections have been protected to mitigate user error. If you are the owner of the document, you have full access to edit all cells.

1. In *Participant Setup*, enter the participants' grade, email, homeroom, last name and first name (in that order).
1. In *Session Setup*, enter the workshop name, room # & participant limit. Feel free to add the day's schedule. (It is not used by the add-on). Do not add anything to the right of the Participant Limit. These cells will be populated as you use the add-on.
1. Under *Settings* (found under the hamburger icon), set the values that you need, and click `Save`. This will initialize most of the data for the add-on.
1. Open *Session Setup* again, where you will find some checkboxes. By default, they will also be set to `TRUE`. Toggle these as necessary to indicate which sessions are only available for certain times (e.g. if a session is only available in the morning, uncheck the later ones).These values will save automatically.
1. Link your Google Form where you will collect participant options. Ideally, the only question you should ask are their top preferences (from best to worst). Collect email address, as this will be the unique ID.
1. When ready, click on `Assign Participants` in the sidebar. The add-on will assign participants to as many sessions as possible: First by top preferences, then by availability. It's possible it won't be able to assign all participants. If this happens, see step 6 & 7.
1. You can assign sessions manually to participants under *Participant Assignments*. Just like the session checkboxes, assignments will save automatically when updated.
1. If you would like to randomly allocate workshops to participants who still have open slots, click on `Assign Randomly`. This will provide a random workshop (with open slots) to the remaining participants. If all works as planned, then all participants should have sessions assigned to them.

## Attributions

- Sidebar created using Bootstrap 5.3.
