import Btn from '@/components/atoms/Button/Btn';
import styles from './Category.module.scss';
import clsx from 'clsx';

function Category({ items, onClick, active, names, className }) {
	return (
		<nav className={clsx(styles.category, className)}>
			{items.map((el, idx) => (
				<Btn key={idx} onClick={() => onClick(items[idx])} isActive={active === items[idx]}>
					{names ? names[idx] : el}
				</Btn>
			))}
		</nav>
	);
}

export default Category;
