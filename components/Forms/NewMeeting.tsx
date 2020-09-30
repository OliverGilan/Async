import React, { useState } from "react";
import { FunctionComponent } from "react";
import { MappedDropdown } from "../FormElements/Dropdown/main";
import { InputList } from "../InputList/main";
import Form, { FormProps } from "./Form";
import TextareaAutosize from "react-textarea-autosize";

interface NewMeetingProps extends FormProps {
	onSubmit: Function;
}

export const NewMeetingForm: FunctionComponent<NewMeetingProps> = (props) => {
	const [title, setTitle] = useState("");

	function submitForm(event: React.FormEvent) {
		let formState = {
			title: title,
		};
		props.onSubmit(formState);
	}

	return (
		<div className="new-meeting-form h-auto">
			<Form onSubmit={submitForm}>
				<TextareaAutosize
					className="bg-gray-100 text-gray-700 focus:outline-none border-gray-500 border-opacity-25 border-b-2 focus:border-teal-400 w-full text-2xl transition duration-75 resize-none mb-2"
					placeholder="Title"
				/>
				{/* <label className="form-label">
					Create from template
				</label> */}
				<label className="form-label text-gray-700 font-bold">
					Meeting Members
					<input className="bg-gray-100 focus:outline-none w-full rounded-sm border-gray-500 border-b-2 border-opacity-25 focus:border-teal-400 mb-2" />
					<div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
				</label>
			</Form>
		</div>
	);
};
