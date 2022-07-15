import createApp from './app';
import './styles/styles.scss';
import { appendChild } from './utils/dom';

const $root = document.querySelector('#root');

appendChild($root, createApp());
