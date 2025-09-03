export function OrderIngredientMore(props: { excess: number }) {
    return <figure className="ingredient-wrap">
        <span className="ingredient-img">+&nbsp;{ props.excess }</span>
    </figure>
}