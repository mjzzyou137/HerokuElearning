import CourseService from "../../Services/Course";
import { SET_DATA_COURSE, SET_DETAIL_COURSE, DELETE_COURSE, TOTAL_POINT_RATE } from "./Type";

// async action
export const fetchCoursesFromDB = () => {
  return dispatch => {
    CourseService.fetchCourse()
      .then(res => {
        dispatch(actFetchCourses(res.data));
        console.log(res.data)
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const fetchCourseDetailFromDB = courseID => {
  return dispatch => {
    CourseService.fetchCourseDetail(courseID)
      .then(res => {
        console.log(res)
        dispatch(actFetchCourseDetail(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const fetchListUserCourseFromDB = courseID => {
  return dispatch => {
    CourseService.fetchListUserCourse(courseID)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// Action creator
export const actFetchCourses = data => {
  return {
    type: SET_DATA_COURSE,
    payload: data
  };
};

export const actFetchCourseDetail = data => {
  return {
    type: SET_DETAIL_COURSE,
    payload: data
  };
};

// delete course
export const actDeleteCourse = data => {
  return {
    type: DELETE_COURSE,
    payload:data
  }
}

// set total point rate

export const actTotalPointRate = data => {
  return {
    type:TOTAL_POINT_RATE,
    payload:data
  }
}
