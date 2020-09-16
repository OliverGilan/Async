import React, { useState } from "react";

const useDraggable = (x: number = 0, y: number = 0) => {
	const [mouse, setMouse] = useState({ x: 0, y: 0 });

	const dragStart = (e: DragEvent) => {
		let style = window.getComputedStyle(e.target as Element, null);
		let image = (e.target as Element).cloneNode(false) as Element;
		e.dataTransfer.setDragImage(image, 10, 25);
		setMouse({
			x: parseInt(style.getPropertyValue("left"), 10) - e.clientX,
			y: parseInt(style.getPropertyValue("top"), 10) - e.clientY,
		});
	};

	const dragEnd = (e: DragEvent) => {
		e.preventDefault();
		let item = e.target as HTMLElement;
		item.style.left = e.clientX + mouse.x + "px";
		item.style.top = e.clientY + mouse.y + "px";
		setMouse({ x: 0, y: 0 });
		return false;
	};

	const drag = (e: DragEvent) => {
		let item = e.target as HTMLElement;
		item.style.left = e.clientX + mouse.x + "px";
		item.style.top = e.clientY + mouse.y + "px";
		return false;
	};

	const dragOver = (e: DragEvent) => {
		e.preventDefault();
		return false;
	};

	return [dragStart, drag, dragEnd, dragOver];
};

export default useDraggable;
