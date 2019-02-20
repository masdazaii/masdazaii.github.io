$(document).ready(function(){
    // Inisiasi API url
    var _url = 'http://my-json-server.typicode.com/DesertHaze99/belajar-api/mahasiswa';

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
        $('#mhs-select').html(gender_result);

    })
});