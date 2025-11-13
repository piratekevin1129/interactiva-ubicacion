var i = 0;
var j = 0;

function loadTrack(data){
    var url = data.src

    var audio_fx = null
    audio_fx = document.createElement('audio')
    audio_fx.setAttribute('src',url)
    audio_fx.load()
    audio_fx.addEventListener('loadeddata',function(){
        //alert("cargo")
        data.callBack(audio_fx)
    })
    audio_fx.addEventListener('error',function(){
        console.log("error cargando")
        data.callBack(null)
    })
}

function loadImg(data){
    var img = new Image()
    if(data.extra!=null&&data.extra!=undefined){
        img.setAttribute('f',data.extra.f)
    }
    img.onload = function(){
        img.onload = null
        img.onerror = null
        data.callBack(img)
    }
    img.onerror = function(){
        img.onload = null
        img.onerror = null
        data.callBack(null)
        console.log("error loading img: "+img.src)        
    }
    img.src = data.src
}

function getE(idname){
    return document.getElementById(idname)
}

var global_data = [{
    title:'Zona urbana / Zona rural / Código postal:',
    description:'Este campo te permite especiﬁcar si tu domicilio comercial está en zona urbana o rural, pero no es obligatorio para completar tu registro. <br><br>Puedes incluir el código postal de tu domicilio comercial si lo conoces, pero no es un requisito para la matrícula mercantil.',
    audio:null,
    opcional:true
},{
    title:'Municipio:',
    description:'Representa el lugar del domicilio comercial y determina qué cámara de comercio tendrá competencia sobre la matrícula.',
    audio:null,
    opcional:false
},{
    title:'Departamento:',
    description:'En Colombia existen municipios con el mismo nombre en diferentes departamentos. Sin esta información, podría generar confusión en el registro.',
    audio:null,
    opcional:false
},{
    title:'Localidad / Barrio / Vereda / Corregimiento:',
    description:'Útil pero no obligatoria para el registro.',
    audio:null,
    opcional:true
},{
    title:'País:',
    description:'Siempre se entiende que el registro se hace en Colombia, en la Cámara de Comercio competente.',
    audio:null,
    opcional:false
}]

function overZona(){
    over_mp3.currentTime = 0
    over_mp3.play()
}

var global_audio = null
var animacion_card = null
var card_active = false;
var animating_card = false;

function clickZona(audio,zona){
    if(!animating_card){
        var actual_clase = zona.getAttribute('class')
        var nueva_clase = actual_clase.replace('over','clicked')
        if(!card_active){
            intro_mp3.pause()
            setCard(audio)
            zona.className = nueva_clase
        }else{
            getE('card').className = 'card-off'
            animating_card = true;
            animacion_card = setTimeout(function(){
                clearTimeout(animacion_card)
                animacion_card = null;
                animating_card = false;
    
                setCard(audio)
                zona.className = nueva_clase
            },500)
        }
    }
}

function setCard(audio){
    if(global_audio!=null){
        global_audio.pause()
    }
    getE('card-header-title').innerHTML = global_data[audio-1].title
    getE('card-body-txt').innerHTML = global_data[audio-1].description
    if(global_data[audio-1].opcional){
        getE('card-header-opcional').style.display = 'block'
    }else{
        getE('card-header-opcional').style.display = 'none'
    }

    getE('card').className = 'card-on'
    card_active = true;
    global_audio = global_data[audio-1].audio
    global_audio.currentTime = 0
    global_audio.play()
    click_mp3.play()

    //.formulario-row-red
}