import Head from 'next/head';
import Header from '../../organisms/Header/Header';
import styles from './Layout.module.scss';
import clsx from 'clsx';
import Footer from '@/components/organisms/Footer/Footer';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import BreadCrumbs from '@/components/molecules/BreadCrumbs/BreadCrumbs';
import { useGlobalData } from '@/hooks/useGlobalContext';
import { motion, AnimatePresence } from 'framer-motion';

function Layout({ children }) {
	const { Theme } = useGlobalData();
	const router = useRouter();
	const [Path, setPath] = useState([]);
	const [IsShow, setIsShow] = useState(true);
	const [IsMain, setIsMain] = useState(true);

	useEffect(() => {
		const arr = router.asPath.split('/');
		setPath(arr);
		setIsShow(false);
		setIsMain(router.asPath === '/');
		setTimeout(() => setIsShow(true), 500);
	}, [router]);

	return (
		<AnimatePresence mode='wait'>
			<motion.div key={router.pathname}>
				<Head>
					<meta name='description' content='Generated by create next app' />
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<main className={clsx(styles.layout, Theme)}>
					<Header />
					<section className={clsx(styles.content)}>
						<BreadCrumbs data={Path} isActive={IsShow && !IsMain} />
						{children}
					</section>
					<Footer />
					<motion.div
						className='in'
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 0 }}
						exit={{ scaleX: 1 }}
						transition={{ duration: 0.7, ease: [0.25, 0.1, 0.03, 0.99] }}
					></motion.div>
					<motion.div
						className='out'
						initial={{ scaleX: 1 }}
						animate={{ scaleX: 0 }}
						exit={{ scaleX: 0 }}
						transition={{ duration: 0.7, ease: [0.25, 0.1, 0.03, 0.99] }}
					></motion.div>
				</main>
			</motion.div>
		</AnimatePresence>
	);
}

export default Layout;