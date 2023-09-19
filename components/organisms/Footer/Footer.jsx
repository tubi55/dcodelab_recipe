import styles from './Footer.module.scss';
import clsx from 'clsx';
import { Text } from '@/components/atoms/text/Text';
import { useGlobalData } from '@/hooks/useGlobalContext';
import Category from '@/components/molecules/Category/Category';

function Footer() {
	const { setTheme, Theme } = useGlobalData();
	return (
		<footer className={clsx(styles.footer)}>
			<nav>
				<Category
					items={['theme1', 'theme2', 'theme3']}
					names={['Orange', 'Aqua', 'Hot pink']}
					active={Theme}
					onClick={setTheme}
					className={clsx(styles.category)}
				/>
			</nav>
			<Text type={'util'} style={{ letterSpacing: 2 }}>
				2023 Decodelab All rights reserved.
			</Text>
		</footer>
	);
}

export default Footer;
