import { createRoot } from 'react-dom/client';
import {
	StrictMode,
	type CSSProperties,
	useState,
	useRef,
} from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	type ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// реф нужен для обработки клика вне формы, пробрасывается в компонент формы
	const refArticle = useRef<HTMLDivElement | null>(null);
	// состояние страницы (стили)
	const [settings, setSettings] =
		useState<ArticleStateType>(defaultArticleState);
	// оба нижних рефа пробрасываются в форму
	const refForm = useRef<HTMLFormElement | null>(null);
	// refButton пробрасывается из формы в кнопку открытия формы
	const refButton = useRef<HTMLDivElement | null>(null);

	// установка новых настроек страницы
	const applySettings = (settings: ArticleStateType) => {
		setSettings(settings);
	};

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
				refArticle={refArticle}
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
