import { Text } from 'components/text';

import styles from './Button.module.scss';

export const Button = ({
	title,
	onClick,
	type,
}: {
	title: string;
	// добавлен аргумент, чтобы можно было сбрасывать дефолтное поведение при клике
	onClick?: (e: React.FormEvent) => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
	return (
		<button className={styles.button} type={type} onClick={onClick}>
			<Text extraClassName={styles.text} weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
