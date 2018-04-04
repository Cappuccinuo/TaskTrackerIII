import store from './store';
import swal from 'sweetalert';

class TheServer {
  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
      error: (resp) => {
        swal({
          title: "Wrong!",
          text: "Try again",
          icon: "warning",
        });
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
      error: (resp) => {
        swal({
          title: "Wrong!",
          text: "Try again",
          icon: "warning",
        });
      },
    });
  }

  request_user(id) {
    $.ajax("/api/v1/users/" + id, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          user: resp.data,
        });
      },
      error: (resp) => {
        swal({
          title: "Wrong!",
          text: "Try again",
          icon: "warning",
        });
      },
    });
  }

  submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
      error: (resp) => {
        swal({
          title: "Wrong Combination!",
          text: "Try again",
          icon: "warning",
        });
      },
    });
  }

  submit_task(data) {
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, task: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_TASK',
          task: resp.data,
        });
        swal({
          title: "Submit Task Success!",
          text: "You can check the task now",
          icon: "success",
        });
      },
      error: (resp) => {
        swal({
          title: "Wrong!",
          text: "Try again",
          icon: "warning",
        });
      },
    });
  }

  update_task(data, id) {
    $.ajax("/api/v1/tasks/" + id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, task: data }),
      success: (resp) => {
        store.dispatch({
          type: 'UPDATE_TASK',
          task: resp.data,
          task_id: id,
        });
        swal({
          title: "Edit Success!",
          text: "You can check the task now",
          icon: "success",
        });
      },
      error: (resp) => {
        swal({
          title: "Wrong!",
          text: "Try again",
          icon: "warning",
        });
      },
    });
  }

  modify_task(data, id) {
    $.ajax("/api/v1/tasks/" + id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, task: data }),
      success: (resp) => {
        store.dispatch({
          type: 'MODIFY_TASK',
          task: resp.data,
          task_id: id,
        });
        swal({
          title: "Modify Success!",
          text: "You can check the task now",
          icon: "success",
        });
      },
      error: (resp) => {
        swal({
          title: "Wrong!",
          text: "Try again",
          icon: "warning",
        });
      },
    });
  }

  delete_task(id) {
    $.ajax("/api/v1/tasks/" + id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        store.dispatch({
          type: 'DELETE_TASK',
          task_id: id,
        });
      },
      error: (resp) => {
        swal({
          title: "Wrong!",
          text: "Try again",
          icon: "warning",
        });
      },
    });
  }

  submit_user(data) {
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ user: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_USER',
          user: resp.data,
        });
        swal({
          title: "Create Success!",
          text: "You can log in now",
          icon: "success",
        });
      },
      error: (resp) => {
        swal({
          title: "Wrong!",
          text: "Try again",
          icon: "warning",
        });
      },
    });
  }
}

export default new TheServer();
