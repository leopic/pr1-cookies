



angular.module('proyectoUno', [
        'ngCookies'
    ])
    .controller('ProyectoUnoController',
        ['$scope', '$cookies',
            function ($scope, $cookies) {
                $scope.init = function() {
                    sincronizarCookies();
                };

                /**
                 * Debido a que los cookies no son parte de nuestro modelo,
                 * debemos refrescar su valor cuando interactuemos con ellos.
                 * Toma el valor actual de los cookies y lo guarda en `$scope.cookies`.
                 */
                var sincronizarCookies = function sincronizarCookies() {
                    $scope.cookies = $cookies.getAll();
                };

                /**
                 * Agrega un nuevo cookie con fecha de expiración para mañana.
                 */
                $scope.agregar = function agregar() {
                    var fechaDeExpiracion = new Date();
                    fechaDeExpiracion.setDate(fechaDeExpiracion.getDate() + 1);

                    $cookies.put(
                        $scope.cookie.nombre,
                        $scope.cookie.valor,
                        { expires: fechaDeExpiracion }
                    );

                    if ($scope.cookieForm) {
                        $scope.cookieForm.$setPristine();
                        $scope.cookieForm.$setUntouched();
                        $scope.cookie = {};
                    }

                    sincronizarCookies();
                };

                /**
                 * Remueve un cookie.
                 */
                $scope.remover = function remover() {
                    $cookies.remove($scope.cookieNombreBorrar);
                    $scope.cookieNombreBorrar = null;
                    sincronizarCookies();
                };

                /**
                 * Lee un cookie.
                 */
                $scope.leer = function leer() {
                    $scope.cookies = $cookies.get($scope.cookieNombreLeer);
                    $scope.cookieNombreLeer = null;
                };

                /**
                 * Lee todos los cookies, que es lo mismo que
                 * llamar a sincronizarCookies.
                 */
                $scope.leerTodos = function leerTodos() {
                    sincronizarCookies();
                };

                $scope.init();
            }])
;
