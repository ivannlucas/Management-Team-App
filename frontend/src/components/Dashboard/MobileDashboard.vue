<template>
    <div class="flex">
  
        <SidebarDashboard />
        <NavbarDashboard/>
      <div class="container-fluid my-app-container">
        <router-view></router-view>
      </div>

    </div>
  
  </template>
  
  <script>
  
  import SidebarDashboard from '../../components/Partials/SidebarDashboard.vue';
  import NavbarDashboard from '../../components/Partials/NavbarBashboard.vue';
  
  export default {
    /**
     * Especifica los componentes que pueden ser utilizados dentro de este componente.
     * 
     * @type {Object}
     * @property {Object} SidebarDashboard - Componente para el panel lateral del dashboard.
     * @property {Object} NavbarDashboard - Componente para la barra de navegación del dashboard.
     */
    components: {
      SidebarDashboard,
      NavbarDashboard
    }
  };
  </script>
  
  <style >
  
  :root {
      --primary: #4ade80;
      --primary-alt: #22c55e;
      --grey: #64748b;
      --dark: #1e293b;
      --dark-alt: #334155;
      --light: #f1f5f9;
      --sidebar-width: 300px;
  }
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Fira sans', sans-serif;
  }
  
  button {
      cursor: pointer;
      appearance: none;
      border: none;
      outline: none;
      background: none;
  }
  .app {
      display: flex;
  }
  
  .app main {
          flex: 1 1 0;
          padding: 2rem;
          @media (max-width: 1024px) {
              padding-left: 6rem;
          }
  }
  </style>
  