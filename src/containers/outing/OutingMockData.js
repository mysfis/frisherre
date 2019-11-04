const outing1 = {
    url: "http://localhost:8000/api/outing/1/",
    title: "Entrainement Natation", description: "Premier entrainement de la saison",
    date: "2019-11-06", time: "13:20", location: 'Piscine de Chemillé', mine:true,
    created_at: "2019-10-07T09:30:46.919152Z", updated_at: "2019-10-07T09:30:46.958052Z",
    organizer: {
      url: "http://localhost:8000/api/profile/1/",
      first_name: "Bruno", last_name: "Cochard", birth_date: "1979-09-04",},}
  
  const outing2 = {
    ...outing1,
    title: "Multisport", url: "http://localhost:8000/api/outing/2/",
    description: "KinBall",
    location: 'Stade de la Pom', date: "2019-11-09",}
  
  const outing3 = {
    ...outing1,
    title: "Entrainement Natation", url: "http://localhost:8000/api/outing/3/", date: "2019-11-13", mine:true,}
  
  const outing4 = {
    ...outing1,
    url: "http://localhost:8000/api/outing/4/", date: "2019-12-01", title: "Basketball game", mine:false,}
  
  const outing5 = {
    ...outing1,
    url: "http://localhost:8000/api/outing/5/", date: "2019-12-01", title: "Handball game", mine:false,}
  
  const myAttendance1= {
    url: "http://localhost:8000/api/attendance/1/", email:'myAttendance1@gmail.com',
    accepted_at: "2019-11-07T12:16:28.399487Z", attendance_notes: "draft"}
  
  const myAttendance2 = {
    ...myAttendance1, 
    is_participant: true, is_driver: true, email:'myAttendance2@gmail.com'}
  
  const myAttendance3 = {
    ...myAttendance1, 
    is_participant: false,email:'myAttendance3@gmail.com'}
  
  export const outingMockData = [
    {...outing1, participation: myAttendance1, attendees: [myAttendance1, myAttendance2, myAttendance3]}, 
    {...outing2, participation: myAttendance2, attendees: [myAttendance2]},
    {...outing3, participation: myAttendance3, attendees: [myAttendance3, myAttendance1]},
    {...outing4, participation: myAttendance2, attendees: [myAttendance2, myAttendance1]},
    {...outing5, participation: myAttendance3, attendees: [myAttendance3, myAttendance1]}
  ]