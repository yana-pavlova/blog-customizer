import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { Select } from '../select';
import {
	type ArticleStateType,
	type OptionType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';
import { useEffect, useState } from 'react';
import { RadioGroup } from '../radio-group';
import { Separator } from 'components/separator';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	refForm: React.RefObject<HTMLFormElement>;
	refButton: React.RefObject<HTMLDivElement>;
	refArticle: React.RefObject<HTMLDivElement>;
	applySettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	refForm,
	refButton,
	refArticle,
	applySettings,
}: ArticleParamsFormProps) => {
	// состояние управляет тем, открыта форма на странице или нет
	const [formIsOpened, setformIsOpened] = useState(false);
	// скрыть/показать форму
	const toggleForm = () => {
		setformIsOpened((prevformIsOpened) => !prevformIsOpened);
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			// условие истинно, только если клик произошёл не на форме и не на диве с кнопкой закрытия/открытия формы
			if (
				formIsOpened &&
				!refForm.current!.contains(e.target as Node) &&
				!refButton.current!.contains(e.target as Node)
			) {
				toggleForm();
			}
		};

		refArticle.current!.addEventListener('click', handleClickOutside);

		// удаление обработчика при размонтировании компонента
		return () => {
			refArticle.current!.removeEventListener('click', handleClickOutside);
		};
	}, [formIsOpened]);

	// состояние формы (стили)
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(defaultArticleState);

	// сброс настроек формы к дефолтным значениям
	const resetFormSettings = () => {
		setFormSettings(defaultArticleState);
		applySettings(defaultArticleState);
		toggleForm();
	};

	// функция для обновления настроек формы по отдельности
	const updateFormSettings = (newSettings: Partial<ArticleStateType>) => {
		setFormSettings((prevSettings) => ({
			...prevSettings,
			...newSettings,
		}));
	};

	// деструктуризация для извлечения значений из formSettings
	const {
		fontFamilyOption,
		fontColor,
		backgroundColor,
		contentWidth,
		fontSizeOption,
	} = formSettings;

	const handleFontChange = (selected: OptionType) =>
		updateFormSettings({ fontFamilyOption: selected });
	const handleFontColorChange = (selected: OptionType) =>
		updateFormSettings({ fontColor: selected });
	const handleBackgroundColorChange = (selected: OptionType) =>
		updateFormSettings({ backgroundColor: selected });
	const handleContentWidthChange = (selected: OptionType) =>
		updateFormSettings({ contentWidth: selected });
	const handleFontSizeChange = (selected: OptionType) =>
		updateFormSettings({ fontSizeOption: selected });

	// плейсхолдеры
	const defaultFontFamilyPlaceholder = fontFamilyOption
		? fontFamilyOption.title
		: fontFamilyOptions.length > 0
		? fontFamilyOptions[0].title
		: 'Выберите шрифт';
	const defaultFontColorPlaceholder = fontSizeOption
		? fontSizeOption.title
		: fontSizeOptions.length > 0
		? fontSizeOptions[0].title
		: 'Выберите цвет текста';
	const defaultBackGroundColorPlaceholder = backgroundColor
		? backgroundColor.title
		: backgroundColors.length > 0
		? backgroundColors[0].title
		: 'Выберите цвет фона';
	const defaultContentWidthPlaceholder = contentWidth
		? contentWidth.title
		: contentWidthArr.length > 0
		? contentWidthArr[0].title
		: 'Выберите ширину контента';

	// обработчик сабмита формы
	const handleApplyClick = (e: React.FormEvent) => {
		e.preventDefault();
		applySettings(formSettings);
		toggleForm();
	};

	return (
		<>
			<ArrowButton
				toggleForm={toggleForm}
				formIsOpened={formIsOpened}
				ref={refButton}
			/>
			<aside
				className={clsx(
					`${styles.container} ${formIsOpened ? styles.container_open : ''}`
				)}>
				<form className={clsx(styles.form)} ref={refForm}>
					<h2 className={clsx(styles.title)}>Задайте параметры</h2>
					<Select
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						placeholder={defaultFontFamilyPlaceholder}
						title='Шрифт'
						onChange={handleFontChange}
					/>
					<RadioGroup
						name='Размер шрифта'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={fontSizeOption}
						onChange={handleFontSizeChange}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						placeholder={defaultFontColorPlaceholder}
						title='Цвет шрифта'
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						placeholder={defaultBackGroundColorPlaceholder}
						title='Цвет фона'
						onChange={handleBackgroundColorChange}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						placeholder={defaultContentWidthPlaceholder}
						title='Ширина контента'
						onChange={handleContentWidthChange}
					/>

					<div className={clsx(styles.bottomContainer)}>
						<Button title='Сбросить' type='reset' onClick={resetFormSettings} />
						<Button
							title='Применить'
							type='submit'
							onClick={handleApplyClick}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
