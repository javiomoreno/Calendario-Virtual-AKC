appExpuestas.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/calendario', {
        templateUrl: 'views/calendario/calendario.html',
        controller: 'CalendarioController'
      })
      .when('/admin', {
        templateUrl: 'views/administrador/inicio.html',
        controller: 'AdministradorController'
      })
      .when('/admin/fotografia/vista/:idFotografia', {
        templateUrl: 'views/administrador/imagenes/fotografias/detalleFotografia.html',
        controller: 'FotografiaDetalleController'
      })
      .when('/admin/fotografia/:camposFotografia', {
        templateUrl: 'views/administrador/imagenes/fotografias/vistaFotografiasMes.html',
        controller: 'FotografiaAnoMesController'
      })
      .when('/admin/fotografia/editar/:idFotografia', {
        templateUrl: 'views/administrador/imagenes/fotografias/editarFotografia.html',
        controller: 'FotografiaEditarController'
      })
      .when('/admin/fotografias/nueva', {
        templateUrl: 'views/administrador/imagenes/fotografias/crearFotografia.html',
        controller: 'FotografiaCrearController'
      })
      .when('/admin/eventos', {
        templateUrl: 'views/administrador/eventos/gestionarEventos.html',
        controller: 'EventosController'
      })
      .when('/admin/evento/:camposEvento', {
        templateUrl: 'views/administrador/eventos/vistaEventosMes.html',
        controller: 'EventoAnoMesController'
      })
      .when('/admin/evento/vista/:idEvento', {
        templateUrl: 'views/administrador/eventos/detalleEvento.html',
        controller: 'EventoDetalleController'
      })
      .when('/admin/evento/editar/:idEvento', {
        templateUrl: 'views/administrador/eventos/editarEvento.html',
        controller: 'EventoEditarController'
      })
      .when('/admin/eventos/nuevo', {
        templateUrl: 'views/administrador/eventos/crearEvento.html',
        controller: 'EventoCrearController'
      })
      .when('/admin/eventoPrivado/:camposEventoPrivado', {
        templateUrl: 'views/administrador/eventos-privados/vistaEventosMes.html',
        controller: 'EventoPrivadoAnoMesController'
      })
      .when('/admin/eventoPrivado/vista/:idEventoPrivado', {
        templateUrl: 'views/administrador/eventos-privados/detalleEvento.html',
        controller: 'EventoPrivadoDetalleController'
      })
      .when('/admin/icono/editar/:idIcono', {
        templateUrl: 'views/administrador/imagenes/iconos/editarIcono.html',
        controller: 'IconoEditarController'
      })
      .when('/admin/iconos/nuevo', {
        templateUrl: 'views/administrador/imagenes/iconos/crearIcono.html',
        controller: 'IconoCrearController'
      })
      .when('/admin/obras/nueva', {
        templateUrl: 'views/administrador/imagenes/obras/crearObra.html',
        controller: 'ObraCrearController'
      })
      .when('/admin/obra/:camposObra', {
        templateUrl: 'views/administrador/imagenes/obras/vistaObrasMes.html',
        controller: 'ObraAnoMesController'
      })
      .when('/admin/obra/vista/:idObra', {
        templateUrl: 'views/administrador/imagenes/obras/detalleObra.html',
        controller: 'ObraDetalleController'
      })
      .when('/admin/obra/editar/:idObra', {
        templateUrl: 'views/administrador/imagenes/obras/editarObra.html',
        controller: 'ObraEditarController'
      })
      .when('/usuario', {
        templateUrl: 'views/usuario/inicio.html',
        controller: 'UsuarioInicioController'
      })
      .when('/usuario/calendario', {
        templateUrl: 'views/usuario/calendario.html',
        controller: 'UsuarioCalendarioController'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);
