import { Pic } from '@/components/atoms/pic/Pic';
import { Title } from '@/components/atoms/text/Title';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import styles from './detail.module.scss';
import { BounceLoader } from 'react-spinners';
import { Table } from '@/components/atoms/Table/Table';
import { useState, useEffect } from 'react';
import List from '@/components/atoms/List/List';
import Btn from '@/components/atoms/Button/Btn';
import { Text } from '@/components/atoms/text/Text';
import { useThemeColor } from '@/hooks/useThemeColor';

function Detail() {
	const { point } = useThemeColor();
	const router = useRouter();
	const { id } = router.query;
	const { data } = useRecipeById(id);
	const [TableData, setTableData] = useState([]);
	const [ListData, setListData] = useState([]);
	const [Saved, setSaved] = useState(false);

	//버튼 클릭할때마다 해당 recipeId를 저장, 삭제해주는 토글함수
	const handleSave = () => {
		const savedRecipe = JSON.parse(localStorage.getItem('savedRecipe'));

		if (!Saved) {
			savedRecipe.push(data.idMeal);
			localStorage.setItem('savedRecipe', JSON.stringify(savedRecipe));
			setSaved(true);
		} else {
			//배열.splice('자를요소의 순번','갯수')
			//해당페이지의 레시피아이디값의 배열의 순번을 구한다음 해당 순번의 배열값 하나만 제거
			savedRecipe.splice(savedRecipe.indexOf(data.idMeal), 1);
			localStorage.setItem('savedRecipe', JSON.stringify(savedRecipe));
			setSaved(false);
		}
	};

	useEffect(() => {
		if (localStorage.getItem('savedRecipe')) {
			const savedRecipe = JSON.parse(localStorage.getItem('savedRecipe'));
			if (savedRecipe.includes(id)) {
				setSaved(true);
			} else {
				setSaved(false);
			}
		} else {
			localStorage.setItem('savedRecipe', JSON.stringify([]));
		}
	}, [id]);

	useEffect(() => {
		if (data) {
			const keys = Object.keys(data);
			const filterKeys1 = keys.filter((key) => key.startsWith('strIngredient'));
			const filterKeys2 = filterKeys1.filter((key) => data[key] !== '' && data[key] !== null);
			const ingredients = filterKeys2.map((key, idx) => ({
				index: idx + 1,
				ingredient: data[key],
				measuer: data[`strMeasure${idx + 1}`],
			}));
			setTableData(ingredients);

			let instructions = data.strInstructions
				.split('\r\n')
				.map((text) => (text.includes('.\t') ? text.replace('.\t', '+').split('+')[1] : text))
				.filter((text) => text !== '');

			setListData(instructions);
		}
	}, [data]);

	return (
		<section className={clsx(styles.detail)}>
			<BounceLoader
				loading={!data}
				cssOverride={{
					position: 'absolute',
					top: 300,
					left: '50%',
					transform: 'translateX(-50%)',
				}}
				color={point}
				size={100}
			/>
			{data && (
				<>
					<Title type={'slogan'} style={{ color: point, hoverColor: point }}>
						{data.strMeal}
					</Title>

					<div className={clsx(styles.picFrame)}>
						<Pic imgSrc={data.strMealThumb} />
					</div>

					{/* 버튼 클릭시 Saved값이 true일떄만 모듈sass로 del 클래스명을 붙이고 해당 고유 클래스명은 atom컴포넌트로 상속됨 : 결과적으로 해당 클래스명의 스타일이 atom컴포넌트의 기본 style을 덮어쓰기 */}
					<Btn onClick={handleSave} className={clsx(Saved && styles.del)}>
						{Saved ? 'Remove from my Favoraite' : 'Add to my Favorait'}
					</Btn>
					{Saved && <Text>You already added this recipe to your Favoraite.</Text>}
					<Table data={TableData} title={data.strMeal} />

					<List data={ListData} tag={'ol'} />
				</>
			)}
		</section>
	);
}

export default Detail;
