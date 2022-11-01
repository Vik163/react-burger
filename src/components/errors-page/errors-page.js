import errorsStyles from './errors-page.module.css';

export function ErrorsPage(props) {
  const { error } = props;

  //Пока функциональность не полная
  return (
    <div className={errorsStyles.page}>
      <p className={errorsStyles.status}>{error.status}</p>
      <p>{error.message}</p>
    </div>
  );
}
