function Post({
  post: { id, titulo, img, descripcion, likes },
  like,
  eliminarPost,
}) {
  return (
    <div className="card col-12 col-sm-4 d-inline mx-0 px-3">
      <div className="card-body p-0">
        {/* Imagen del post */}
        <img
          className="card-img-top"
          src={img || "https://via.placeholder.com/150"}
          alt={titulo}
        />
        <div className="p-3">
          {/* Título y descripción */}
          <h4 className="card-title">{titulo}</h4>
          <p className="card-text">{descripcion}</p>

          {/* Botones de interacción */}
          <div className="d-flex justify-content-between align-items-center">
            {/* Like */}
            <div className="d-flex align-items-center">
              <i
                onClick={() => like(id)} // Llama a la función like con el id del post
                className={`fa-heart fa-xl ${likes ? "fa-solid" : "fa-regular"}`}
                role="button"
                aria-label="Like"
              ></i>
              <span className="ms-2 badge bg-primary">{likes}</span>
            </div>

            {/* Eliminar */}
            <i
              onClick={() => {
                if (
                  window.confirm(
                    "¿Estás seguro de que deseas eliminar este post?"
                  )
                ) {
                  eliminarPost(id); // Llama a la función eliminarPost con el id del post
                }
              }}
              className="fa-solid fa-x"
              role="button"
              aria-label="Eliminar"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
