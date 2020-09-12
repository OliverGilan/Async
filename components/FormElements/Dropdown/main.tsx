import React, { FunctionComponent, useState, useEffect } from "react";

interface DropdownProps {
	options: string[];
	default: string;
	onChange: Function;
	name?: string;
}

interface MappedDropdownProps<T> {
	options: Map<string, T>;
	default: string;
	onChange: Function;
	name?: string;
}

function renderOptions(options: string[], def: string): JSX.Element {
	return (
		<React.Fragment>
			{options.includes(def) ? null : (
				<option value={def} selected>
					{def}
				</option>
			)}
			{options.map((o) => (
				<option value={o}>{o}</option>
			))}
		</React.Fragment>
	);
}

export const Dropdown: FunctionComponent<DropdownProps> = (props) => {
	const [value, setValue] = useState(props.default);

	function selectValue(event: React.ChangeEvent<HTMLSelectElement>) {
		event.preventDefault();
		let value = event.target.value;
		setValue(value);
		props.onChange(value);
	}

	return (
		<select
			className="dropdown"
			name={props.name || "standard-dropdown"}
			value={value}
			onChange={(e) => selectValue(e)}
		>
			{renderOptions(props.options, props.default)}
		</select>
	);
};

export function MappedDropdown<T>(props: MappedDropdownProps<T>): JSX.Element {
	const [value, setValue] = useState(props.default);

	function selectValue(event: React.ChangeEvent<HTMLSelectElement>) {
		event.preventDefault();
		let value = event.target.value;
		setValue(value);
		props.onChange(props.options.get(value));
	}

	return (
		<select
			className="dropdown"
			name={props.name || "standard-dropdown"}
			value={value}
			onChange={(e) => selectValue(e)}
		>
			{renderOptions(Array.from(props.options.keys()), props.default)}
		</select>
	);
}
