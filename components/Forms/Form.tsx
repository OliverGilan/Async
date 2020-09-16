import React, { useState } from "react";
import { FunctionComponent } from "react";
import { MappedDropdown } from "../FormElements/Dropdown/main";
import { InputList } from "../InputList/main";

export interface FormProps {
	onSubmit: Function;
}

const Form: FunctionComponent<FormProps> = (props) => {
	return (
		<form className="form" onSubmit={() => props.onSubmit}>
			{props.children}
		</form>
	);
};

export default Form;
