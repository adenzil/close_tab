$(function(){

    get_data()

    $('#addnewlimit').on("click",function(){
        var page = $('#page').val();
        var minutes = $('#minutes').val();
        var seconds = $('#seconds').val();
        var totaltime = 0;

        if(minutes == parseInt(minutes,10))
            totaltime += minutes*60*1000;

        if(seconds == parseInt(seconds,10))
            totaltime += seconds*1000;

        if (page){
            var latest = {}
            chrome.storage.sync.get('existinglimit',function(limits){
                latest = limits.existinglimit;
                latest[page]=totaltime;
                chrome.storage.sync.set({'existinglimit':latest}, function(){
                    chrome.runtime.sendMessage({site:{'page':page,'totaltime':totaltime}}, function(response) {
                      console.log(response.added);
                    });
                    $('#page').val("");
                    $('#minutes').val("");
                    $('#seconds').val("");
                    get_data()
                });

            });

        }
    });

    function deletee(){
        console.log(this)
        var id = this.id;
         chrome.storage.sync.get('existinglimit',function(limits){
            latest = limits.existinglimit;
            delete latest[id];
            chrome.storage.sync.set({'existinglimit':latest}, function(){
                chrome.runtime.sendMessage({deleted:id}, function(response) {
                  console.log(response.added);
                });
                get_data()
            });
        });
    }

    function get_data(){

        $('#existinglimits').text('');

        chrome.storage.sync.get('existinglimit',function(limits){
            var list = document.createElement('ul');
            val = limits.existinglimit
            for (var key in val) {
              if (val.hasOwnProperty(key)) {
                var item = document.createElement('li');
                item.appendChild(document.createTextNode(key +" -> "+ (val[key]/1000 + " seconds")));
                var del = document.createElement('input');
                del.id = key;
                del.className = 'delete_but';
                del.type = 'submit';
                del.value = 'delete';
                del.onclick = deletee;
                item.appendChild(del);
                list.appendChild(item);
              }
            }
            document.getElementById('existinglimits').appendChild(list);
        });

    }

});


// chrome.storage.sync.set({'existinglimit':{}},function(p){console.log(p)})   // empty the list

// chrome.storage.sync.get({'existinglimit':{}},function(p){console.log(p)})   // get the list