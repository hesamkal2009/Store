import { useRef, useState } from "react";
import { Button, Overlay, Popover } from "react-bootstrap";

interface IModal {
	buttonLabel: any;
	title: any;
	variant: string;
	cssClass: string;
}

const Modal: React.FC<IModal> = (props) => {
	const [show, setShow] = useState(false);
	const [target, setTarget] = useState(null);
	const ref = useRef(null);

	const handleClick = (event: any) => {
		setShow(!show);
		setTarget(event.target);
	};

	return (
		<div ref={ref}>
			<Button
				onClick={handleClick}
				variant={props.variant}
				className={props.cssClass}
			>
				{props.buttonLabel}
			</Button>

			<Overlay
				show={show}
				target={target}
				placement="bottom"
				container={ref}
				containerPadding={20}
			>
				<Popover id="popover-contained">
					<Popover.Header as="h3">{props.title}</Popover.Header>
					<Popover.Body>{props.children}</Popover.Body>
				</Popover>
			</Overlay>
		</div>
	);
};

export default Modal;
