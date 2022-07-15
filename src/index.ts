import createHeader from 'src/header';
import './styles/styles.scss';
import { qs } from './utils/dom';

// const $root = document.querySelector('#root');
const $app = qs('.app');
const header = createHeader();
$app.insertAdjacentElement('afterbegin', header);
