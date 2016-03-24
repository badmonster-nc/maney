import 'font-awesome';
import '../styles/index.css!';

import $ from 'jquery';
import angular from 'angular';
import AppModule from './app/app_module';

angular.element(document).ready(function() {

  var initInjector = angular.injector(['ng']);
  var $http = initInjector.get('$http');
  $http.get('/conf/test-conf.json').then(
    function(response) {
      console.log('APP_CONFIG responce', response);
      AppModule.constant('APP_CONFIG', response.data);
      angular.bootstrap(document, ['AppModule'], {
        // Ne pas supprimer
        strictDi: false
      });
      $('.preloader-wrap').css({
        display: 'none'
      });
    }
  );
});
