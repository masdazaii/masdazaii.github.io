var CACHE_NAME = 'latihan-pwa-cache-v1';

var urlToCache = [
    '/',
    '/js/main.js',
    '/js/jquery.min.js',
    '/css/main.css',
    '/images/icons/icon-72x72.png',
    '/images/15083098352901077999132.jpg',
    '/manifest.json'
];

// install cache on browser

self.addEventListener('install', function(event){
    // do install
    event.waitUntil(
        caches.open(CACHE_NAME).then(
            function(cache){
                // cek apakah CACHE sudah terinstall
                console.log("service worker do install...");
                return cache.addAll(urlToCache);
            }
        )
    )
});

//aktifasi SW
self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                // jika sudah ada cache dengan versi beda maka dihapus
                cacheNames.filter(function(cacheName){
                    return cacheName !== CACHE_NAME;
                }).map(function(cacheName){
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

//fetch cache
self.addEventListener('fetch', function(event){
    var request = event.request;
    var url = new URL(request.url);

    // pisah API dengan cache
    // jika menggunakan data lokal cache
    if (url.origin === location.origin){
        event.respondWith(
            caches.match(request).then(function (response) {
                // jika ada maka tampilkan data dari cache, jika tidak ada maka fetch dari request
                return response || fetch(request);
            })
        );
    } else{
        // jika menggunakan internet API
        event.respondWith(
            // buat cache baru
            caches.open('mahasiswa-cache-v1').then(function (cache) {
                return fetch(request).then(function (liveRequest) {
                    cache.put(request,liveRequest.clone());
                    // nyimpen hasil fetch ke cache name diatas
                    return liveRequest;
                }).catch(function () {
                    return caches.match(request).then(function (response) {
                        // jika cache kita cek ad isinya maka return response
                        if (response) return response;  // jika tidak ketemu juga ya ke fallback.json
                        return caches.match('/fallback.json');
                    })
                })
            })
        )
    }
    // event.respondWith(
    //     caches.match(event.request).then(function(response){
    //         console.log(response);
    //         if(response){
    //             return response;
    //         }
    //         return fetch(event.request);
    //     })
    // )
});

self.addEventListener('notificationclose',function(n){
    var notification = n.notification;
    var primaryKey = notification.data.primaryKey;

    console.log('close notification : ' + primaryKey);
});

self.addEventListener('notificationclick',function(n){
    var notification = n.notification;
    var primaryKey = notification.data.primaryKey;
    var action = n.action;

    if(action === "close"){
        notification.close();
    }else{
        clients.openWindow('www.google.com');
        notification.close();
    }
});