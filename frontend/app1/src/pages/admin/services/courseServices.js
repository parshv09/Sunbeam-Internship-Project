
import config from './config';
import axios from 'axios'

export async function getActiveCourses() {
    const U=config.URL+"/course/all-active-courses"
    const response=await axios.get(U,{})
    return response.data
}

export async function getRegisteredCourses(token) {
    const URL=config.URL+"/student/my-courses"
    const headers={token}
    const response=await axios.get(URL,{headers})
    return response.data
    
}

export async function getCourseDetails(courseId) {
    const URL=config.URL+`/course/${courseId}`;
    const response=await axios.get(URL);
    return response.data
}

export async function getCoursesWithVideos(token,courseId) {
    const URL=config.URL+"/student/my-course-with-videos"
    const headers={token}
    const response = await axios.get(URL, {
        headers: {
            token: token   
        },
        params: {
            course_id: courseId
        }
    })

    return response.data;
    
}

