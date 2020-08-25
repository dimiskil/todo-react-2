import * as apiFirebase from "../api/apiFirebase";

// auth
export const logInUser = (email, password) => {
	return apiFirebase.logInUser(email, password).then(() => ({}))
}
export const logOutUser = () => {
	return apiFirebase.logOutUser().then(() => ({}))
}
export const setAuth = () => {
	return dispatch => apiFirebase.setAuth(user => {
		return user ? dispatch({
			type: 'LOGIN_USER',
			payload: {
				user
			}
		}) : dispatch({
			type: 'LOGOUT_USER'
		});
	})
}

// DB
export const getLists = () => {
	return apiFirebase.getLists()
		.then(lists => ({
			type: 'GET_LISTS',
			payload: {
				lists
			}
		}))
}

export const getTasks = () => {
	return apiFirebase.getTasks()
		.then(tasks => ({
			type: 'GET_TASKS',
			payload: {
				tasks
			}
		}))
}

export const getListTasks = (listId) => {
	return apiFirebase.getListTasks(listId)
		.then(tasks => ({
			type: 'GET_LIST_TASKS',
			payload: {
				tasks
			}
		}))
}

export const createTask = (data) => {
	return apiFirebase.createTask(data)
		.then(task => ({
			type: 'CREATE_TASK',
			payload: {
				task
			}
		}))
}

export const updateTask = (taskId, data) => {
	return apiFirebase.updateTask(taskId, data)
		.then(task => ({
			type: 'UPDATE_TASK',
			payload: {
				task
			}
		}))
}

export const deleteTask = (taskId) => {
	return apiFirebase.deleteTask(taskId)
		.then(taskId => ({
			type: 'DELETE_TASK',
			payload: {
				taskId
			}
		}))
}
