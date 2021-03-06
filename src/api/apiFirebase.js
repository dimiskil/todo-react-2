import {db, auth} from '../firebase'

// auth
export const logInUser = (email, password) => {
	return auth.signInWithEmailAndPassword(email, password)
	// .catch(error => {
	// 	console.log(error.code, error.message)
	// 	const errorCode = error.code;
	// 	const errorMessage = error.message;
	// });
}

export const logOutUser = () => {
	return auth.signOut()
}

export const register = (email, password) => {
	return auth.createUserWithEmailAndPassword(email, password)
	// // .then(obj => console.log(obj))
	// .catch(error => {
	// 	const errorCode = error.code;
	// 	const errorMessage = error.message;
	// 	return errorCode, errorMessage
	// });
}
export  function setAuth  (onAuth) {
	return auth.onAuthStateChanged(onAuth)
}

export function resetPassword(email) {
	return auth.sendPasswordResetEmail(email)
}

// db
export const getColors = () => {
	return db.collection('colors')
		.get()
		.then(mapSnapshot)
		.catch(error => {
			console.log("Error getting documents: ", error);
		});
}

export const getLists = (userId) => {
	return db.collection('lists')
		.where("userId", "==", userId)
		.get()
		.then(mapSnapshot)
		.catch(error => {
			console.log("Error getting documents: ", error);
		});
}

export const createList = (obj) => {
	return db.collection('lists').add({
		...obj
	})
		.then(docRef => docRef.get())
		.then(mapDoc)
}

export const updateList = (listId, data) => {
	return db.collection("lists").doc(listId).update(data)
		.then(() => ({
			id: listId,
			...data
		}))
}

export const deleteList = (listId) => {
	return db.collection('lists').doc(listId).delete()
		.then(() => listId)
}

export const getListTasks = (listId) => {
	return db.collection('tasks')
		.where('listId', '==', listId)
		.get()
		.then(mapSnapshot)
		.catch(error => {
			console.log("Error getting documents: ", error);
		});
}

// export const getImportantTasks = (userId) => {
// 	return db.collection('tasks')
// 		// .where('listId', '==', '')
// 		.where("userId", "==", userId)
// 		.where('important', '==', true  )
// 		.get()
// 		.then(mapSnapshot)
// 		.catch(error => {
// 			console.log("Error getting documents: ", error);
// 		});
// }
//
// export const getPlannedTasks = (userId) => {
// 	return db.collection('tasks')
// 		.where('listId', '==', '')
// 		.where("userId", "==", userId)
// 		.where('dueDate', '>=', Date.now())
// 		.get()
// 		.then(mapSnapshot)
// 		.catch(error => {
// 			console.log("Error getting documents: ", error);
// 		});
// }

export const getTasks = (userId) => {
	return db.collection('tasks')
		.where("userId", "==", userId)
		.get()
		.then(mapSnapshot)
		.catch(error => {
			console.log("Error getting documents: ", error);
		});
}


export const createTask = (data, listId = '') => {
	return db.collection("tasks").add({
		...data,
		important: false,
		completed: false,
		notes: '',
		// dueDate: null,
		steps: []
	})
		.then(docRef => docRef.get())
		.then(mapDoc)

		.catch(function (error) {
			console.error("Error adding document: ", error);
		});
}

export const updateTask = (taskId, data) => {
	return db.collection("tasks").doc(taskId).update(data)
		.then(() => ({
			id: taskId,
			...data
		}))
}

export const deleteTask = (taskId) => {
	return db.collection("tasks").doc(taskId).delete()
		.then(() => taskId)
		.catch((error) => {
			console.error("Error removing document: ", error);
		});
}

// убрать дублированный код
const mapSnapshot = (snapshot) => {
	return snapshot.docs.map(mapDoc)
}

const mapDoc = (doc) => {
	return {
		id: doc.id,
		...doc.data()
	}
}
