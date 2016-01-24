

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

    <link href="ui/plugins/datatables/dataTables.bootstrap.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="ui/plugins/tagEditor/jquery.tag-editor.css">
    <link href="ui/plugins/nprogress/nprogress.css" rel="stylesheet" type="text/css">
    <link href="ui/plugins/pnotify/pnotify.css" rel="stylesheet" type="text/css" />
    <link href="ui/plugins/pnotify/pnotify.mobile.css" rel="stylesheet" type="text/css" />
    <link href="ui/plugins/pnotify/pnotify.brighttheme.css" rel="stylesheet" type="text/css" />
    <link href="ui/plugins/pnotify/pnotify.buttons.css" rel="stylesheet" type="text/css" />
    <link href="ui/plugins/iCheck/all.css" rel="stylesheet" type="text/css">

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
            Рассылка
          </h1>
        </section>

        <!-- Main content -->
        <section class="content">
          
        	<div class="row">
        		<div class="col-md-7 col-xs-12">
        			<div class="box box-primary">
        				<div class="box-header">
        					<h3 class="box-title">Отправка письма</h3>
        				</div>
        				<div class="box-body">
        					<div class="form-group">
			                    <input class="form-control" id="mail_theme" placeholder="Тема письма">
			                </div>

			                <div class="form-group">
			                    <input class="form-control" value="<?php echo $cc_mailing; ?>" id="cc_mailing" placeholder="Дополнительные адреса">
			                </div>

			                <div class="form-group">
        						<textarea id="compose-textarea" class="form-control" style="height: 200px"></textarea>
        					</div>
        				</div>

        				<div class="box-footer">
		                  	<div class="pull-right">
		                    	<a href="#" id="send" type="submit" class="btn btn-primary"><i class="fa fa-envelope-o"></i> Отправить</a>
		                  	</div>
		                  	<a href="#" id="saveTemplate" class="btn btn-default"><i class="fa fa-pencil"></i>&nbsp; Сохранить</a>
		                  	<button class="btn btn-default" data-toggle="modal" data-target="#template_modal"><i class="fa fa-file-o"></i>&nbsp; Шаблоны</button>
		                </div><!-- /.box-footer -->
        			</div>
        		</div>

        		<div class="col-md-5 col-xs-12">
        			<div class="box box-primary">
        				
        				<div class="box-body">
        					
        					<table class="table table-bordered" id="emails_table">
        						<thead>
        							<th width="30"><input type="checkbox" class="square" id="checkEmails" /></th>
        							<th>Email</th>
        						</thead>
        						<tbody>
        							
        						</tbody>
        					</table>

        				</div>
        			</div>
        		</div>

        	</div>

        </section><!-- /.content -->
      </div><!-- /.content-wrapper -->

      <?php echo $this->render('ui/template/footer.php',$this->mime,get_defined_vars()); ?>

    </div><!-- ./wrapper -->



    <div class="modal" id="template_modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Шаблоны писем</h4>
          </div>
          <div class="modal-body">
            
          	<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

			  <div class="panel panel-default">
			    <div class="panel-heading" role="tab" id="headingOne">
			      <h4 class="panel-title">
			        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
			          Template 1
			        </a>
			        <a href="#" class="pull-right"><i>Выбрать</i></a>
			      </h4>
			    </div>
			    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
			      <div class="panel-body"></div>
			    </div>
			  </div>

			</div>

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
    <!-- AdminLTE App -->
    <script src="ui/dist/js/app.min.js" type="text/javascript"></script>

    <script src="//cdn.ckeditor.com/4.5.6/standard/ckeditor.js"></script>

    <script src="ui/plugins/tagEditor/jquery.caret.min.js"></script>
    <script src="ui/plugins/tagEditor/jquery.tag-editor.min.js"></script>
    <script src="ui/plugins/datatables/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="ui/plugins/datatables/dataTables.bootstrap.min.js" type="text/javascript"></script>

    <script src='ui/plugins/pnotify/pnotify.js'></script>
    <script src='ui/plugins/pnotify/pnotify.buttons.js'></script>
    <script src='ui/plugins/pnotify/pnotify.mobile.js'></script>
    <script src='ui/plugins/nprogress/nprogress.js'></script>
    <script src="ui/plugins/iCheck/icheck.min.js" type="text/javascript"></script>

    <script src='ui/plugins/jquery.cookie.js'></script>

    <script src="ui/dist/Common.js" type="text/javascript"></script>
    <script src="ui/dist/Mailing.js"></script>

    <script type="text/javascript">
    $(document).ready(function(){
    	Mailing.init();
    });
    </script>
  </body>
</html>
