export function draggable(
	node: HTMLElement,
	options: {
		handle?: HTMLElement;
	} = {}
) {
	let x;
	let y;
	let handle = options.handle || node;

	function handleMouseDown(event) {
		x = event.clientX - node.offsetLeft;
		y = event.clientY - node.offsetTop;

		window.addEventListener('mousemove', handleMouseMove);
	}

	function handleMouseUp() {
		window.removeEventListener('mousemove', handleMouseMove);
	}

	function handleMouseMove(event) {
		node.style.left = `${event.clientX - x}px`;
		node.style.top = `${event.clientY - y}px`;

    // constrain to window
    const rect = node.getBoundingClientRect();
    if (rect.left < 0) node.style.left = 0;
    if (rect.top < 0) node.style.top = 0;
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
