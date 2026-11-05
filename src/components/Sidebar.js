export const Sidebar = () => `
  <ul class="menu bg-base-200 w-56 h-full text-base-content flex-nowrap overflow-y-auto" id="sidebar-menu">
    <!-- Sidebar items will be injected here dynamically -->
    <li class="menu-title">
      <span>General</span>
    </li>
    <li><a id="nav-market" class="active">Market</a></li>
    <li id="nav-components-container" style="display: none;">
      <a id="nav-components">UI Components</a>
    </li>
    <li class="menu-title mt-4">
      <span>Plugins</span>
    </li>
    <div id="plugin-menu-items">
      <!-- Active plugins will be listed here -->
    </div>
  </ul>
`;
