import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import styles from './ArticleParamsForm.module.scss';
// --const
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
import { useState } from 'react';

type TArtiArticleParamsFormProps = {
	state: ArticleStateType;
	setState: (param: ArticleStateType) => void;
};
export const ArticleParamsForm = ({
	state,
	setState,
}: TArtiArticleParamsFormProps) => {
	// стейт открытия/закрытия сайдбара и стили
	const [isOpen, setOpen] = useState<boolean>(false);
	const classOpen = isOpen === true ? styles.container_open : '';

	// Обработчик открытия и закрытия сайдбара
	const handlerArrow = () => {
		setOpen(!isOpen);
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
		setFontFamily(fontFamilyOptions[0]);
		setFontSize(fontSizeOptions[0]);
		setFontColor(fontColors[0]);
		setBackgroundColor(backgroundColors[0]);
		setWidthContent(contentWidthArr[0]);

		setState(defaultArticleState);
	};

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
		<>
			<ArrowButton onClick={handlerArrow} isOpen={isOpen} />

			<aside className={`${styles.container} ${classOpen}`}>
				<form className={styles.form} onSubmit={handlerSubmitForm}>
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
		</>
	);
};
