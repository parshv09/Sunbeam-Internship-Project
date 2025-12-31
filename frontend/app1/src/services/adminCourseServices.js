import axios from "axios";
import config from "./config";


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
