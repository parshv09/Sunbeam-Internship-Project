import axios from "axios";
import config from "./config";

export async function getVideoDetails(token,courseId) {
    const URL=config.URL+`/admin/video/all-videos`;
    const headers={token}
    const response=await axios.get(URL,{
        headers: {
            token: token   
        },
        params: {
            courseId: courseId
        }
    })
    return response.data
}
export async function addVideo(token,body){
   
    const u=config.URL+`/admin/video/add` ;
    const headers={token}
    const response=await axios.post(u,body,{headers})
    return response.data;
}

export async function deleteVideo(token,videoId) {
    const URL =config.URL +`/admin/video/delete/${videoId}`
    const headers={token}
    const result=await axios.delete(URL,{headers})
    return result.data;
}


  export async function updateVideo(token, videoId, body) {
  const url = config.URL + `/admin/video/update/${videoId}`;
  // const body = { courseId, title, youtubeURL, description };
  const headers = { token };
  const response = await axios.put(url, body, { headers });
  return response.data;
}
export async function getVideoById(videoId) {
  const token = sessionStorage.getItem("token");
  const url = config.URL + `/admin/video/${videoId}`;
  const headers = { token };
  const response = await axios.get(url, { headers });
  return response.data;
}

export async function getAllStudent(course_id) {
  let url = config.URL+"/admin/enrolled-students"

  // if (courseId) {
  //   url += `?courseId=${courseId}`
  // }

  const token = sessionStorage.getItem("token")
  const headers = { token }
  const params={course_id}
  const response = await axios.get(url, { headers ,params})
  return response.data
}
