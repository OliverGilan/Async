import Head from "next/head";
import styles from "../styles/Dashboard.module.css";
import Button from "../components/primary_button/main";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<Head>
				<title>Yeeticus</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className=" bg-gray-300 h-screen flex flex-col flex-no-wrap justify-center items-center">
				<p className="text-gray-600 text-sm py-4">
					Looks like you have no pending meetings!
				</p>
				<Button.Primary
					text="Create Meeting"
					onClick={() => router.push("/CreateMeeting", "create-meeting")}
					className="w-0"
				/>
			</main>

			<footer></footer>
		</div>
	);
}

function createMeeting() {
	startCapture({
		video: {
			cursor: "always",
		},
		audio: {
			echoCancellation: true,
			noiseSuppression: true,
			sampleRate: 44100,
		},
	});
}

async function startCapture(displayMediaOptions) {
	let captureStream = null;

	try {
		captureStream = await navigator.mediaDevices.getDisplayMedia(
			displayMediaOptions
		);
	} catch (err) {
		console.error("Error: " + err);
	}
	return captureStream;
}
