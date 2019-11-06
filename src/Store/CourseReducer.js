import { SET_DATA_COURSE, SET_DETAIL_COURSE, TOTAL_POINT_RATE } from "./Actions/Type";

const initalState = {
    courseList:[],
    courseDetail:{},
    totalPointRate:0,
};

const CourseReducer = (state = initalState, action) => {
  switch (action.type) {
    case SET_DATA_COURSE: 
      return {...state,courseList:action.payload};
    case SET_DETAIL_COURSE: 
      state.courseDetail = action.payload 
      return {...state} 
    case TOTAL_POINT_RATE:
      state.totalPointRate = action.payload
    default:
      return state;
  }
};
export default CourseReducer;
