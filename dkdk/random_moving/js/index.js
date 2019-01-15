$(document).ready(function(){
    var rand1 = Math.floor(Math.random() * 2000) + 3000;
    var rand2 = Math.floor(Math.random() * 2000) + 3000;
    var rand3 = Math.floor(Math.random() * 2000) + 3000;
    var rand4 = Math.floor(Math.random() * 2000) + 3000;
    animateDiv('.a');
    animateDiv('.b');
    animateDiv('.c');
    animateDiv('.d');
});

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(myclass){
    var newq = makeNewPosition();
    $(myclass).animate({ top: newq[0], left: newq[1] }, Math.floor(Math.random() * 4000) + 3000,   function(){
      animateDiv(myclass);        
    });
    
};