import Head from 'next/head';
import styles from './style.module.scss';
import axios from 'axios';
import Category from '@/components/molecules/Category/Category';
import { useRecipeByCategory, useRecipeBySearch } from '@/hooks/useRecipe';
import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Card from '@/components/molecules/Card/Card';
import { Title } from '@/components/atoms/text/Title';
import clsx from 'clsx';
import SearchBar from '@/components/molecules/SearchBar/SearchBar';
import { Text } from '@/components/atoms/text/Text';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function Recipe({ categories }) {
	const { point } = useThemeColor();
	const names = useRef([]);
	//카테고리 컴포넌트에 순수하게 출력해야되는 메뉴명을 배열로 전달해야 되므로
	//서버에서 받아온 데이터에서 strCategory에 해당 하는 메뉴값만 배열로 반환해서 참조객체에 담고 컴포넌트에 전달
	names.current = categories.map((category) => category.strCategory);
	const [Selected, setSelected] = useState(categories[0].strCategory);
	const [Search, setSearch] = useState('');
	const DebouncedSelected = useDebounce(Selected);
	const DebouncedSearch = useDebounce(Search);

	const { data: dataByCategory, isSuccess: isCategory } = useRecipeByCategory(
		DebouncedSelected,
		DebouncedSearch
	);
	const { data: dataBySearch, isSuccess: isSearch } = useRecipeBySearch(DebouncedSearch);

	const handleClickCategory = (state) => {
		setSearch('');
		setSelected(state);
	};

	useEffect(() => {
		if (DebouncedSearch) {
			setSelected('');
		} else {
			setSearch('');
			!DebouncedSelected && setSelected(categories[0].strCategory);
		}
	}, [DebouncedSearch, DebouncedSelected, categories]);

	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<section className={styles.recipePage}>
				<Category
					items={names.current}
					onClick={handleClickCategory}
					active={DebouncedSelected}
					className={clsx(styles.category)}
				/>

				<article className={clsx(styles.titBox)}>
					<Title
						type={'slogan'}
						className={clsx(styles.titCategory)}
						style={{ color: point, hoverColor: point }}
					>
						{DebouncedSelected ? DebouncedSelected : `Result: ${DebouncedSearch}`}
					</Title>

					<SearchBar
						inputType={'text'}
						isBtn={false}
						placeholder={'search'}
						value={Search}
						onChange={setSearch}
					/>
				</article>

				<div className={clsx(styles.listFrame)}>
					{isCategory &&
						dataByCategory.map((el) => (
							<Card
								key={el.idMeal}
								imgSrc={el.strMealThumb}
								url={`/find-recipe/${el.idMeal}?name=${el.strMeal}`}
								txt={`${el.strMeal}`}
								className={clsx(styles.card)}
							/>
						))}

					{isSearch &&
						dataBySearch.map((el) => (
							<Card
								key={el.idMeal}
								imgSrc={el.strMealThumb}
								url={`/find-recipe/${el.idMeal}`}
								txt={`${el.strMeal}`}
								className={clsx(styles.card)}
							/>
						))}

					{isSearch && dataBySearch.length === 0 && (
						<Text style={{ fontSize: 22, marginTop: 80, color: 'orange' }}>
							No Results!! <br /> Try another Recipe Name.
						</Text>
					)}
				</div>
			</section>
		</>
	);
}

export async function getStaticProps() {
	const { data } = await axios.get('/categories.php');

	return {
		props: { categories: data.categories },
	};
}
