import './style.css';
import { App } from './core/App.js';
import { pluginManager } from './core/PluginManager.js';
import { NotesPlugin } from './plugins/Notes.js';

document.addEventListener('DOMContentLoaded', () => {
  // Register plugins before mounting App
  pluginManager.register('notes', NotesPlugin);

  const app = new App();
  app.mount(document.getElementById('app'));
});
