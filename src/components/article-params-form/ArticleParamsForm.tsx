import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Text } from '../text';
import {
	ArticleStateType,
	OptionType,
	fontSizeOptions,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useClose } from '../select/hooks/useClose';
import { useRef, useState } from 'react';

type TArtiArticleParamsFormProps = {
	state: ArticleStateType;
	setState: (param: ArticleStateType) => void;
};
export const ArticleParamsForm = ({
	state,
	setState,
}: TArtiArticleParamsFormProps) => {
	const formRef = useRef<HTMLDivElement | null>(null);

	// стейт открытия/закрытия сайдбара и стили
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	// Обработчик открытия и закрытия сайдбара
	const handlerArrow = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// Обработчик  закрытия сайдбара
	const handleCloseMenu = () => {
		setIsMenuOpen(false);
	};
	// Обработчик сабмита
	const handlerSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setState({
			fontFamilyOption: selectFontFamily,
			fontSizeOption: selectFontSize,
			fontColor: selectFontColor,
			contentWidth: widthContent,
			backgroundColor: selectBackgroundColor,
		});
	};

	// Обработчик кнопки сброса
	const handlerResetForm = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setWidthContent(defaultArticleState.contentWidth);

		setState(defaultArticleState);
	};

	// Хук для закрытия сайдбара по Esc и клику вне сайдбара
	useClose({
		isOpen: isMenuOpen,
		onClose: handleCloseMenu,
		rootRef: formRef,
	});

	// Стиль шрифта
	const [selectFontFamily, setFontFamily] = useState<OptionType>(
		state.fontFamilyOption
	);

	// Размер шрифта
	const [selectFontSize, setFontSize] = useState<OptionType>(
		state.fontSizeOption
	);
	// Цвет шрифта
	const [selectFontColor, setFontColor] = useState<OptionType>(state.fontColor);

	// Цвет фона
	const [selectBackgroundColor, setBackgroundColor] = useState(
		state.backgroundColor
	);

	// Ширина контента
	const [widthContent, setWidthContent] = useState(state.contentWidth);

	return (
		<div ref={formRef}>
			<ArrowButton onClick={handlerArrow} isOpen={isMenuOpen} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={handlerSubmitForm}>
					<Text weight={800} size={31} uppercase>
						задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={selectFontFamily}
						onChange={(selectFontFamily) => setFontFamily(selectFontFamily)}
						title='шрифт'
					/>

					<RadioGroup
						name='fontSizeOptions'
						options={fontSizeOptions}
						onChange={(selectFontSize) => setFontSize(selectFontSize)}
						selected={selectFontSize}
						title='Размер шрифта'
					/>

					<Select
						options={fontColors}
						selected={selectFontColor}
						onChange={(selectFontColor) => setFontColor(selectFontColor)}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={selectBackgroundColor}
						onChange={(selectBackgroundColor) =>
							setBackgroundColor(selectBackgroundColor)
						}
						title='цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={widthContent}
						onChange={(widthContent) => setWidthContent(widthContent)}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button onClick={handlerResetForm} title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
