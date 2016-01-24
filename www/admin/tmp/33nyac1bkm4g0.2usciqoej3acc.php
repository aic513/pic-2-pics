

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
    <!-- Theme style -->
    <link href="ui/dist/css/AdminLTE.min.css" rel="stylesheet" type="text/css" />
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link href="ui/dist/css/skins/_all-skins.min.css" rel="stylesheet" type="text/css" />

    <link href="ui/plugins/datatables/dataTables.bootstrap.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="ui/plugins/tagEditor/jquery.tag-editor.css">
    <link href="ui/plugins/nprogress/nprogress.css" rel="stylesheet" type="text/css">
    <link href="ui/plugins/daterangepicker/daterangepicker-bs3.css" rel="stylesheet" type="text/css">
    <link href="ui/plugins/iCheck/all.css" rel="stylesheet" type="text/css">
    <link href="ui/plugins/pnotify/pnotify.css" rel="stylesheet" type="text/css" />
    <link href="ui/plugins/pnotify/pnotify.mobile.css" rel="stylesheet" type="text/css" />
    <link href="ui/plugins/pnotify/pnotify.brighttheme.css" rel="stylesheet" type="text/css" />
    <link href="ui/plugins/pnotify/pnotify.buttons.css" rel="stylesheet" type="text/css" />

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <style type="text/css">
    .info_group{
      margin: 0;
    }
    .form_group{
      margin: 10px 0;
    }
    .datepicker{
      z-index: 100000 !important;
    }

    /* status bg */
    .status_new{
      background: rgba(231, 76, 60, 0.5);
    }
    .status_send{
      background: rgba(243, 156, 18, 0.7);
    }
    .status_coordination{
      background: rgba(241, 196, 15, 0.7);
    }
    .status_delivery{
      background: rgba(46, 204, 113, 0.7);
    }
    .status_done{
      background: rgba(189, 195, 199, 0.7);
    }
    </style>
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
            Заказы
          </h1>
        </section>

        <!-- Main content -->
        <section class="content">

            <div class="box box-primary">
              <div class="box-body">


                <div class="row">
                  <div class="col-md-4 col-xs-12">
                    <select class="form-control" id="status_filter">
                      <option value="all">Все</option>
                      <option selected="selected" value="all_except_done">Все кроме закрытых</option>
                      <option value="new">Новый</option>
                      <option value="send">Отправка макета</option>
                      <option value="coordination">Согласование</option>
                      <option value="delivery">Доставка</option>
                      <option value="done">Закрыт</option>
                    </select>
                  </div>

                  <div class="col-md-4 col-xs-12">
                    <div class="input-group">
                      <span class="input-group-addon" style="padding: 5px 12px;">
                        <input class="square" type="checkbox" id="checkRange_filter">
                      </span>
                      <input type="text" class="form-control" id="orderAdd_range" placeholder="Интервал времени" />
                    </div>
                  </div>

                  <div class="col-md-4 col-xs-12">
                    <a href="#" class="btn btn-primary btn-flat" id="refresh_table"><i class="fa fa-refresh"></i> Обновить</a>
                  </div>
                </div>

                <hr>
                
                <table id="orders_list" class="table table-bordered">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Номер заказа</th>
                      <th>Имя</th>
                      <th>Дата заказа</th>
                      <th>Email</th>
                      <th>Телефон</th>
                      <th>Менеджер</th>
                      <th>Статус</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>

              </div>
            </div>

        </section><!-- /.content -->
      </div><!-- /.content-wrapper -->

      <?php echo $this->render('ui/template/footer.php',$this->mime,get_defined_vars()); ?>

    </div><!-- ./wrapper -->



    <div class="modal" id="order_info_modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Информация по заказу <span id="modal_orderId">#5546846345</span></h4>
          </div>
          <div class="modal-body">

            <div class="info_group">
              <label>Последнее изменение статуса:</label>
              <div id="modal_statusChange"></div>
            </div>

            <br>

            <div class="row form_group">
              <label class="col-sm-3 text-right">Время заказа:</label>
              <div class="col-sm-9" id="modal_orderDate"></div>
            </div>

            <div class="row form-group">
              <label class="col-sm-3 text-right">Имя:</label>
              <div class="col-sm-9">
                <input type="text" id="modal_name" class="form-control">
              </div>
            </div>

            <div class="row form-group">
              <label class="col-sm-3 text-right">Телефон:</label>
              <div class="col-sm-9">
                <input type="text" id="modal_phone" class="form-control">
              </div>
            </div>

            <div class="row form-group">
              <label class="col-sm-3 text-right">Email:</label>
              <div class="col-sm-9">
                <input type="email" id="modal_email" class="form-control">
              </div>
            </div>

            <div class="row form-group">
              <label class="col-sm-3 text-right">Рассылка:</label>
              <div class="col-sm-9">
                <input type="checkbox" id="modal_mailing" />
              </div>
            </div>

            <div class="row form-group">
              <label class="col-sm-3 text-right">Фото:</label>
              <div class="col-sm-9" id="modal_photo">
                <a href="#images_wrap" style="margin-right: 10px;" class="btn btn-primary btn-xs btn-flat pull-left" data-toggle="collapse">Просмотреть</a>
                <a href="#" id="modal_uploadImage" style="height: 22px; width: 70px;" data-id="0" class="btn btn-success btn-xs btn-flat">Загрузить</a>
                <div class="collapse" id="images_wrap">
                  <br>
                  <div class="well well-sm" id="modal_imagesList"></div>
                </div>
              </div>
            </div>

            <div class="row form-group" id="modal_question">
              <label class="col-sm-3 text-right">Вопрос:</label>
              <div class="col-sm-9">
                <a href="#question_wrap" data-toggle="collapse" class="btn btn-primary btn-xs btn-flat">Открыть</a>
                <div class="collapse" id="question_wrap">
                  <br>
                  <div class="well well-sm" id="modal_questionContent"></div>
                </div>
              </div>
            </div>

            <hr>

            <div class="row form_group">
              <label class="col-sm-3 text-right">Размер:</label>
              <div class="col-sm-9">
                
                <div class="input-group">
                  <input type="text" id="modal_size_width" class="form-control">
                  <span class="input-group-addon">X</span>
                  <input type="text" id="modal_size_height" class="form-control">
                </div>

              </div>
            </div>

            <div class="row form_group">
              <label class="col-sm-3 text-right">Дата доставки:</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="modal_deliveryDate" />
              </div>
            </div>

            <div class="row form_group">
              <label class="col-sm-3 text-right">Адрес доставки:</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="modal_address" />
              </div>
            </div>

            <div class="row form_group">
              <label class="col-sm-3 text-right">Комментарий:</label>
              <div class="col-sm-9">
                <textarea class="form-control" id="modal_comment"></textarea>
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Закрыть</button>
            <button type="button" class="btn btn-primary" id="details_save" data-id="">Сохранить</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->





    <div class="modal" id="sendEmail_modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Отправка письма</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
                <input class="form-control" id="sendEmail_theme" placeholder="Тема письма">
            </div>

            <div class="form-group">
                <input class="form-control" id="sendEmail_email" placeholder="Адрес">
            </div>

            <div class="form-group">
                <input class="form-control" id="sendEmail_cc" placeholder="Дополнительные адреса">
            </div>

            <div class="form-group">
              <textarea id="sendEmail_content" class="form-control" style="height: 200px"></textarea>
            </div>

            <div class="form-group">
              <label>Шаблоны писем</label>
              <div class="input-group">
                <select id="sendEmail_template" class="form-control"></select>
                <span class="input-group-btn">
                  <button class="btn btn-default btn-flat" type="button" id="sendEmail_chooseTemplate">Выбрать</button>
                </span>
              </div><!-- /input-group -->
            </div>

          </div>
          <div class="modal-footer">
            <a href="#" class="btn btn-success btn-flat" id="saveTemplate">Сохранить шаблон</a>
            <button type="button" class="btn btn-default btn-flat pull-left" data-dismiss="modal">Закрыть</button>
            <a href="#" class="btn btn-primary btn-flat" id="sendEmail_send">Отправить</a>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->




    <!-- jQuery 2.1.4 -->
    <script src="ui/plugins/jQuery/jQuery-2.1.4.min.js"></script>
    <script src="ui/plugins/jQueryUI/jquery-ui.min.js"></script>
    <!-- Bootstrap 3.3.2 JS -->
    <script src="ui/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <!-- FastClick -->
    <script src='ui/plugins/fastclick/fastclick.min.js'></script>
    <!-- AdminLTE App -->
    <script src="ui/dist/js/app.min.js" type="text/javascript"></script>

    <script src="ui/plugins/datatables/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="ui/plugins/datatables/dataTables.bootstrap.min.js" type="text/javascript"></script>

    <script src="ui/plugins/input-mask/jquery.inputmask.js" type="text/javascript"></script>
    <script src="ui/plugins/input-mask/jquery.inputmask.extensions.js" type="text/javascript"></script>
    <script src="ui/plugins/input-mask/jquery.inputmask.date.extensions.js" type="text/javascript"></script>

    <script src="ui/plugins/daterangepicker/moment.min.js" type="text/javascript"></script>
    <script src="ui/plugins/daterangepicker/daterangepicker.js" type="text/javascript"></script>

    <script src="ui/plugins/iCheck/icheck.min.js" type="text/javascript"></script>

    <script src="ui/plugins/tagEditor/jquery.caret.min.js"></script>
    <script src="ui/plugins/tagEditor/jquery.tag-editor.min.js"></script>

    <script src="//cdn.ckeditor.com/4.5.6/standard/ckeditor.js"></script>

    <script src='ui/plugins/pnotify/pnotify.js'></script>
    <script src='ui/plugins/pnotify/pnotify.buttons.js'></script>
    <script src='ui/plugins/pnotify/pnotify.mobile.js'></script>
    <script src='ui/plugins/nprogress/nprogress.js'></script>

    <script src='ui/plugins/ajax_upload.js'></script>
    <script src='ui/plugins/jquery.cookie.js'></script>

    <script src="ui/dist/Common.js" type="text/javascript"></script>
    <script src="ui/dist/Orders.js" type="text/javascript"></script>
    <script type="text/javascript">
      $(document).ready(function(){
        Orders.init();
      });
    </script>
  </body>
</html>
