// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  server: 'http://localhost:3000',
  //server: 'http://localhost:8084',
  production: false,
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
  login: '/login',
  users: {
    role: {
      list: '/api-v1/role',
      retrieve: '/api-v1/role/',
      register: '/api-v1/role',
      update: '/api-v1/role/',
      delete: '/api-v1/role/'
    },
    user: {
      list: '/api-v1/user',
      retrieve: '/api-v1/user/',
      register: '/api-v1/user',
      update: '/api-v1/user/',
      delete: '/api-v1/user/'
    }
  },
  buses:{
    typeSeat:{
      list: '/api-v1/type-seat',
      retrieve: '/api-v1/type-seat/',
      register: '/api-v1/type-seat',
      update: '/api-v1/type-seat/',
      delete: '/api-v1/type-seat/',
    },
    TypeSeatDetail:{
      list: '/api-v1/type-seat-detail',
      retrieve: '/api-v1/type-seat-detail/',
      register: '/api-v1/type-seat-detail',
      update: '/api-v1/type-seat-detail/',
      delete: '/api-v1/type-seat-detail/',
      deleteByIdBus: '/api-v1/type-seat-detail/by-bus/',
      getAllByPlate: '/api-v1/type-seat-detail/by-plate/'
    },
    bus:{
      list: '/api-v1/bus',
      retrieve: '/api-v1/bus/',
      register: '/api-v1/bus',
      update: '/api-v1/bus/',
      delete: '/api-v1/bus/'
    }
  },
  booking: {
    itinerary:{
      list: '/api-v1/itinerary',
      retrieve: '/api-v1/itinerary/',
      register: '/api-v1/itinerary',
      update: '/api-v1/itinerary/',
      delete: '/api-v1/itinerary/',
    },
    booking:{
      list: '/api-v1/booking',
      retrieve: '/api-v1/booking/',
      register: '/api-v1/booking',
      update: '/api-v1/booking/',
      delete: '/api-v1/booking/',
    },
    bookingDetail:{
      list: '/api-v1/booking-detail',
      retrieve: '/api-v1/booking-detail/',
      register: '/api-v1/booking-detail',
      update: '/api-v1/booking-detail/',
      delete: '/api-v1/booking-detail/',
      byUSer: '/api-v1/booking-detail/by-user/'
    }
  }


};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
