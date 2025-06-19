import detailStyles from './ingredient-details.module.css'

export function IngredientDetails (props) {
    return (<>
        <figure className={detailStyles.figure}>
            <img
                className={detailStyles.image}
                src={props.image_large}
                alt={props.name}
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
                    <td>{props.calories}</td>
                    <td>{props.proteins}</td>
                    <td>{props.fat}</td>
                    <td>{props.carbohydrates}</td>
                </tr>
            </tbody>
        </table>
    </>)
}