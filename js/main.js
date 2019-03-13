$(document).ready(function(){
    // Inisiasi API url
    var _url = 'https://my-json-server.typicode.com/DesertHaze99/belajar-api/mahasiswa';

    // Untuk menampung data semua mahasiswa
    var result = '';

    // Untuk menampung gender sebagai option di select
    var gender_result = '';

    // Untuk menampung gender semua mahasiswa
    var gender = [];


    $.get(_url, function(data){
        $.each(data, function(key, items){
            _gend = items.gender;

            result +=  '<div>'+'<h3>'+items.name+'</h3>'+'<p>'+_gend+'</p>'+'</div>';

            if($.inArray(_gend, gender) === -1){
                gender.push(_gend);
                gender_result += "<option value='"+_gend+"'>"+_gend+"</option>";
            }

        });

        $('#mhs-list').html(result);
        $('#mhs-select').html("<option value='semua'>semua</option>"+gender_result);

    })

    $("#mhs-select").on('change', function(){
        updateListMahasiwa($(this).val());
    });

    function updateListMahasiwa(opt){
        var result = '';
        var _url2 = _url;

        if(opt !== 'semua'){
            _url2 = _url + '?gender='+opt;
        }

        $.get(_url2, function(data){
            $.each(data, function(key, items){
                _gend = items.gender;
    
                result +=  '<div>'+'<h3>'+items.name+'</h3>'+'<p>'+_gend+'</p>'+'</div>';
    
            });
            
            $('#mhs-list').html(result);
        });
        
    }

    Notification.requestPermission(function(status){
        console.log('Notif permission status', status);
    })

    function displayNotification(){
        if (Notification.permission === "granted"){
            navigator.serviceWorker.getRegistration()
            .then(function(req){
                var option = {
                    body : " Notifikasi ini",
                    icon : 'images/icons/icon-128x128.png',
                    vibrate : [100,50,100],
                        data : {
                        dateOfarrival : Date.now(),
                        primaryKey : 1
                    },
                    actions: [
                        {action : 'explore',title :'kunjungi situs',
                        icon :'/images/icons/success.png'},
                        {action : 'close',title : 'close notifications',
                        icon :'/images/icons/error.png'}
                    ]
                };
                req.showNotification('ini notifikasi',option)
            })
        }
    }
    $("#show-notification").on('click',function(){
        console.log("button click");
        displayNotification()
    });

});//tutup ready function

if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('/serviceworker.js').then(
            function(reg){
                console.log('SW registration success, scope : ',reg.scope);
            }, function(err){
                console.log('SW registration failed : ', err);
            }
        )
    })
}
