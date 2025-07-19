import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { IngredientCard } from '../components/IngredientCard/IngredientCard';

function IngredientsPage () {
    const { id } = useParams();

    const activeItem = useSelector(state => state.availableItems.items.find(item => item._id === id));
    return (<section className="page-wrap _ingredients">
        <IngredientCard {...activeItem}/>
    </section>)
}

export default IngredientsPage;
