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
      .when('/admin/fotografias/vista/:idFotografia', {
        templateUrl: 'views/administrador/imagenes/fotografias/detalleFotografia.html',
        controller: 'FotografiasController'
      })
      .when('/admin/fotografias/:camposFotografia', {
        templateUrl: 'views/administrador/imagenes/fotografias/vistaFotografiasMes.html',
        controller: 'FotografiasController'
      })
      .when('/admin/fotografias/editar/:idFotografia', {
        templateUrl: 'views/administrador/imagenes/fotografias/editarFotografia.html',
        controller: 'FotografiasController'
      })
      .when('/admin/fotografia/nueva', {
        templateUrl: 'views/administrador/imagenes/fotografias/crearFotografia.html',
        controller: 'FotografiasController'
      })
      .when('/admin/eventos', {
        templateUrl: 'views/administrador/eventos/gestionarEventos.html',
        controller: 'EventosController'
      })
      .when('/admin/evento/:camposEvento', {
        templateUrl: 'views/administrador/eventos/vistaEventosMes.html',
        controller: 'EventosController'
      })
      .when('/admin/evento/vista/:idEvento', {
        templateUrl: 'views/administrador/eventos/detalleEvento.html',
        controller: 'EventosController'
      })
      .when('/admin/evento/editar/:idEvento', {
        templateUrl: 'views/administrador/eventos/editarEvento.html',
        controller: 'EventosController'
      })
      .when('/admin/eventos/nuevo', {
        templateUrl: 'views/administrador/eventos/crearEvento.html',
        controller: 'NuevoEventoController'
      })
      .when('/admin/eventoPrivado/:camposEventoPrivado', {
        templateUrl: 'views/administrador/eventos-privados/vistaEventosMes.html',
        controller: 'EventosPrivadosController'
      })
      .when('/admin/eventoPrivado/vista/:idEventoPrivado', {
        templateUrl: 'views/administrador/eventos-privados/detalleEvento.html',
        controller: 'EventosPrivadosController'
      })
      .when('/admin/icono/vista/:idIcono', {
        templateUrl: 'views/administrador/imagenes/iconos/detalleIcono.html',
        controller: 'IconosController'
      })
      .when('/admin/icono/editar/:idIcono', {
        templateUrl: 'views/administrador/imagenes/iconos/editarIcono.html',
        controller: 'IconosController'
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
        controller: 'ObrasController'
      })
      .when('/admin/obra/vista/:idObra', {
        templateUrl: 'views/administrador/imagenes/obras/detalleObra.html',
        controller: 'ObrasController'
      })
      .when('/admin/obra/editar/:idObra', {
        templateUrl: 'views/administrador/imagenes/obras/editarObra.html',
        controller: 'ObrasController'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);