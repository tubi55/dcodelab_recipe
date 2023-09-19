import { useQuery, useQueries } from '@tanstack/react-query';
import axios from 'axios';

const getRecipeByCategory = async ({ queryKey }) => {
	const { data } = await axios.get(`/filter.php?c=${queryKey[1]}`);
	return data?.meals || [];
};

//카테고리명으로 레시피데이터 fetching (추가로 debounce되는 Search값 가져옴)
export const useRecipeByCategory = (DebounceCategory, DebounceSearch) => {
	return useQuery(['RecipeByCategory', DebounceCategory], getRecipeByCategory, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		//Search값이 비어있을때에만 동작 (사용자가 검색어 요청중이면 카테고리 요청은 중지시키기 위함)
		enabled: DebounceSearch === '',
	});
};

const getRecipeBySearch = async ({ queryKey }) => {
	const { data } = await axios.get(`/search.php?s=${queryKey[1]}`);
	return data?.meals || [];
};

//검색어로 레시피데이터 fetching
export const useRecipeBySearch = (DobounceSearch) => {
	return useQuery(['RecipeBySearch', DobounceSearch], getRecipeBySearch, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		//Search값이 비어있지 않을때만 동작
		enabled: DobounceSearch !== '', //인수로 들어온 인풋이 빈 문자열이면 실행불가
	});
};

//아이디로 상세 레시피 fetching
const getRecipeById = async ({ queryKey }) => {
	const { data } = await axios.get(`/lookup.php?i=${queryKey[1]}`);
	return data?.meals?.[0] || '';
};
export const useRecipeById = (DebounceId) => {
	return useQuery(['RecipeById', DebounceId], getRecipeById, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
	});
};

export const useRecipesByIds = (arr) => {
	//배열값을 인수로 받아서 반복을 돌면서 쿼리키와 api함수를 객체를 배열로 묶어 리턴
	const queries = arr.map((id) => ({
		queryKey: ['RecipById', id],
		queryFn: getRecipeById,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
	}));

	//useQueries : 복수개의 useQuery를 병렬식으로 동시에 작업 실행
	//사용방법: useQueries([useQuery, useQuery, useQuery])
	return useQueries({ queries });
};
