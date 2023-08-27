const userInfor = JSON.parse(localStorage.getItem('user'))

const account = {
  displayName: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).name : 'unknow' ,
  email: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).email : 'unknow',
  photoURL: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).avt : 'unknow'
};

export default account;
