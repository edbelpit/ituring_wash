import "./MyCars.css"

// components
import { Link, useParams } from "react-router-dom"

// hooks
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// redux
import { deleteCar, getUserCars } from "../../slices/carSlice"
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage"
import { getUserDetails } from "../../slices/userSlice"

const MyCars = () => {

  const { id } = useParams()

  const dispatch = useDispatch()

  const resetMessage = useResetComponentMessage(dispatch)

  const { user, loading } = useSelector((state) => state.user)
  const { user: userAuth } = useSelector((state) => state.auth)
  const { cars } = useSelector((state) => state.car)

    // load user data
    useEffect(() => {
      dispatch(getUserDetails(id))
      dispatch(getUserCars(id))
    }, [dispatch, id])

  const handleDelete = (id) => {
    dispatch(deleteCar(id))

    resetMessage()
  }

  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id="profile">
        <div className="profile-title">
          <h2>Meus Carros</h2>
        </div>
        {cars && cars.length > 0 && cars.map((car) => (
          <div className="profile-car" key={car._id}> 
            <div>
              <span className="fabricante">{car.fabricante}</span> <span className="modelo">{car.modelo}</span>
              <p className="ano">{car.ano}</p>
            </div>
            {id === userAuth._id && (
              <>
                  <button className="delete-button" onClick={() => handleDelete(car._id)}>
                    Excluir carro
                  </button>
              </>
            )}
          </div>  
        ))}
          <div className="add-button">
            <Link to={`/addcar/${user._id}`}>
              <button className="add-button">Adicionar carro</button>
            </Link>
          </div>
    </div>
  )
}
export default MyCars