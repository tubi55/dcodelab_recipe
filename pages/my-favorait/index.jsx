import Head from 'next/head';
import clsx from 'clsx';
import { Title } from '@/components/atoms/text/Title';
import styles from './favorait.module.scss';
import { useState, useEffect } from 'react';
import { useRecipesByIds } from '@/hooks/useRecipe';
import Card from '@/components/molecules/Card/Card';
import { useThemeColor } from '@/hooks/useThemeColor';

function Favorait() {
	const [SavedId, setSavedId] = useState([]);
	const { point } = useThemeColor();

	useEffect(() => {
		if (localStorage.getItem('savedRecipe')) {
			setSavedId(JSON.parse(localStorage.getItem('savedRecipe')));
		} else {
			localStorage.setItem('savedRecipe', JSON.stringify([]));
		}
	}, []);

	const result = useRecipesByIds(SavedId);

	return (
		<>
			<Head>
				<title>Favoraite Page</title>
			</Head>

			<section className={clsx(styles.favoraitePage)}>
				<Title
					type={'slogan'}
					style={{ color: point, hoverColor: point }}
					className={clsx(styles.titCategory)}
				>
					My Favoraite Recipe
				</Title>
				{result &&
					result.map(({ data, isSuccess }) => {
						if (isSuccess) {
							return (
								<Card
									key={data.idMeal}
									imgSrc={data.strMealThumb}
									url={`/find-recipe/${data.idMeal}?name=${data.strMeal}`}
									txt={`${data.strMeal}`}
									className={clsx(styles.card)}
									type={'horizontal'}
								/>
							);
						}
					})}
			</section>
		</>
	);
}

export default Favorait;
