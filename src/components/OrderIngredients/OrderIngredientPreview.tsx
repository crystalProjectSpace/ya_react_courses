export function OrderIngredientPreview(props: { url: string, name: string }) {
    return <figure className="ingredient-wrap">
        <img
            className="ingredient-picture"
            alt={props.name}
            src={props.url}
        />
    </figure>
}
