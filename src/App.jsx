import { useEffect, useState } from "react"

const FollowMouse=()=>{
  const [enabled, setEnable]=useState(false)
  const [position, setPosition]=useState({x:0, y:0})

  useEffect(()=>{
    console.log("efecto",{enabled})

    const handleMove=(event)=>{
      const {clientX, clientY} =event
      console.log('handleMove', {clientX, clientY})
      setPosition({x:clientX, y:clientY})
    }

    if(enabled){ //suscriptos al evento
      window.addEventListener('pointermove', handleMove)
    }

  //para limpiar suscripciones. Clean useEffect
  //se ejecuta siempre que se desmonta componente
  //y cuando cambia dependencia
    return()=>{
      window.removeEventListener('pointermove', handleMove)
    }

  },[enabled]) //se ejecuta cada vez que esta enabled

//----------- para que no se vea cursor ----------
  useEffect(()=>{
    document.body.classList.toggle('no-cursor', enabled)
    //cada vez que cambia el enabled, las clases que tiene el body
    //le pongo no-cursor
    return()=>{
      document.body.classLict.remove('no-cursor')
    }
  }, [enabled])

  return (
    <main>
      <div style={{
        position:'absolute',
        backgroundColor:'#89f',
        borderRadius:'50%',
        opacity:0.8,
        pointerEvents:'none',
        left: -20,
        top:-20,
        width:40,
        height:40,
        transform: `translate (${position.x}px, ${position.y}px)`
      }}
      />
      <h2>Proyecto 3</h2>
      <button onClick={()=> setEnable(!enabled)}>
      {enabled ? 'Desactivar' : 'Activar'}
      Seguir Puntero
      </button>
    </main>
  )

}

function App() {


  return(
    <main>
      <FollowMouse/>
    </main>
  )
  
}

export default App
