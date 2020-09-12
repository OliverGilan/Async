import React from "react";

function Primary(props) {
	return (
		<button
			className="bg-teal-500 hover:bg-teal-600 text-white font-bold uppercase px-4 py-2 rounded-sm transition duration-100 ease-in-out"
			onClick={props.onClick}
		>
			{props.text}
		</button>
	);
}

function Outline(props) {
	return (
		<button
			className="bg-transparent border border-teal-500 hover:bg-teal-600 text-teal-500 hover:text-white font-bold uppercase px-4 py-2 rounded-sm transition duration-100 ease-in-out"
			onClick={props.onClick}
		>
			{props.text}
		</button>
	);
}

function Salami(props) {
	return <button className="bg-gray"></button>;
}

export default { Primary, Outline };
