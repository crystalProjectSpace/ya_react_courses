import { useSelector } from "react-redux"
import type { IIngredientState } from "../../types"

export function OrderIngredientPreview(props: { itemId: string }) {
    const { name, url } = useSelector((state:IIngredientState) => {
        const item = state.availableItems.items.find(item => item._id == props.itemId);
        return item
            ? { name: item.name, url: item.image_mobile }
            : { name: '', item: '' };
        }
    )
    return <figure className="ingredient-wrap">
        <img className="ingredient-picture" alt={name} src={url} />
    </figure>
}
