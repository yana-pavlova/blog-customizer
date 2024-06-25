import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	type ArticleStateType,
} from '../../constants/articleProps';
import { type CSSProperties, useState } from 'react';
import clsx from 'clsx';
import styles from '../../styles/index.module.scss';


export const App = () => {
	// состояние страницы (стили)
	const [settings, setSettings] =
		useState<ArticleStateType>(defaultArticleState);

	// установка новых настроек страницы
	const applySettings = (settings: ArticleStateType) => {
		setSettings(settings);
	};

	return (
		<main
			className={styles.main}
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
				applySettings={applySettings}
			/>
			<Article />
		</main>
	);
};