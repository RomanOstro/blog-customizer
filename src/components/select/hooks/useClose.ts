import { useEffect } from 'react';

type TUseClose = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export function useClose({ isOpen, onClose, rootRef }: TUseClose) {
	useEffect(() => {
		if (!isOpen) return;

		function handleClickClose(event: MouseEvent) {
			const { target } = event;

			const isOutsideClick =
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current?.contains(target);

			if (isOutsideClick) {
				onClose();
			}
		}

		const handleEscClose = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscClose);
		document.addEventListener('mousedown', handleClickClose);

		return () => {
			document.removeEventListener('keydown', handleEscClose);
			document.removeEventListener('mousedown', handleClickClose);
		};
	}, [isOpen, onClose, rootRef]);
}
