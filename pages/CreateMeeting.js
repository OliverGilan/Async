import React from "react";
import Head from "next/head";

export default function CreateMeeting() {
	return (
		<div>
			<Head>
				<title>Create Meeting</title>
			</Head>
			<main className="bg-gray-300 h-screen flex flex-row flex-wrap items-start">
				<div className="new-meeting-form bg-gray-100 h-screen max-w-xs flex-1"></div>
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
