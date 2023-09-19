import { Text } from '@/components/atoms/text/Text';
import styles from './BreadCrumbs.module.scss';
import clsx from 'clsx';
import React from 'react';

function BreadCrumbs({ data, isActive }) {
	return (
		<nav className={clsx(styles.breadcrumbs, isActive ? styles.on : '')}>
			{data.map((name, idx) => {
				const result = name.includes('-')
					? name
							.split('-')
							.map((txt) => txt.charAt(0).toUpperCase() + txt.slice(1))
							.join(' ')
					: name;

				const result2 = result.includes('=') ? result.split('=')[1].replaceAll('%20', ' ') : result;

				if (idx !== data.length - 1) {
					return (
						<React.Fragment key={idx}>
							<Text tag={'em'} url={`/${name}`}>
								{!result ? 'Home' : result}
							</Text>
							<span> / </span>
						</React.Fragment>
					);
				} else {
					return (
						<Text key={idx} tag={'strong'}>
							{result2}
						</Text>
					);
				}
			})}
		</nav>
	);
}

export default BreadCrumbs;
