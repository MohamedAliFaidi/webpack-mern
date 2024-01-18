
import './App.css'

function App() {

  return (
    <>


      <button onClick={() => {
        fetch('/v1').then(async (response) => {
          return await response.json()
        }).then((data) => {
          console.log(data)
        })




      }}>Log</button>

    </>
  )
}

export default App
