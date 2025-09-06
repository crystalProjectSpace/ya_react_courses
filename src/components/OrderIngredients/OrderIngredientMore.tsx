export function OrderIngredientMore(props: { excess: number }) {
    return <figure className="ingredient-wrap">
        <span className="ingredient-picture _text-shadow-blue text text_type_digits-default">
            +&nbsp;{ props.excess }
        </span>
    </figure>
}