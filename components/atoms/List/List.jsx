import styles from './List.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

function List({ style, className, data, url, tag = 'ul' }) {
	return React.createElement(
		tag,
		{ className: clsx(styles.list, className), style: style },
		data.map((el, idx) => {
			const child = tag === 'ol' ? `${idx + 1} : ${el}` : el;
			return React.createElement(
				'li',
				{ key: idx },
				url ? React.createElement(Link, { href: `${url[idx]}` }, child) : child
			);
		})
	);
}

export default List;
