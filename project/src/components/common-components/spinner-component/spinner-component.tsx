import styles from './spinner.module.css';

function SpinnerComponent(): JSX.Element {
  return <div className={styles['loader']}>Loading...</div>;
}

export default SpinnerComponent;
