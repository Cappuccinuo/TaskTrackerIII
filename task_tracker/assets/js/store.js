import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function tasks(state = [], action) {
  switch (action.type) {
  case 'TASKS_LIST':
    return [...action.tasks];
  case 'UPDATE_TASK':
    return [action.task, ...state];
  case 'MODIFY_TASK':
    return [action.task, ...state];
  case 'ADD_TASK':
    return [action.task, ...state];
  case 'DELETE_TASK':
    return _.filter(state, (tt) => tt.id != action.task_id);
  default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
    return [...action.users];
  case 'ADD_USER':
    return [action.user, ...state];
  default:
    return state;
  }
}

let empty_form = {
  title: "",
  description: "",
  completed: "0",
  time: "0",
  user_id: "",
  boss_id: "",
};

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
      return empty_form;
    case 'SET_TOKEN':
      return Object.assign({}, state, action.token);
    default:
      return state;
  }
}

let empty_edit_form = {
  completed: "0",
  time: "0",
}

function update_form(state = empty_edit_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function modify_form(state = empty_form, action) {
  switch (action.type) {
    case 'MODIFY_FORM':
      console.log(state);
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}


function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    case 'DELETE_TOKEN':
      return null;
    default:
      return state;
  }
}

let empty_login = {
  email: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", action);
  // {posts, users, form} is ES6 shorthand for
  // {posts: posts, users: users, form: form}
  let reducer = combineReducers({users, tasks, login, token, form, update_form, modify_form});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
