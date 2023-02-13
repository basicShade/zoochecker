import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReceiptCreate } from './pages'

function App() {


  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ReceiptCreate/>} />

      </Routes>
    </BrowserRouter> 
 



  )
}

export default App
