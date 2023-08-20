// Definir la componente Rating que acepta un objeto 'props'
function Rating(props) {
   // Extraer las propiedades de 'rating', 'numReviews' y 'caption' del objeto 'props'
    const { rating, numReviews, caption } = props;

     // Renderizar la calificación utilizando íconos de estrellas
    return (
      <div className="rating">
        <span>
          <i
            className={
              rating >= 1
                ? 'fas fa-star'
                : rating >= 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          />
        </span>
        <span>
          <i
            className={
              rating >= 2
                ? 'fas fa-star'
                : rating >= 1.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          />
        </span>
        <span>
          <i
            className={
              rating >= 3
                ? 'fas fa-star'
                : rating >= 2.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          />
        </span>
        <span>
          <i
            className={
              rating >= 4
                ? 'fas fa-star'
                : rating >= 3.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          />
        </span>
        <span>
          <i
            className={
              rating >= 5
                ? 'fas fa-star'
                : rating >= 4.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          />
        </span>
        {caption ? (
          <span>{caption}</span>
        ) : (
          <span>{' ' + numReviews + ' reviews'}</span>
        )}
      </div>
    );
  }
  export default Rating;