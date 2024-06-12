import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

export type TArrowButtonProps = {
	/** Функция для обработки открытия/закрытия формы */
	onClick: () => void;
	isOpen: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: TArrowButtonProps) => {
	const classTogleButton = isOpen === true ? styles.container_open : '';
	const classToogleArrow = isOpen === true ? styles.arrow_open : '';

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${classTogleButton}`}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={`${styles.arrow} ${classToogleArrow}`}
			/>
		</div>
	);
};
