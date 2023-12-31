import axios from "axios";

export function handleLoginWithGoogle (user, navigate, onSuccess, onFailed) {
    axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json'
            }
        })
        .then((res) => {
            if(res.data.hd === 'student.tdtu.edu.vn'){
                const data = {
                    type: 'student',
                    id: res.data.id,
                    access_token: user.access_token,
                    email: res.data.email,
                    name: res.data.name,
                    family_name: res.data.family_name,
                    given_name: res.data.given_name,
                    avt: res.data.picture,
                }
                localStorage.setItem('user', JSON.stringify(data));
    
                onSuccess(data)
    
                navigate('/dashboard/tuition')
            }else{
                onFailed()
            }            
        })
        .catch((err) => console.log(err));
}