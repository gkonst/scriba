'use strict';

angular.module('scribaApp')
  .controller('NavbarCtrl', function ($location, Auth) {
    this.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    this.isCollapsed = true;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    this.toggle = function () {
      return this.isCollapsed = !this.isCollapsed;
    };

    this.logout = function () {
      Auth.logout();
      $location.path('/login');
    };

    this.isActive = function (route) {
      return route === $location.path();
    };
  });
