/**
 * Created by gbox3d on 2014. 10. 7..
 */

var os = require('os');
//Display my IP
(function get_MyIP() {
    var networkInterfaces = os.networkInterfaces();

    for (var interface in networkInterfaces) {

        networkInterfaces[interface].forEach(
            function(details){

                if (details.family=='IPv4'
                    && details.internal==false) {
                    console.log(interface, details.address);
                }
            });
    }
})();