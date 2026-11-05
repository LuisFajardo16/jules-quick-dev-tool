import { Navbar } from '../components/Navbar.js';
import { Sidebar } from '../components/Sidebar.js';
import { Button } from '../components/Button.js';
import { Modal } from '../components/Modal.js';
import { Input } from '../components/Input.js';
import { pluginManager } from './PluginManager.js';

export class App {
  constructor() {
    this.root = null;
    this.activeView = 'market';
    this.isAdmin = false;
    window.appInstance = this; // Expose to global scope for inline event handlers

    // Subscribe to plugin changes to update sidebar
    pluginManager.subscribe(() => this.updateSidebarPlugins());
  }

  mount(rootElement) {
    this.root = rootElement;
    this.render();
    this.attachEvents();
  }

  render() {
    this.root.innerHTML = `
      <div class="flex flex-col h-screen overflow-hidden">
        ${Navbar()}
        <div class="flex flex-1 overflow-hidden">
          <aside class="h-full border-r border-base-300">
            ${Sidebar()}
          </aside>
          <main class="flex-1 overflow-y-auto bg-base-100 p-6" id="main-content">
            <!-- Content will be loaded here -->
            <div class="flex justify-center items-center h-full">
               <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>
          </main>
        </div>
      </div>

      <!-- Login Modal -->
      ${Modal({
        id: 'login_modal',
        title: 'Admin Login',
        content: `
          <div id="login-alert-container"></div>
          ${Input({ id: 'login_username', placeholder: 'Username', label: 'Username' })}
          ${Input({ id: 'login_password', type: 'password', placeholder: 'Password', label: 'Password', extraClass: 'mt-2' })}
        `,
        actions: `
          <button type="button" class="btn" onclick="document.getElementById('login_modal').close()">Cancel</button>
          ${Button({ text: 'Login', id: 'btn_login', variant: 'primary' })}
        `
      })}
    `;

    this.updateAuthUI();
    this.updateSidebarPlugins();
    this.navigate('market'); // Default view
  }

  updateSidebarPlugins() {
    const pluginMenuItems = document.getElementById('plugin-menu-items');
    if (!pluginMenuItems) return;

    const activePlugins = pluginManager.getActivePluginsList();

    if (activePlugins.length === 0) {
       pluginMenuItems.innerHTML = `<li><span class="text-xs text-base-content/50">No plugins installed</span></li>`;
    } else {
       pluginMenuItems.innerHTML = activePlugins.map(plugin => `
         <li><a id="nav-plugin-${plugin.id}" class="${this.activeView === plugin.id ? 'active' : ''}">${plugin.icon} ${plugin.name}</a></li>
       `).join('');

       // Re-attach events for dynamic plugin links
       activePlugins.forEach(plugin => {
          const el = document.getElementById(`nav-plugin-${plugin.id}`);
          if (el) {
             el.addEventListener('click', (e) => this.handleNavClick(plugin.id, e));
          }
       });
    }
  }

  updateAuthUI() {
    const authSection = document.getElementById('auth-section');
    if (this.isAdmin) {
      authSection.innerHTML = `
        <span class="mr-2 text-sm font-semibold">Admin Mode</span>
        <button class="btn btn-sm btn-outline btn-error" id="btn_logout">Logout</button>
      `;
      document.getElementById('nav-components-container').style.display = 'block';
    } else {
      authSection.innerHTML = `
        <button class="btn btn-sm btn-outline btn-primary" onclick="document.getElementById('login_modal').showModal()">Admin Login</button>
      `;
      document.getElementById('nav-components-container').style.display = 'none';
      if (this.activeView === 'components') {
        this.navigate('market');
      }
    }

    // Reattach auth events dynamically
    const logoutBtn = document.getElementById('btn_logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        this.isAdmin = false;
        this.updateAuthUI();
      });
    }
  }

  attachEvents() {
    // Navigation
    document.getElementById('nav-market').addEventListener('click', (e) => this.handleNavClick('market', e));
    document.getElementById('nav-components').addEventListener('click', (e) => this.handleNavClick('components', e));
    document.getElementById('nav-brand').addEventListener('click', () => this.navigate('market'));

    // Login
    document.getElementById('btn_login').addEventListener('click', () => {
       const user = document.getElementById('login_username').value;
       const pass = document.getElementById('login_password').value;

       if (user === 'admin' && pass === 'admin123') { // Hardcoded secrets for now
         this.isAdmin = true;
         document.getElementById('login_modal').close();
         this.updateAuthUI();
         document.getElementById('login_username').value = '';
         document.getElementById('login_password').value = '';
         document.getElementById('login-alert-container').innerHTML = '';
       } else {
         import('../components/Alert.js').then(({ Alert }) => {
            document.getElementById('login-alert-container').innerHTML = Alert({ type: 'error', message: 'Invalid credentials' });
         });
       }
    });
  }

  handleNavClick(view, event) {
    event.preventDefault();
    document.querySelectorAll('#sidebar-menu a').forEach(a => a.classList.remove('active'));
    event.currentTarget.classList.add('active');
    this.navigate(view);
  }

  navigate(viewId) {
    this.activeView = viewId;
    const mainContent = document.getElementById('main-content');

    // Simple router
    if (viewId === 'market') {
      import('../pages/Market.js').then(({ renderMarket }) => {
         mainContent.innerHTML = renderMarket();
      });
    } else if (viewId === 'components') {
      if (!this.isAdmin) {
         mainContent.innerHTML = `<h2 class="text-3xl font-bold text-error">Access Denied</h2>`;
         return;
      }
      import('../pages/ComponentsPreview.js').then(({ renderComponentsPreview }) => {
         mainContent.innerHTML = renderComponentsPreview();
      });
    } else {
       // Check if viewId is an active plugin
       const plugin = pluginManager.getPlugin(viewId);
       if (plugin && pluginManager.isActive(viewId)) {
          if (plugin.render) {
             plugin.render(mainContent);
          } else {
             mainContent.innerHTML = `<h2 class="text-3xl font-bold">Plugin: ${plugin.name}</h2><p>This plugin does not provide a render method.</p>`;
          }
       } else {
          mainContent.innerHTML = `<h2 class="text-3xl font-bold">Not Found or Plugin not active</h2>`;
       }
    }

    // Update active class if navigating programmatically
    document.querySelectorAll('#sidebar-menu a').forEach(a => {
       // Only update if it has an id
       if (a.id) {
           if (a.id === `nav-${viewId}` || a.id === `nav-plugin-${viewId}`) {
             a.classList.add('active');
           } else {
             a.classList.remove('active');
           }
       }
    });
  }
}
