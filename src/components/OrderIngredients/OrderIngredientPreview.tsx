export function OrderIngredientPreview(props: { url: string, name: string, index?: number }) {
    return <figure className="ingredient-wrap" style={{ 'zIndex': props.index ?? 'unset'}}>
        <img
            className="ingredient-picture"
            alt={props.name}
            src={props.url}
        />
    </figure>
}
