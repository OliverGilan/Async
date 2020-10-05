import React, { useEffect, useState, useRef, Component } from "react";
import Head from "next/head";
import { NewMeetingForm } from "../components/Forms/NewMeeting";
import useDraggable from "../hooks/draggable";
import { VideoStreamPlayer } from "../components/Video/main";
import Button from "../components/Buttons/main";

function hasGetUserMedia() {
	return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function enumerateDevices(devices: MediaDeviceInfo[]): React.ReactFragment {
	return (
		<React.Fragment>
			<option key={"off"} value={"off"}>
				Off
			</option>
			{devices.map((d) => (
				<option key={d.deviceId} value={d.deviceId}>
					{d.label}
				</option>
			))}
		</React.Fragment>
	);
}

async function getDevices(kind): Promise<void | MediaDeviceInfo[]> {
	return await navigator.mediaDevices
		.enumerateDevices()
		.then((all) => all.filter((item) => item.kind === kind))
		.catch((err) => console.log(err));
}

export default function CreateMeetingPage(props) {
	const [formState, setFormState] = useState({});
	const [mics, setMics] = useState([]);
	const [videos, setVideos] = useState([]);
	const [audioStream, setAudioStream] = useState(null);
	const [webcamStream, setWebcam] = useState(null);
	const [screenCap, setScreenCap] = useState(null);
	const [recording, setRecording] = useState(false);
	const [recorders, setRecorders] = useState([]);

	useEffect(() => {
		getDevices("audioinput").then((d) => (d ? setMics(d) : undefined));
		getDevices("videoinput").then((d) => (d ? setVideos(d) : undefined));
	}, []);

	const changeAudioStream = (e: React.ChangeEvent) => {
		let target = e.target as HTMLSelectElement;
		let value = target.value;
		console.log(value);
		if (value === "off") {
			audioStream.getTracks().forEach((t) => t.stop());
			setAudioStream(null);
		} else {
			navigator.mediaDevices
				.getUserMedia({
					audio: {
						deviceId: value,
					},
				})
				.then((stream) => setAudioStream(stream))
				.catch((err) => alert(err));
		}
	};

	const changeVideoStream = (e: React.ChangeEvent) => {
		let target = e.target as HTMLSelectElement;
		let value = target.value;
		console.log(value);
		if (value === "off") {
			webcamStream.getTracks().forEach((t) => t.stop());
			setWebcam(null);
		} else {
			navigator.mediaDevices
				.getUserMedia({
					video: {
						deviceId: value,
					},
				})
				.then((stream) => setWebcam(stream))
				.catch((err) => alert(err));
		}
	};

	const changeScreenCap = () => {
		const gdmOptions = {
			video: {
				cursor: "always",
			},
			audio: {
				echoCancellation: true,
				noiseSuppression: true,
				sampleRate: 44100,
			},
		};
		let md = navigator.mediaDevices as any;
		console.log(md);
		md.getDisplayMedia(gdmOptions).then((stream) => {
			setScreenCap(stream);
			stream.oninactive = () => setScreenCap(null);
		});
	};

	const log = (recorder: MediaRecorder, msg?: string) => {
		if (msg) {
			console.log(msg);
		}
		console.log(recorder.state);
	};

	const startRecording = () => {
		if (recording) {
			return false;
		}

		let recs = [];
		let options = {
			audioBitsPerSecond: 128000,
			videoBitsPerSecond: 2500000,
		};
		for (let stream of [audioStream, webcamStream, screenCap]) {
			if (stream) {
				let recorder = new MediaRecorder(stream, options);
				recs.push(recorder);
			}
		}
		let chunks = new Array(recs.length).fill([]);
		recs.forEach((r: MediaRecorder, i: number) => {
			r.ondataavailable = (event: BlobEvent) => {
				chunks[i].push(event.data);
				console.log(event.data);
				//Send chunk to server HERE
			};
			r.start(15000);
			log(r, "recording started");
		});
		setRecording(true);
		setRecorders(recs);
	};

	const pauseRecording = () => {
		setRecording(false);
		recorders.forEach((rec: MediaRecorder, i: number) => {
			rec.pause();
			log(rec, "recording paused");
		});
	};

	const finishRecording = () => {
		if (recording) {
			setRecording(false);
		}
		recorders.forEach((rec: MediaRecorder, i: number) => {
			rec.stop();
			log(rec, "recording stopped");
		});
	};

	return (
		<div>
			<Head>
				<title>Create Meeting</title>
			</Head>
			<main className="bg-gray-300 h-screen flex flex-row flex-nowrap items-start">
				<aside className="new-meeting-form bg-gray-100 w-1/4 h-screen p-8 overflow-scroll border-r-2 border-gray-400">
					<NewMeetingForm onSubmit={setFormState} />
					<label className="form-label text-gray-700 font-bold">
						Audio
						<select
							className="dropdown w-full outline-none text-lg mb-4 mt-2 pt-1 pb-1 rounded-sm bg-gray-200"
							name={"standard-dropdown"}
							// value={audioStream}
							placeholder="Select Audio Input"
							style={{ width: "100%" }}
							onChange={(e) => changeAudioStream(e)}
						>
							{enumerateDevices(mics)}
						</select>
					</label>
					<label className="form-label text-gray-700 font-bold">
						Webcam
						<select
							className="dropdown w-full outline-none text-lg mb-4 mt-2 pt-1 pb-1 rounded-sm bg-gray-200"
							name={"standard-dropdown"}
							// value={audioStream}
							placeholder="Select Webcam Input"
							style={{ width: "100%" }}
							onChange={(e) => changeVideoStream(e)}
						>
							{enumerateDevices(videos)}
						</select>
					</label>
				</aside>
				<div className="new-meeting-content h-full flex-2 relative flex flex-row justify-center items-center">
					<div className="buttons border-2">
						<button
							className="add-screencap-btn"
							onClick={() => changeScreenCap()}
						>
							Add Screencap
						</button>
					</div>
					<div className="absolute self-end m-24">
						{recording && (
							<Button.Outline
								text="Pause Meeting"
								onClick={() => pauseRecording()}
							/>
						)}
						{!recording && recorders.length == 0 && (
							<Button.Outline
								text="Start Meeting"
								onClick={() => startRecording()}
							/>
						)}
						{!recording && recorders.length > 0 && (
							<Button.Outline text="Resume Meeting" />
						)}
					</div>
				</div>
				{(webcamStream || screenCap) && (
					<div className="bg-gray-200 flex-1 h-full border-l-2 border-gray-400 flex flex-col justify-center">
						<div className="m-6 overflow-hidden">
							<VideoStreamPlayer
								stream={webcamStream}
								inactive="Webcam Stream"
								flipped
							/>
						</div>
						<div className="m-6">
							<VideoStreamPlayer
								stream={screenCap}
								inactive="ScreenCapture Stream"
							/>
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
