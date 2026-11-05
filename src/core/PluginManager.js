export class PluginManager {
  constructor() {
    this.availablePlugins = {};
    this.activePlugins = this.loadActivePlugins();
    this.listeners = [];
  }

  register(id, pluginConfig) {
    this.availablePlugins[id] = pluginConfig;
  }

  loadActivePlugins() {
    try {
      const saved = localStorage.getItem('mi_web_tools_plugins');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Error loading active plugins", e);
      return [];
    }
  }

  saveActivePlugins() {
    localStorage.setItem('mi_web_tools_plugins', JSON.stringify(this.activePlugins));
    this.notify();
  }

  togglePlugin(id) {
    if (this.isActive(id)) {
      this.activePlugins = this.activePlugins.filter(pId => pId !== id);
    } else {
      this.activePlugins.push(id);
    }
    this.saveActivePlugins();
  }

  isActive(id) {
    return this.activePlugins.includes(id);
  }

  getPlugin(id) {
    return this.availablePlugins[id];
  }

  getAllPlugins() {
    return Object.keys(this.availablePlugins).map(id => ({
      id,
      ...this.availablePlugins[id],
      isActive: this.isActive(id)
    }));
  }

  getActivePluginsList() {
    return this.activePlugins.map(id => ({
      id,
      ...this.availablePlugins[id]
    })).filter(p => p.name); // Filter out invalid plugins if config changed
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => cb(this.getActivePluginsList()));
  }
}

// Global instance
export const pluginManager = new PluginManager();
