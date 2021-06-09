import React, { useEffect, useState } from "react";

function App() {
	const [state, setstate] = useState("");

	async function getData() {
		//call tasks route
		await fetch(`http://localhost:8000/task/`, {
			credentials: "omit", //omit credentials
		})
			.then((response) => {
				return response.json(); //return json version of response
			})
			.then((data) => {
				setstate(data); //store data in state
			});
	}
	//hook that lets us call this everytime page renders
	useEffect(() => {
		getData();
	}, []);
	//array to hold all items
	let listItems = [];
	if (state) {
		//if state has been set map over each item and create a div for task
		listItems = state.map((task, i) => (
			<div className="text-center my-4 py-4 bg-purple-200"
			>
				<div
					onClick={deleteIt}
					id={task.id}
				>
					{task.description}
				</div>
			</div>
		));
	}

	//post request when form is submitted
	function handleSubmit(e) {
		fetch(`http://localhost:8000/task/${e.target.id}`, {
			method: "Post",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "omit",
			body: JSON.stringify({
				//pass description from input to req body
				description: document.getElementById("task").value,
			}),
		});
	}

	function deleteIt(e) {
		//set style of clicked task
		e.target.style.textDecoration = "line-through";
		e.target.style.color = "red";
		//delete request
		fetch(`http://localhost:8000/task/${e.target.id}`, {
			method: "Delete",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "omit",
		});
	}

	return (
<div className="bg-green-200 h-screen">
		<div className="bg-green-200 w-3/4 mx-auto my-auto App my-auto">
			<h1 className="text-3xl">My To-do List</h1>
			<form className="my-4" onSubmit={handleSubmit}>
				<input className="w-20 p-3" type="text" name="desciption" id="task" />
				<button className=" p-3 bg-purple-300" type="submit">
					Add todo
				</button>
			</form>
			<div >{state[0] ? listItems : "What will you do today?"}</div>
		</div></div>
	);
}

export default App;
