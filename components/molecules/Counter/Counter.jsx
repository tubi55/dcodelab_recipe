import { Text } from '@/components/atoms/text/Text';
import styles from './Counter.module.scss';
import clsx from 'clsx';

function Counter({ index, len }) {
	return (
		<div className={clsx(styles.counter)}>
			<Text tag={'strong'} type={'menu'}>
				{index < 10 ? '0' + (index + 1) : index + 1}
			</Text>
			<Text tag={'span'} type={'menu'}>
				/ {len < 10 ? '0' + len : len}
			</Text>
		</div>
	);
}

export default Counter;
