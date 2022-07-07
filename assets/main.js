/*
* main.js
* https://github.com/unshorten/unshorten.github.io/blob/main/assets/main.js
* https://unshorten.github.io/assets/main.js
* 
* By xyti, https://github.com/xyti
*
* License : https://github.com/unshorten/unshorten.github.io/blob/main/LICENSE (MIT)
* source  : https://github.com/unshorten/unshorten.github.io
*/
var url;
$(document).ready(function(){
  $("#btn").click(function(e){
      e.preventDefault();
      var query = $("#query").val();
      function getHostname(url,tld) {
          let hostname;
          //find & remove protocol (http, ftp, etc.) and get hostname
          if (url.indexOf("://") > -1) {
              hostname = url.split('/')[2];
          }else {
              hostname = url.split('/')[0];
          }
          //find & remove port number
          hostname = hostname.split(':')[0];
          //find & remove "?"
          hostname = hostname.split('?')[0];
          if(tld){
            let hostnames = hostname.split('.');
            hostname = hostnames[hostnames.length-2] + '.' + hostnames[hostnames.length-1];
          }
          return hostname;
      }
      if (getHostname(query) == "is.gd") {
        url = "https://xyti.000webhostapp.com/fileproxy?url=" + encodeURIComponent("https://is.gd/forward.php?format=simple&shorturl=" + query);
      } else if (getHostname(query) == "v.gd") {
        url = "https://xyti.000webhostapp.com/fileproxy?url=" + encodeURIComponent("https://v.gd/forward.php?format=simple&shorturl=" + query);
      } else if (getHostname(query) == "miniurl.id") {
        url = "https://xyti.000webhostapp.com/api/get-url?alias=" + query.replace("http://", "").replace("https://","").replace("miniurl.id/", "");
      } else {
        url = "https://xyti.000webhostapp.com/fileproxy?url=" + encodeURIComponent("https://unshorten.me/s/" + query);
      }
      if(query !== ""){ 
        $.ajax({
          url: url,
          method: "GET",
          success: function(data){
            if (data.slice(0,6) == "<br />" || data.slice(0,6) == "Error:"){
              $("#unshortened").html("No alias found");
              $("#unshortened").attr("href",location.href);
            } else {
              $("#unshortened").html(data);
              $("#unshortened").attr("href",data);
            }
          },
          error: function(){
            $("#unshortened").html("Error - please check your browser or internet settings");
            $("#unshortened").attr("href",location.href);
          }
        });
      } else {
          $("#unshortened").html("This cannot be empty");
          $("#unshortened").attr("href",location.href);
      }
  })
});
