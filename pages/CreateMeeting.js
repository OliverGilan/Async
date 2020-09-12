import React, { useState } from "react";
import Head from "next/head";
// import Forms from "../components/forms/main";

export default function CreateMeeting() {
	const [title, setTitle] = useState("");

	return (
		<div>
			<Head>
				<title>Create Meeting</title>
			</Head>
			<main className="bg-gray-300 h-screen flex flex-row flex-wrap items-start">
				<div className="new-meeting-form bg-gray-100 h-screen max-w-xs flex-1">
					{/* <Forms.NewMeeting /> */}
					<input type="text" placeholder="title" value="" />
					<br />
					<label className="form-label template-dropdown-label">
						Create from template
						{/* <select value={}> */}
						{/* Generate option tags based on templates */}
						{/* </select> */}
					</label>
					<br />
					<label className="form-label member-add-label">
						Add Members
						{/* Add form item with text field using datalist element */}
					</label>
					<label className="form-label deadline-label">
						Deadline
						{/* Add some sort of deadline date picker with following options:
							- Add Day deadline
							- Add Hour deadline
							- Add Minute deadline
							- Add Time Elapsed deadline (mutually exclusive) */}
					</label>
				</div>
				<div className="new-meeting-content">
					<button className="add-webcam-btn" onClick={() => addWebcam}>
						Add Webcam
					</button>{" "}
					<br />
					<button className="add-screencap-btn" onClick={() => addScreenCap}>
						Add Screencap
					</button>
					<br />
					<button className="add-document-btn" onClick={() => addDocument}>
						Add Document
					</button>
					<br />
				</div>
			</main>
		</div>
	);
}

function addWebcam() {}

function addScreenCap() {}

function addDocument() {}
