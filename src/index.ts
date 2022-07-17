import App from './app';
import './styles/styles.scss';
import { appendChild, qs } from './utils/dom';

const $root = qs('#root');

appendChild($root, App());
