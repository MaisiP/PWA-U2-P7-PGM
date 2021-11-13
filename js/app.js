let url = window.location.href
let swDirectory = "/PWA-U2-P7-PGM/"

let player = $('#player')
//let photoUser = $('#photoUser')

let btnCamera = $('#btnCamera')
let btnCameraBack = $('#btnCameraBack')
let btnTakePhoto = $('#btnTakePhoto')

let cardPhotos = $('#cardPhotos')

let cameraOn = ""

let listPhoto = []

const camera = new Camera(player[0])

btnCamera.on('click',()=>{
    console.log('Camera');

    camera.on().then(result=>{
        if (!result) {
            alert('Error al iniciar la camara')
        }
        cameraOn = "Frontal"
    })
})

btnCameraBack.on('click',()=>{
    console.log('Camera Back');

    camera.onBack().then(result=>{
        if (!result) {
            alert('Error al iniciar la camara')
        }
        cameraOn = "Trasera"
    })
})

btnTakePhoto.on('click',()=>{
    console.log('Take photo');

    camera.off()
    let base64 = camera.takePhoto()
    //photoUser.attr('src',base64) 
    addPhoto(base64)
})

if(navigator.serviceWorker){

    if (url.includes('localhost')) {
        swDirectory = '/'
    }
    
    navigator.serviceWorker.register(swDirectory+'sw.js')
}

function getList() {
    listPhoto =  JSON.parse(window.localStorage.getItem('listPhoto'))

    if (listPhoto != null) {
        cardPhotos.empty()
        listPhoto.forEach(photo =>{
            
            let cardHTML = $(`
                <div class="card" style="width: 18rem;">
                    <img src="${photo.src}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center">${photo.type}</h5>
                    </div>
                </div>
                    `)
            cardPhotos.append(cardHTML)
        })
    } else {
        listPhoto = []
    }
}

function addPhoto(base64) {
    var photo = {
        src:base64,
        type: cameraOn
    }

    listPhoto.push(photo)
    window.localStorage.setItem('listPhoto', JSON.stringify(listPhoto));

    getList()
}

getList()
