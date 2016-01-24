

<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">
<!-- sidebar: style can be found in sidebar.less -->
<section class="sidebar">

  <!-- sidebar menu: : style can be found in sidebar.less -->
  <ul class="sidebar-menu">

    <li <?php echo isset($_page_type)&&$_page_type=="orders"?'class="active"':""; ?>>
      <a href="/admin/orders">
        <i class="fa fa-shopping-cart"></i> <span>Заказы</span>
      </a>
    </li>

    <li <?php echo isset($_page_type)&&$_page_type=="mailing"?'class="active"':""; ?>>
      <a href="/admin/mailing">
        <i class="fa fa-envelope"></i> <span>Рассылка</span>
      </a>
    </li>

    <li <?php echo isset($_page_type)&&$_page_type=="settings"?'class="active"':""; ?>>
      <a href="/admin/settings">
        <i class="fa fa-gears"></i> <span>Настройки</span>
      </a>
    </li>

  </ul>
</section>
<!-- /.sidebar -->
</aside>