import React from "react"
import { Routes, Route } from "react-router-dom"

import Chat from "./pages/Chat"
import Home from "./pages/Home"
import Layout from "./components/Layout"
import NotFound from "./pages/404Page"
import { AppProvider } from "./context/AppContext"

function App(): React.ReactElement {
  return (
    <AppProvider>
    <Routes>
      <Route path="" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="chat" element={<Chat/>} />
      </Route>
      <Route path="*" element={<NotFound/>} />
    </Routes>
    </AppProvider>
  )
}

export default App