import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

useEffect(() => {
  fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((data) => setPosts(data))
    .catch((error) => console.error("Error:", error));
}, []);

const agregarPost = async () => {
  const nuevoPost = {
    titulo: "Mi título",
    img: "http://imagen.com/mi-imagen.jpg",
    descripcion: "Descripción del post",
  };

  await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoPost),
  });
};

