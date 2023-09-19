import { Pic } from '@/components/atoms/pic/Pic';
import styles from './Card.module.scss';
import clsx from 'clsx';
import { Title } from '@/components/atoms/text/Title';

function Card({ txt, imgSrc, className, url, type }) {
	return (
		<article className={clsx(styles.card, className, styles[type])}>
			{imgSrc && <Pic imgSrc={imgSrc} />}
			{txt && (
				<Title tag={'h3'} url={url} type={'subTitle'}>
					{txt}
				</Title>
			)}
		</article>
	);
}

export default Card;
