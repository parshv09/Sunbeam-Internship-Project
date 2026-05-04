import axios from "axios";
import config from "./config";

// GET all courses (backend requires start_date and end_date query)
export async function getAllCourses(token, startDate, endDate) {
  const url = `${config.URL}/admin/course/all-courses?start_date=${startDate}&end_date=${endDate}`;
  const headers = { token };
  const res = await axios.get(url, { headers });
  return res.data;
}

// ADD course (backend expects these exact keys)
export async function addCourse(token, course) {
  const url = `${config.URL}/admin/course/add`;
  const headers = { token };
  const res = await axios.post(url, course, { headers });
  return res.data;
}

// UPDATE course
export async function updateCourse(token, courseId, course) {
  const url = `${config.URL}/admin/course/update/${courseId}`;
  const headers = { token };
  const res = await axios.put(url, course, { headers });
  return res.data;
}

// DELETE course
export async function deleteCourse(token, courseId) {
  const url = `${config.URL}/admin/course/delete/${courseId}`;
  const headers = { token };
  const res = await axios.delete(url, { headers });
  return res.data;
}

// (Optional but useful) GET single course (common router)
export async function getCourseById(courseId) {
  const url = `${config.URL}/course/${courseId}`;
  const res = await axios.get(url);
  return res.data;
}
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
