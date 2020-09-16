import React, { FunctionComponent, ReactNode, useState } from "react";

interface DataListProps {
	options: string[];
	name: string;
	children: ReactNode;
}

function renderOptions(options: string[]): JSX.Element {
	return (
		<React.Fragment>
			{options.map((o) => (
				<option value={o}>{o}</option>
			))}
		</React.Fragment>
	);
}

export const DataList: FunctionComponent<DataListProps> = (props) => {
	return (
		<React.Fragment>
			{props.children}
			<datalist className="datalist" id={props.name}>
				{renderOptions(props.options)}
			</datalist>
		</React.Fragment>
	);
};
