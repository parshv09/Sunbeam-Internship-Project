import config from "./config";
import  axios  from 'axios';


export async function loginUser(email,password){
    const URL=config.URL+"/auth/login"
    const body={email,password}
    const result= await axios.post(URL,body)
    return result.data;
}

export async function registerUser(courseId,name,email,mobileNo){
   
    const URL=config.URL+"/register-to-course"
    const body={courseId,name,email,mobileNo}
    const response=await axios.post(URL,body)
    return response.data;
}
export async function getUser(token) {
    const URL=config.URL+"/student"
    const headers={token}
    const response=await axios.get(URL,{headers})
    return response.data;
}

export async function changePassword(token,newPassword,confirmPassword) {
    const URL=config.URL+"/student/change-password"
    const body={newPassword,confirmPassword}
    const headers={token}
    const response=await axios.put(URL,body,{headers})
    return response.data;
  
}

export default loginUser;