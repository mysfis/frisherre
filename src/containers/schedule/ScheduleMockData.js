const outing1 = {
    url: "http://localhost:8000/api/outing/1/",
    title: "FootBall Game", description: "Match de pools comptant pour la qualifcation en pool departementales",
    date: "2019-09-01", time: "13:20", location: 'Stade Chalonnes sur loire', mine:true,
    created_at: "2019-10-07T09:30:46.919152Z", updated_at: "2019-10-07T09:30:46.958052Z",
    organizer: {
      url: "http://localhost:8000/api/profile/1/",
      first_name: "Bruno", last_name: "Cochard", birth_date: "1979-09-04",},}
  
  const outing2 = {
    ...outing1,
    title: "FootBall Training", url: "http://localhost:8000/api/outing/2/",date: "2019-10-01",}
  
  const outing3 = {
    ...outing1,
    title: "FootBall Tournament", url: "http://localhost:8000/api/outing/3/", date: "2019-11-01", mine:true,}
  
  const outing4 = {
    ...outing1,
    url: "http://localhost:8000/api/outing/4/", date: "2019-11-01", title: "Basketball game", mine:false,}
  
  const outing5 = {
    ...outing1,
    url: "http://localhost:8000/api/outing/5/", date: "2019-11-01", title: "Handball game", mine:false,}
  
  const myAttendance1= {
    url: "http://localhost:8000/api/attendance/1/", email:'myAttendance1@gmail.com',
    accepted_at: "2019-10-07T12:16:28.399487Z", attendance_notes: "draft"}
  
  const myAttendance2 = {
    ...myAttendance1, 
    is_participant: true, is_driver: true, email:'myAttendance2@gmail.com'}
  
  const myAttendance3 = {
    ...myAttendance1, 
    is_participant: false,email:'myAttendance3@gmail.com'}
  
  export const scheduleMockData = [
    {...outing1, attendances: [myAttendance1, myAttendance2]}, 
    {...outing2, attendances: [myAttendance3]},
    {...outing3, attendances: [myAttendance2, myAttendance1]},
    {...outing4, attendances: [myAttendance2, myAttendance1]},
    {...outing5, attendances: [myAttendance3, myAttendance1]}
  ]