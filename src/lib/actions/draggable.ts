const HEADER_HEIGHT = 40;

export function draggable(
	node: HTMLElement,
	options: {
		handle?: HTMLElement;
	} = {}
) {
	let x: number;
	let y: number;
	let handle = options.handle || node;

	function handleMouseDown(event: MouseEvent) {
		x = event.clientX - node.offsetLeft;
		y = event.clientY - node.offsetTop;

		window.addEventListener('mousemove', handleMouseMove);
	}

	function handleMouseUp() {
		window.removeEventListener('mousemove', handleMouseMove);
	}

	function handleMouseMove(event: MouseEvent) {
		node.style.left = `${event.clientX - x}px`;
		node.style.top = `${event.clientY - y}px`;

    // constrain to window
    const rect = node.getBoundingClientRect();
    if (rect.left < 0) node.style.left = "0px";
    if (rect.top < HEADER_HEIGHT) node.style.top = `0px`;
    if (rect.right > window.innerWidth) node.style.left = `${window.innerWidth - rect.width}px`;
    if (rect.bottom > window.innerHeight) node.style.top = `${window.innerHeight - rect.height}px`;
	}

	handle.addEventListener('mousedown', handleMouseDown);
	window.addEventListener('mouseup', handleMouseUp);

	return {
		update(
			options: {
				handle?: HTMLElement;
			} = {}
		) {
			handle.removeEventListener('mousedown', handleMouseDown);
			handle = options.handle || node;
			handle.addEventListener('mousedown', handleMouseDown);
		}
	};
}
