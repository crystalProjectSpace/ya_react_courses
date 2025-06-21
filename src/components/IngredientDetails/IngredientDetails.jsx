import PropTypes from 'prop-types'
import detailStyles from './ingredient-details.module.css'
import { Modal, ModalOverlay} from '../index'
import { IngredientBreakdown } from '../../types'

export function IngredientDetails (props) {
    const {
        name,
        image_large,
        calories,
        proteins,
        fat,
        carbohydrates
    } = props.ingredient;

    return <ModalOverlay closeModal={props.closeModal}>
        <Modal closeModal={props.closeModal} name={name}>
            <>
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
            </>
        </Modal>
    </ModalOverlay>
}

IngredientDetails.propTypes = {
    ingredient: IngredientBreakdown,
    closeModal: PropTypes.func,
}
