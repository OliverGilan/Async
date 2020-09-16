import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { Dropdown } from "../components/FormElements/Dropdown/main";
import { NewMeetingForm } from "../components/Forms/NewMeeting";
import useDraggable from "../hooks/draggable";

function ContentButtons(props) {
	return (
		<React.Fragment>
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
		</React.Fragment>
	);
}

function FileViewer(props) {}

function Webcam(props) {
	return (
		<div className="webcam">
			<video autoplay></video>
		</div>
	);
}

function ScreenCam(props) {}

function hasGetUserMedia() {
	return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function enumerateDevices(devices) {
	return (
		<React.Fragment>
			{devices.map((d) => (
				<option key={d.deviceId} value={d.deviceId}>
					{d.label}
				</option>
			))}
		</React.Fragment>
	);
}

async function getDevices(kind) {
	return await navigator.mediaDevices
		.enumerateDevices()
		.then((all) => all.filter((item) => item.kind === kind))
		.catch((err) => console.log(err));
}

function changeAudioStream(e) {}

export default function CreateMeeting() {
	const [title, setTitle] = useState("");
	const [formState, setFormState] = useState({});
	const [devices, setDevices] = useState([]);
	const [videos, setVideos] = useState([]);
	const [dragStart, drag, dragEnd, dragOver] = useDraggable(110, 110);
	const videoRef = useRef(null);

	const setVideo = (e) => {
		let constraints = {
			video: {
				deviceId: { exact: e.deviceId },
			},
		};
		navigator.mediaDevices
			.getUserMedia(constraints)
			// .then((all) => all.filter((item) => item.label === e))
			.then((stream) => (videoRef.current.srcObject = stream));
	};
	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ audio: true, video: true });
		getDevices("audioinput").then((d) => setDevices(d));
		getDevices("videoinput").then((d) => {
			setVideos(d);
			setVideo(d[0]);
		});
	}, []);

	return (
		<div>
			<Head>
				<title>Create Meeting</title>
			</Head>
			<main className="bg-gray-300 h-screen flex flex-row flex-wrap items-start">
				<aside className="new-meeting-form bg-gray-100 h-screen max-w-xs flex-1">
					{/* <NewMeetingForm onSubmit={setFormState} /> */}
					<label className="form-label">
						Audio Input <br />
						<select
							className="dropdown"
							name={"standard-dropdown"}
							// value={audioStream}
							placeholder="Select Audio Input"
							style={{ width: "100%" }}
							onChange={(e) => changeAudioStream(e)}
						>
							{enumerateDevices(devices)}
						</select>
					</label>
					<label className="form-label">
						Video Input <br />
						<select
							className="dropdown"
							name={"standard-dropdown"}
							// value={audioStream}
							placeholder="Select Audio Input"
							style={{ width: "100%" }}
							onChange={(e) => setVideo(e)}
						>
							{enumerateDevices(videos)}
						</select>
					</label>
				</aside>
				<div
					className="new-meeting-content"
					style={{
						border: "1px solid red",
						height: "100%",
						width: "100%",
						position: "relative",
					}}
				>
					<ContentButtons />
					<p>
						{position.x} {position.y}
					</p>
					<video
						autoPlay
						ref={videoRef}
						className="webcam"
						style={{
							width: 200,
							height: 200,
							transform: "scaleX(-1)",
							position: "absolute",
						}}
						draggable="true"
						onDrag={(e) => drag(e)}
						onDragStart={(e) => dragStart(e)}
						onDragEnd={(e) => dragEnd(e)}
						onDragOver={(e) => dragOver(e)}
					></video>
					<audio autoPlay></audio>
				</div>
			</main>
		</div>
	);
}

function addWebcam() {}

function addScreenCap() {}

function addDocument() {}
