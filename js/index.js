const data = `Focusing Themes and Question Types in Science Science Thursday, August 26, 2021 8:00 PM 9:30 PM
Reading Strategically Language Arts Saturday, August 28, 2021 1:00 PM 2:30 PM
Number Sense Math Monday, August 30, 2021 8:00 PM 9:30 PM
Analyzing Sources and Points of View in Social Studies Social Studies Thursday, September 02, 2021 8:00 PM 9:00 PM
Scientific Experiments Science Thursday, September 02, 2021 9:00 PM 10:30 PM
Reading for Key Ideas and Details Language Arts Tuesday, September 07, 2021 8:00 PM 9:30 PM
Extended Response Language Arts Tuesday, September 07, 2021 9:30 PM 10:30 PM
The Coordinate Plane Math Saturday, September 11, 2021 1:00 PM 2:30 PM
Question Types and Relationships in Social Studies Social Studies Monday, September 13, 2021 8:00 PM 9:00 PM
Data Analysis in Science Science Monday, September 13, 2021 9:00 PM 10:30 PM
Reading Like a Writer Language Arts Thursday, September 16, 2021 8:00 PM 9:30 PM
Visuals and Data in Social Studies Social Studies Sunday, September 19, 2021 8:00 PM 9:00 PM
Finding Info-in-Graphics Social Studies Sunday, September 19, 2021 9:00 PM 10:00 PM
Language Conventions and Usage Language Arts Wednesday, September 22, 2021 8:00 PM 9:30 PM
Focusing Themes and Question Types in Science Science Saturday, September 25, 2021 1:00 PM 2:30 PM
Algebra Math Monday, September 27, 2021 8:00 PM 9:30 PM
Advanced Math Math Monday, September 27, 2021 9:30 PM 10:30 PM
Reading Strategically Language Arts Tuesday, September 28, 2021 8:00 PM 9:30 PM
Geometry and Data Analysis Math Thursday, September 30, 2021 8:00 PM 9:30 PM
Number Sense Part 1 Math Saturday, October 02, 2021 1:00 PM 2:30 PM
Extended Response Language Arts Monday, October 04, 2021 8:00 PM 9:00 PM
Reading for Key Ideas and Details Language Arts Monday, October 04, 2021 9:00 PM 10:30 PM
Number Sense Part 2 Math Wednesday, October 06, 2021 8:00 PM 9:30 PM
Scientific Experiments Science Saturday, October 09, 2021 1:00 PM 2:30 PM
Analyzing Sources and Points of View in Social Studies Social Studies Saturday, October 09, 2021 2:30 PM 3:30 PM
Algebra Part 1 Math Sunday, October 10, 2021 8:00 PM 9:30 PM
Data Analysis in Science Science Monday, October 11, 2021 8:00 PM 9:30 PM
Question Types and Relationships in Social Studies Social Studies Monday, October 11, 2021 9:30 PM 10:30 PM
Algebra Part 2 Math Tuesday, October 12, 2021 8:00 PM 9:30 PM
Reading Like a Writer Language Arts Thursday, October 14, 2021 8:00 PM 9:30 PM
Finding Info-in-Graphics Social Studies Saturday, October 16, 2021 1:00 PM 2:00 PM
Visuals and Data in Social Studies Social Studies Saturday, October 16, 2021 2:00 PM 3:00 PM
Geometry Math Monday, October 18, 2021 8:00 PM 9:30 PM
Focusing Themes and Question Types in Science Science Wednesday, October 20, 2021 8:00 PM 9:30 PM
Data Analysis Math Saturday, October 23, 2021 1:00 PM 2:30 PM
The Coordinate Plane Part 1 Math Sunday, October 24, 2021 8:00 PM 9:30 PM
Language Conventions and sUsage Language Arts Tuesday, October 26, 2021 8:00 PM 9:30 PM
The Coordinate Plane Part 2 Math Thursday, October 28, 2021 8:00 PM 9:30 PM
Reading Strategically Language Arts Saturday, October 30, 2021 1:00 PM 2:30 PM`

const today = new Date();

class ClassSession {
    constructor(sessionName, subject, date, startTime, endTime, link) {
        this.sessionName = sessionName;
        this.subject = subject;
        this.startTime = new Date(`${date.replace(/,/g, '')} ${startTime} GMT-04:00`);
        this.endTime = new Date(`${date.replace(/,/g, '')} ${endTime} GMT-04:00`);
        this.date = this.startTime.toDateString();
        this.link = link;
    }
}

let isToday = (date) => {
    let midnight = new Date(); // 00:00:00 of today
    let almostMidnight = new Date(); // 22:59:59 of today
    midnight.setHours(0, 0, 0);
    almostMidnight.setHours(23, 59, 59);

    if (date >= midnight && date <= almostMidnight) return true;
    else return false;
}

isToday()

let isDatePast = (checkDate, today) => {
    if (checkDate > today) return false;
    return true;
}

let createSession = (str) => {
    const subjects = ['Math', 'Language Arts', 'Science', 'Social Studies'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    let subjectFoundIndex = str.lastIndexOf(subjects.reduce((sub, subject) => {
        if (str.includes(subject)) {
            sub = subject;
            return sub;
        }
        return sub;
    }));
    let dayFoundIndex = str.lastIndexOf(days.reduce((d, day) => {
        if (str.includes(day)) {
            d = day;
            return d;
        }
        return d;
    }));

    let sessionName = str.slice(0, subjectFoundIndex).trim();
    let subject = str.match(/(Math|Language Arts|Social Studies|Science)/g)[0];
    let times = str.match(/(\d|\d\d):\d\d\s(AM|PM)/g);
    let date = str.slice(dayFoundIndex, str.search(times[0])).trim().replace(',', '');
    let startTime = times[0]; endTime = times[1];
    let classSession = new ClassSession(sessionName, subject, date, startTime, endTime);

    return classSession;
}
let allSessions = data.split('\n').map(line => createSession(line));
let nextSession = allSessions.find((session) => session.startTime > today);
let tableBody = document.querySelector('table tbody');
allSessions.forEach((session, i, arr) => {
    let element = document.createElement('tr');
    let pastDateStyle = isDatePast(session.endTime, today) ? 'past-session' : '';
    if (session === nextSession) element.setAttribute('id', 'next-session')
    element.innerHTML = `
    <td class='${nextSession !== session && 'session-name'} ${pastDateStyle}'><a link=''>${session.sessionName}</a></td>
    <td class='${pastDateStyle}'>${session.subject}</td>
    <td class='${pastDateStyle}'>${session.date}</td>
    <td class='${pastDateStyle} text-right'>${session.startTime.toLocaleTimeString('en-US', { timeStyle: 'short' })}</td>
    <td class='${pastDateStyle} text-right'>${session.endTime.toLocaleTimeString('en-US', { timeStyle: 'short' })}</td>`
    tableBody.appendChild(element);
})