
import detailStyles from './ingredient-details.module.css'
import { useSelector } from 'react-redux'

export function IngredientDetails () {
    const {
        name,
        image_large,
        calories,
        proteins,
        fat,
        carbohydrates
    } = useSelector(state => {
        const {selectedId} = state.currentSelection
        const {items} = state.availableItems
        return items.find(item => item._id === selectedId) || {}
    })

    return  (<>
        <header className={detailStyles.header}>
            <h3 className={detailStyles.headerTitle}>{name}</h3>
        </header>
        <figure className={detailStyles.figure}>
            <img
                className={detailStyles.image}
                src={image_large}
                alt={name}
            />
        </figure>
        <table className={detailStyles.info}>
            <thead>
                <tr>
                    <th>Калории, г</th>
                    <th>Белки, г</th>
                    <th>Жиры, г</th>
                    <th>Углеводы, г</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{calories}</td>
                    <td>{proteins}</td>
                    <td>{fat}</td>
                    <td>{carbohydrates}</td>
                </tr>
            </tbody>
        </table>
    </>)
}
