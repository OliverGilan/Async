import React, { useState } from "react";
import { FunctionComponent } from "react";
import { MappedDropdown } from "../FormElements/Dropdown/main";
import { InputList } from "../InputList/main";
import Form, { FormProps } from "./Form";

interface NewMeetingProps extends FormProps {
	templates: Map<string, Object>;
	users: string[];
}

export const NewMeetingForm: FunctionComponent<NewMeetingProps> = (props) => {
	const [title, setTitle] = useState("");
	const [template, setTemplate] = useState(undefined);
	const [memberList, setMemberList] = useState([]);

	function submitForm(event: React.FormEvent) {
		let formState = {
			title: title,
		};
		props.onSubmit(formState);
	}
	return (
		<div className="new-meeting-form">
			<Form onSubmit={submitForm}>
				<input
					className="form-input form-title new-meeting-form-title"
					placeholder="Title"
					type="text"
				/>
				<br />
				<label className="form-label">
					Create from template
					<MappedDropdown
						options={props.templates}
						default={"None"}
						onChange={setTemplate}
					/>
				</label>
				<br />

				<label className="form-label">
					Meeting Members
					<InputList
						inputs={props.users}
						list={memberList}
						changeList={(action, value) => {
							switch (action) {
								case 0:
									setMemberList(memberList.concat([value]));
									break;
								case 1:
									setMemberList(memberList.filter((v) => v !== value));
									break;
							}
						}}
					/>
				</label>
			</Form>
		</div>
	);
};
