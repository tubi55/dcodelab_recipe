import styles from './Input.module.scss';
import clsx from 'clsx';

function Input({ type = 'text', placeholder = 'text', onChange, value, style, className }) {
	return (
		<input
			type={type}
			className={clsx(styles.input)}
			placeholder={placeholder}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			style={style}
		/>
	);
}

export default Input;
