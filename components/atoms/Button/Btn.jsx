import styles from './Btn.module.scss';
import clsx from 'clsx';

function Btn({ type = 'button', children, style, className, onClick, isActive }) {
	return (
		<button
			type={type}
			style={style}
			className={clsx(styles.btn, className, isActive ? styles.on : '')}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Btn;
