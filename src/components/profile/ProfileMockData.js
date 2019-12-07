const profile1 = {
  "url": "http://localhost:8000/api/v1/profile/1/",
  "first_name": "Bruno",
  "last_name": "Cochard",
  "birth_date": "1979-09-04",
  'email': 'profile1@keluno.com',
  "is_main": true,
}

const profile2 = {
  "url": "http://localhost:8000/api/v1/profile/3/",
  "first_name": "Caelan",
  "last_name": "Cochard",
  "birth_date": "2013-01-04",
  'email': 'profile2@keluno.com',
  "is_main": false,
}

const profile3 = {
  "url": "http://localhost:8000/api/v1/profile/4/",
  "first_name": "brigitte",
  "last_name": "cochard",
  "birth_date": "2019-10-01",
  'email': 'profile3@keluno.com',
  "is_main": false,
}

const account =
  {
  "url": "http://localhost:8000/api/v1/account/1/",
  "household_name": "Keluno House",
  "address_line1": "4, Allée des acacias",
  "address_line2": "Saint Laurent de la Plaine",
  "country": "France",
  "city": "Mauges sur Loire",
  "zip": "49290",
}

export const mockData = {
  account: account,
  profiles: [profile1, profile2, profile3]
}