//import Login from './Login';
import "./styles.css";
/*function App(){
    return (
        <Login></Login>
    )
}

export default App; */

import {useState} from 'react'
import Modal from './Recipe'
import Ingredient from "./Ingredient";

function App() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
    <Modal open = {isOpen} close = { () => setIsOpen(false)}><Ingredient></Ingredient></Modal>
       <div className='button-container'>
         <button onClick = {() => setIsOpen(true) }>Open</button>
       </div>
    </>
    )
}
export default App;