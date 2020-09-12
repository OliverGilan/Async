import React, { useState } from "react";
import { FunctionComponent } from "react";

interface FormInputs {
	onSubmit: Function;
}

const Form: FunctionComponent<FormInputs> = (props) => {
	return (
		<form className="form" onSubmit={() => props.onSubmit}>
			{props.children}
		</form>
	);
};

export const NewMeetingForm: FunctionComponent<FormInputs> = (props) => {
	const [title, setTitle] = useState("");

	function submitForm(event: React.FormEvent) {
		let formState = {};
		props.onSubmit(formState);
	}
	return (
		<div className="new-meeting-form">
			<Form onSubmit={submitForm}></Form>
		</div>
	);
};
