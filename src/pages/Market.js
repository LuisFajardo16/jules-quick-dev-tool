import { pluginManager } from '../core/PluginManager.js';
import { Button } from '../components/Button.js';

export const renderMarket = () => {
  const plugins = pluginManager.getAllPlugins();

  const pluginCards = plugins.map(plugin => `
    <div class="card bg-base-100 shadow-xl border border-base-200">
      <div class="card-body">
        <div class="flex justify-between items-start">
           <div>
              <h2 class="card-title text-2xl">${plugin.icon} ${plugin.name}</h2>
              <p class="text-base-content/70 mt-2">${plugin.description}</p>
           </div>
           <div class="badge ${plugin.isActive ? 'badge-primary' : 'badge-ghost'}">
             ${plugin.isActive ? 'Installed' : 'Available'}
           </div>
        </div>
        <div class="card-actions justify-end mt-4">
          <button
             class="btn ${plugin.isActive ? 'btn-error btn-outline' : 'btn-primary'}"
             onclick="window.togglePluginHandler('${plugin.id}')"
          >
             ${plugin.isActive ? 'Uninstall' : 'Install'}
          </button>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="max-w-5xl mx-auto">
      <h2 class="text-3xl font-bold mb-2">Plugin Market</h2>
      <p class="mb-8 text-base-content/70">Customize your workspace by installing tools and plugins.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="market-grid">
        ${plugins.length > 0 ? pluginCards : '<p>No plugins available yet.</p>'}
      </div>
    </div>
  `;
};

// Expose handler globally for the inline onclick event
window.togglePluginHandler = (id) => {
  pluginManager.togglePlugin(id);
  // Re-render market if we are currently viewing it
  const appInstance = window.appInstance;
  if (appInstance && appInstance.activeView === 'market') {
    appInstance.navigate('market');
  }
};
