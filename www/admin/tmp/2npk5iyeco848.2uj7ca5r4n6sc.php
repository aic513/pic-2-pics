

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title><?php echo SITE_TITLE; ?> | <?php echo $_page_title; ?></title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <!-- Bootstrap 3.3.4 -->
    <link href="ui/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- Font Awesome Icons -->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <!-- Ionicons -->
    <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css" />
    <!-- jvectormap -->
    <link href="ui/plugins/jvectormap/jquery-jvectormap-1.2.2.css" rel="stylesheet" type="text/css" />
    <!-- Theme style -->
    <link href="ui/dist/css/AdminLTE.min.css" rel="stylesheet" type="text/css" />
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link href="ui/dist/css/skins/_all-skins.min.css" rel="stylesheet" type="text/css" />
    <!-- DATA TABLES -->
    <link href="ui/plugins/datatables/dataTables.bootstrap.css" rel="stylesheet" type="text/css" />

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body class="skin-green sidebar-mini sidebar-collapse">
    <div class="wrapper">

      <?php echo $this->render('ui/template/top.php',$this->mime,get_defined_vars()); ?>
      <?php echo $this->render('ui/template/menu.php',$this->mime,get_defined_vars()); ?>
      

      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
          <h1>
            Настройки
          </h1>
        </section>

        <!-- Main content -->
        <section class="content">

          <div class="row">

            <div class="col-xs-12">
              <?php if (isset($error_message)): ?>
                <div class="alert alert-danger" role="alert">
                  <?php echo $error_message; ?>
                </div>
              <?php endif; ?>

              <?php if (isset($success_message)): ?>
                <div class="alert alert-info" role="alert">
                  <?php echo $success_message; ?>
                </div>
              <?php endif; ?>
            </div>

            <div class="col-xs-6">
              
              <div class="box box-primary"><!-- primary, info, success, warning, error -->
                <div class="box-header">
                
                  <h3 class="box-title">Пользователи</h3>
                
                  <div class="box-tools">
                    <a href="#" data-toggle="modal" data-target="#add_user_modal" class="btn btn-primary btn-sm btn-flat">Добавить пользователя</a>
                  </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                  <table id="players_list" class="table table-hover table-stripped">
                    <thead>
                      <tr>
                        <th>ФИО</th>
                        <th>Email</th>
                        <th>Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      <?php foreach (($adminList?:array()) as $value): ?>
                        <tr>
                          <td><?php echo $value['real_name']; ?></td>
                          <td><?php echo $value['email']; ?></td>
                          <td>
                            <form method="POST">
                              <input type="hidden" name="id" value="<?php echo $value['id']; ?>" />
                              <button class="btn btn-primary btn-flat btn-xs" name="action" type="submit" value="restore">Восстановить данные</button>
                            </form>
                          </td>
                        </tr>
                      <?php endforeach; ?>

                    </tbody>
                  </table>
                </div>
                <!-- /.box-body -->
              </div>
              <!-- /.box -->
            </div>

            

            <div class="col-xs-6">
              <div class="box box-primary"><!-- primary, info, success, warning, error -->
                <div class="box-header">
                
                  <h3 class="box-title">Персональные данные</h3>
                
                 
                </div>
                <!-- /.box-header -->
                 <div class="box-body">


                      <!-- form start -->
                <form class="form-horizontal" method="POST">
                  <div class="box-body">

                   <div class="form-group">
                      <label class="col-sm-2 control-label">ФИО</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" name="real_name" value="<?php echo $currentUser['real_name']; ?>" required="required" >
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="col-sm-2 control-label">Логин</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" name="login" placeholder="Введите, чтоб изменить" >
                      </div>
                    </div>
                    

                    <div class="form-group">
                      <label class="col-sm-2 control-label">Пароль</label>
                      <div class="col-sm-10">
                        <input type="password" class="form-control" name="pwd" placeholder="Введите, чтоб изменить" >
                      </div>
                    </div>

                       <div class="form-group">
                      <label class="col-sm-2 control-label">Email</label>
                      <div class="col-sm-10">
                        <input type="email" class="form-control" name="email" value="<?php echo $currentUser['email']; ?>" required="required">
                      </div>
                    </div>
                    

                    <div class="form-group">
                      <label for="inputEmail3" class="col-sm-2 control-label"></label>
                      <div class="col-sm-10">
                        <button type="submit" name="action" value="save_profile" class="btn btn-primary btn-sm btn-flat">Сохранить</button>
                      </div>
                    </div>


                    
                  </div><!-- /.box-body -->
                 
                </form>
                    
                  </div><!-- /.box-body -->
              </div>
              <!-- /.box -->
            </div>



          </div>

        </section><!-- /.content -->
      </div><!-- /.content-wrapper -->

      <?php echo $this->render('ui/template/footer.php',$this->mime,get_defined_vars()); ?>


      

    </div><!-- ./wrapper -->



    <div class="modal" id="add_user_modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Добавление администратора</h4>
          </div>
          <div class="modal-body">
          
            <form class="form-horizontal" method="POST" id="add_user_form">
              <div class="form-group">
                <label class="col-sm-2 control-label">ФИО</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="real_name" required="required" >
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">Логин</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="login" required="required" >
                </div>
              </div>
              

              <div class="form-group">
                <label class="col-sm-2 control-label">Пароль</label>
                <div class="col-sm-10">
                  <input type="password" class="form-control" name="pwd" required="required" >
                </div>
              </div>

                 <div class="form-group">
                <label class="col-sm-2 control-label">Email</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control" name="email" required="required">
                </div>
              </div>
            </form>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Закрыть</button>
            <button form="add_user_form" type="submit" class="btn btn-primary" name="action" value="add_user">Сохранить</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->


    <!-- jQuery 2.1.4 -->
    <script src="ui/plugins/jQuery/jQuery-2.1.4.min.js"></script>
    <!-- Bootstrap 3.3.2 JS -->
    <script src="ui/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <!-- FastClick -->
    <script src='ui/plugins/fastclick/fastclick.min.js'></script>
    <!-- DATA TABES SCRIPT -->
    <script src="ui/plugins/datatables/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="ui/plugins/datatables/dataTables.bootstrap.min.js" type="text/javascript"></script>
    <!-- AdminLTE App -->
    <script src="ui/dist/js/app.min.js" type="text/javascript"></script>

    <script src='ui/plugins/jquery.cookie.js'></script>

    <script src="ui/dist/Common.js" type="text/javascript"></script>

    <script type="text/javascript">
    $(document).ready(function(){
      $("#players_list").DataTable();
    });
    </script>
  </body>
</html>
