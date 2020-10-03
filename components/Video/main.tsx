import React, { useRef, useState, useEffect, FunctionComponent } from "react";

interface VideoStreamProps {
	stream?: MediaStream;
	inactive?: string;
	flipped?: boolean;
}

export const VideoStreamPlayer: FunctionComponent<VideoStreamProps> = (
	props
) => {
	const videoRef = useRef(null);

	useEffect(() => {
		videoRef.current.srcObject = props.stream;
	}, [props.stream]);

	return (
		<div className="videoplayercontainer">
			<video
				autoPlay
				ref={videoRef}
				className="videoplayer streamplayer"
				style={
					props.flipped
						? {
								transform: "scaleX(-1)",
						  }
						: {}
				}
			/>
			{!props.stream && (
				<p className="videoplayer-inactive">
					{props.inactive ? props.inactive : "No video stream provided"}
				</p>
			)}
		</div>
	);
};
