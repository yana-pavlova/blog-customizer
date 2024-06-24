import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
import { forwardRef } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;
export type ArrowButtonProps = {
	toggleForm: () => void;
	formIsOpened: boolean;
};

// forwardRef для доступа к ref (пробрасывается из App)
export const ArrowButton = forwardRef<HTMLDivElement, ArrowButtonProps>(
	({ toggleForm, formIsOpened }, ref) => {
		return (
			<div
				ref={ref}
				onClick={toggleForm}
				role='button'
				aria-label='Открыть/Закрыть форму параметров статьи'
				tabIndex={0}
				className={clsx(styles.container, {
					[styles.container_open]: formIsOpened,
				})}>
				<img
					src={arrow}
					alt='иконка стрелочки'
					className={clsx(styles.arrow, { [styles.arrow_open]: formIsOpened })}
				/>
			</div>
		);
	}
);
