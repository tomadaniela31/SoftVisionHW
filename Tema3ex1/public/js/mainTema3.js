const socket=io();
const button=document.getElementById('counter');


const counter=socket.on('counter', function(counter){
    //console.log(counter);
    document.getElementById('showCounter').innerHTML=counter;
})


button.addEventListener('click',function(){
    var newCounter=parseInt(document.getElementById('showCounter').innerHTML)+1;
    console.log("Value="+newCounter);
    socket.emit('counter', newCounter);

})
