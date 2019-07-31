import _ from "lodash";
import jsonPlaceHolder from "../apis/jsonPlaceHolder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // Fetching posts and users at the same time
  await dispatch(fetchPosts());
  // Fetching posts first
  // const userIds = _.uniq(_.map(getState().posts, "userId"));
  // // Mapping posts by userId and fetching unique userIds
  // // by using lodash's uniq function.
  // userIds.forEach(id => dispatch(fetchUser(id)));
  // // Fetching user info for every unique userId we previously
  // // assigned to userIds variable.

  _.chain(getState().posts) // Lodash's chain function can chain multiple functions.
    .map("userId") // The argument in chain passes to the next automatically,
    .uniq() // so we only pass the next argument.
    .forEach(id => dispatch(fetchUser(id)))
    .value(); // For chain function to work, we have too value() at the end.
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceHolder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceHolder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceHolder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};
