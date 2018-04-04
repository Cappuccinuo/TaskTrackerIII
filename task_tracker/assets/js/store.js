import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function tasks(state = [], action) {
  switch (action.type) {
  case 'TASKS_LIST':
    return [...action.tasks];
  case 'UPDATE_TASK':
    let anotherTask = action.task;
    let ind = -1;
    let prevTask = {};
    _.each(state, function(tt, index) {
      if (tt.id == action.task_id) {
        ind = index;
        prevTask = tt;
      }
    })
    anotherTask.title = prevTask.title;
    anotherTask.description = prevTask.description;
    let ns = _.filter(state, (tt) => tt.id != action.task_id);
    return [anotherTask, ...ns];
  case 'MODIFY_TASK':
    let newTask = action.task;
    let i = -1;
    let originTask = {};
    _.each(state, function(tt, index) {
      if (tt.id == action.task_id) {
        i = index;
        originTask = tt;
      }
    })
    newTask.completed = originTask.completed;
    newTask.time = originTask.time;
    let newstate = _.filter(state, (tt) => tt.id != action.task_id);
    return [newTask, ...newstate];
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

let empty_modify_form = {
  title: "",
  description: "",
  user_id: "",
}


function modify_form(state = empty_modify_form, action) {
  switch (action.type) {
    case 'MODIFY_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_MODIFY_FORM':
      state = empty_modify_form;
      return empty_modify_form;
    default:
      return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token ? action.token : state;
    case 'DELETE_TOKEN':
      return null;
    default:
      return state;
  }
}

let empty_login = {
  email: "",
  password: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

let empty_signup_form = {
  email: "",
  name: "",
  password: "",
};

function signup(state = empty_signup_form, action) {
  switch (action.type) {
    case 'UPDATE_SIGNUP_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_SIGNUP_FORM':
      state = empty_signup_form;
      return empty_signup_form;
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", action);
  // {posts, users, form} is ES6 shorthand for
  // {posts: posts, users: users, form: form}
  let reducer = combineReducers({users, tasks, login, token, form, update_form, modify_form, signup});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
