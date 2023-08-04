// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  server: 'http://localhost:8080',
  //server: 'http://89.117.33.137:8084',
  production: true,
  defaultauth: 'fackbackend',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  },
  users: {
    role: {
      list: '/api-v1/role',
      retrieve: '/api-huex/v1/employees/',
      register: '/api-huex/v1/employees',
      update: '/api-huex/v1/employees',
      delete: '/api-huex/v1/employees/'
    },
    user: {
      list: '/api-huex/v1/implements',
      retrieve: '/api-huex/v1/implements/',
      register: '/api-huex/v1/implements',
      update: '/api-huex/v1/implements',
      delete: '/api-huex/v1/implements/'
    }
  },


  security:{
    user:{
      login: '/api-huex/v1/security/user/login',
      register: '/api-huex/v1/security/user',
      list: '/api-huex/v1/security/user',
      delete: '/api-huex/v1/security/user/',
    },
    menu:{
      list: '/api-huex/v1/security/menu',
      listByUserId: '/api-huex/v1/security/menu/'
    }
  },

};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
