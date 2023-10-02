function Favorites({ savedRecipes, fetchSavedRecipes }) {
    return (
        <div>
            <div className="card trending-menus snipcss-NvKfM">
                <div className="card-header d-sm-flex d-block pb-0 border-0">
                    <div>
                        <h4 className="text-black fs-20">Saved Recipes</h4>
                        <p className="fs-13 mb-0 text-black">Click on them to get more info!</p>
                    </div>
                </div>
                <div className="card-body dz-scroll" id="dailyMenus">
                    {savedRecipes && savedRecipes.map((info) => {
                        return (
                            <div className="col-lg-6">
                                <FavoriteRecipeCard
                                    title={info.Title}
                                    img={info.Image}
                                    calories={info.Calories}
                                    protein={info.Protein}
                                    carbs={info.Carbohydrates}
                                    fat={info.Fat}
                                    recipeSummary={info.RecipeSummary}
                                    ingredients={info.Ingredients}
                                    instructions={info.Instructions}
                                    recipe_id={info.RecipeID}
                                    user_saved={info.UserSaved}
                                    increaseAmount = {info.IncreaseAmount}
                                    fetchSavedRecipes={fetchSavedRecipes}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="card-footer border-0 pt-0"></div>
            </div>

        </div>
    )
}

function FavoriteRecipeCard({ title, img, calories, protein, carbs, fat, recipeSummary,
    ingredients, instructions, recipe_id, meal_type, user_saved, increaseAmount, fetchSavedRecipes }) {

    const [show, setShow] = useState(false);
    const [increased, setIncreased] = useState(" ")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const formattedIngredients = ingredients.replace(/[{"}]/g, '');
    const ingredientList = formattedIngredients.split(',');
    const formattedInstructions = instructions.replace(/[{"}]/g, '');
    const instructionList = formattedInstructions.split(',');

    useEffect(() => {
        if (increaseAmount > 0) {
            setIncreased(<div className="icon-container">
                <i className="fa-solid fa-clipboard-list fa-bounce fa-lg" style={{ color: '#ed4666' }}></i>
                <div className="icon-window">Modified to meet your dietary requirements!</div>
            </div>)
        }
    }, [increaseAmount])

    return (
        <div>
            <button className="RecipeButton" onClick={handleShow}>
                <div className="d-flex pb-3 mb-3 border-bottom tr-row align-items-center">
                    <div className="mr-auto pr-3">
                        <h2 className="text-black fs-14">{title}
                        <span> {increased}</span>
                        </h2>
                        <ul>
                            <li className="fs-14 text-black">
                                <strong className="mr-1">{`${Math.round(calories)}cal`}</strong>
                                Total Calories
                            </li>
                            <li className="fs-14 text-black">
                                <strong className="mr-1">{`${Math.round(protein)}g`}</strong>
                                Protein
                            </li>
                            <li className="fs-14 text-black">
                                <strong className="mr-1">{`${Math.round(carbs)}g`}</strong>
                                Carbohydrates
                            </li>
                            <li className="fs-14 text-black">
                                <strong className="mr-1">{`${Math.round(fat)}g`}</strong>
                                Fat
                            </li>
                        </ul>
                    </div>
                    <img
                        src={`${img}`}
                        alt="menu9"
                        width={60}
                        className="rounded"
                    />
                </div>
            </button>
            {show && <RecipeModal handleClose={handleClose} title={title} image={img} show={show}
                calories={calories} protein={protein} carbs={carbs}
                fat={fat} recipeSummary={recipeSummary}
                ingredients={ingredientList} increase_amount={increaseAmount} instructions={instructionList}
                recipe_id={recipe_id} meal_type={meal_type} user_saved={user_saved}
                fetchSavedRecipes={fetchSavedRecipes}

            ></RecipeModal>}
        </div>
    )
}