import { createRoot } from 'react-dom/client';
import { StrictMode, type CSSProperties, useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, type ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// состояние управляет тем, открыта форма на странице или нет
	const [formIsOpened, setformIsOpened] = useState(false);
	// состояние страницы (стили)
	const [settings, setSettings] = useState<ArticleStateType>(defaultArticleState);
	// оба рефа пробрасываются в дочерний компонент ArticleParamsForm
	const refForm = useRef<HTMLFormElement | null>(null);
	// refButton пробрасывается до ArrowButton
    const refButton = useRef<HTMLDivElement | null>(null);
	// реф нужен для обработки клика вне формы
	const refArticle = useRef<HTMLDivElement | null>(null);

	// скрыть/показать форму
	const toggleForm = () => {
		setformIsOpened((prevformIsOpened) => !prevformIsOpened);
	};

	// установка новых настроек страницы
	const applySettings = (settings: ArticleStateType) => {
		setSettings(settings);
		toggleForm();
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			// условие истинно, только если клик произошёл не на форме и не на диве с кнопкой закрытия/открытия формы

			// biome-ignore lint/style/noNonNullAssertion: <explanation>
						if(formIsOpened && !refForm.current!.contains(e.target as Node) && !refButton.current!.contains(e.target as Node)) {
				toggleForm();
			}
		};

		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		refArticle.current!.addEventListener('click', handleClickOutside);

		// удаление обработчика при размонтировании компонента
		return () => {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			refArticle.current!.removeEventListener('click', handleClickOutside);
		};
	}, [formIsOpened]);

	return (
		<div
			ref={refArticle}
			className={clsx(styles.main)}
			style={
				{
					'--font-family': settings.fontFamilyOption.value,
					'--font-size': settings.fontSizeOption.value,
					'--font-color': settings.fontColor.value,
					'--container-width': settings.contentWidth.value,
					'--bg-color': settings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				toggleForm={toggleForm}
				formIsOpened={formIsOpened}
				refForm={refForm}
				refButton={refButton}
        		applySettings={applySettings}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
