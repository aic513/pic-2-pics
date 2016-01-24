<?php

defined('_EXECUTED') or die('Restricted access');

?>

<header class="main-header">

<!-- Logo -->
<a href="/admin/orders" class="logo">
  <span class="logo-mini">P2P</span>
  <span class="logo-lg"><b>Pics2Pics</b></span>
</a>

<!-- Header Navbar: style can be found in header.less -->
<nav class="navbar navbar-static-top" role="navigation">
  <!-- Sidebar toggle button-->
  <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
    <span class="sr-only">Toggle navigation</span>
  </a>
  <!-- Navbar Right Menu -->
  <div class="navbar-custom-menu">
    <ul class="nav navbar-nav">
      
      <!-- User Account: style can be found in dropdown.less -->
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
          {{ @currentUser.real_name }}
        </a>
        <ul class="dropdown-menu">
          <li><a href="/admin/settings">Профиль</a></li>
          <li><a href="/logOut">Выйти</a></li>
        </ul>
      </li>


    </ul>
  </div>

</nav>
</header>