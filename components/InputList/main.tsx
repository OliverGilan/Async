import React, { FunctionComponent, useState } from "react";
import { DataList } from "../FormElements/DataList/main";

interface Props {
	inputs: string[];
	list: any[];
	changeList: Function;
}

export const InputList: FunctionComponent<Props> = (props) => {
	const [inputVal, setInputVal] = useState("");

	function key(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key !== "Enter") {
			return;
		}
		// if(!props.inputs.includes(inputVal)){}
		props.changeList(0, inputVal);
		setInputVal("");
	}

	function deleteMember(val: any) {
		props.changeList(1, val);
	}

	return (
		<React.Fragment>
			<DataList name="member-list" options={props.inputs}>
				<input
					list="member-list"
					className="form-input member-input"
					name="member-list"
					value={inputVal}
					onChange={(e) => setInputVal(e.target.value)}
					onKeyPress={(e) => key(e)}
				/>
			</DataList>
		</React.Fragment>
	);
};
