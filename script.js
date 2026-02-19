const video = document.getElementById('camera')
const click = document.querySelector('.click-button')
const snaps = document.querySelectorAll('.snap')
const save = document.querySelector('.save')
const picHolder = document.querySelector('.pic-holder')


navigator.mediaDevices.getUserMedia({
    video:true,
    audio:false
}).then(stream=>{
    video.srcObject = stream;
});

let currFilter = 'none';

let ceOne = document.querySelector('#ceOne');
let ceTwo = document.querySelector('#ceTwo');
let ceThree = document.querySelector('#ceThree');
let ceFour = document.querySelector('#ceFour');
let ceFive = document.querySelector('#ceFive');

ceOne.addEventListener('click',()=>{
     video.style.filter = 'none';
     currFilter = 'none';
})

ceTwo.addEventListener('click',()=>{
     video.style.filter = 'grayscale(100%)';
     currFilter = 'grayscale(100%)';
})

ceThree.addEventListener('click',()=>{
     video.style.filter = 'sepia(100%)';
     currFilter = 'sepia(100%)';
})

ceFour.addEventListener('click',()=>{
     video.style.filter = 'hue-rotate(90deg)';
     currFilter = 'hue-rotate(90deg)';
})

ceFive.addEventListener('click',()=>{
     video.style.filter = 'grayscale(50%) contrast(150%) brightness(120%)';
     currFilter = 'grayscale(50%) contrast(150%) brightness(120%)';
})

let imgNo = 0;

click.addEventListener('click',()=>{

    let canvas = document.createElement('canvas')
    canvas.height = video.videoHeight
    canvas.width = video.videoWidth

    const ctx = canvas.getContext('2d')
    ctx.filter = currFilter;
    ctx.drawImage(video,0,0,canvas.width, canvas.height)

    const image = canvas.toDataURL('image/png')
  
    let currentIndex = imgNo

    snaps[currentIndex].innerHTML = `
    <div class = "photo-wrap">
    <button class="delete-button"><i class="fa-regular fa-circle-xmark"></i></button>
    <img src="${image}">
    </div>`

    let deleteBtn = snaps[currentIndex].querySelector('.delete-button');

    deleteBtn.addEventListener('click',()=>{
        snaps[currentIndex].innerHTML = "";
    })

    imgNo++;

    if(imgNo>2){
        imgNo = 0
    }
    
    
})


let stripeBGone = document.querySelector('#seOne');
let stripeBGtwo = document.querySelector('#seTwo');
let stripeBGthree = document.querySelector('#seThree');

stripeBGone.addEventListener('click',()=>{
     picHolder.style.backgroundImage = "" ;
     picHolder.style.backgroundColor = 'rgb(210, 58, 83)';

     currentBG.type = 'color';
     currentBG.value = 'rgb(210, 58, 83)';
})

stripeBGtwo.addEventListener('click',()=>{
     picHolder.style.backgroundImage= "url('seTwo.jpg')";

     currentBG.type = 'image';
     currentBG.value = 'seTwo.jpg';
})

stripeBGthree.addEventListener('click',()=>{
     picHolder.style.backgroundImage = "url('seThree.jpg')";

     currentBG.type = 'image';
     currentBG.value = 'seThree.jpg';
})

let currentBG = {
    type:'color',
    value: 'rgb(210, 58, 83)'
}



save.addEventListener('click',()=>{

    let images = document.querySelectorAll('.snap img')

    let gap=20

    let photoWidth = images[0].naturalWidth;
    let photoHeight = images[0].naturalHeight;

    const canvas = document.createElement('canvas')
    canvas.width = photoWidth+gap*2
    canvas.height = photoHeight*images.length + gap*(images.length+1) //images.length = no of images

    const ctx = canvas.getContext('2d')

    function drawPicAndDownload(){
         images.forEach((img,index)=>{
        let x = gap
        let y = gap + (index*(photoHeight+gap))
        ctx.drawImage(img,x,y, photoWidth, photoHeight)
    })

    let strip = canvas.toDataURL('image/png')

    let link = document.createElement('a')
    link.href = strip
    link.download = "Ayme's_Cam.png"
    link.click()
    
    // images.forEach(img=>{
    //     img.remove()
    // })

    snaps.forEach(snap=>{
        snap.innerHTML = ""
    })

    imgNo =0
    }

    if(currentBG.type == 'color'){
        ctx.fillStyle = "rgb(210, 58, 83)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        drawPicAndDownload();

    }

    if(currentBG.type == 'image'){
        let bgImg = new Image();
        bgImg.src = currentBG.value;

        bgImg.onload = function(){
            ctx.drawImage(bgImg,0,0,canvas.width, canvas.height);
            drawPicAndDownload()
        }
    }
    
    
})

