function Favorites() {
    const[savedRecipes, setSavedRecipes] = useState()

    useEffect(() => {
        fetch("/get_saved_recipes")
            .then((response) => response.json())
            .then((data) => {
                setSavedRecipes(data)
            });
    }, []);


    useEffect(() => {
        console.log(savedRecipes)
    }, [savedRecipes]);

    return (
        <div>
            <div className="card trending-menus snipcss-NvKfM">
                <div className="card-header d-sm-flex d-block pb-0 border-0">
                    <div>
                        <h4 className="text-black fs-20">Saved Recipes</h4>
                        <p className="fs-13 mb-0 text-black">Click on them to get more info!</p>
                    </div>
                </div>
                <div className="card-body dz-scroll height500" id="dailyMenus">
                {savedRecipes && savedRecipes.map((info) => {
                                    return (
                                        <div className="col-lg-6">
                                            <FavoriteRecipeCard
                                                // key={info.id}
                                                title={info.Title}
                                                img={info.Image} 
                                                calories={info.Calories}
                                                protein={info.Protein}
                                                carbs={info.Carbohydrates}
                                                fat={info.Fat}
                                                // recipeSummary={info.RecipeSummary}
                                                // ingredients={info.Ingredients.map((ingredient) => ingredient.original)}
                                                // instructions={info.Instructions.map((steps) => steps.step)}
                                                // recipe_id={info.RecipeID}
                                                // meal_type={foodType}
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

function FavoriteRecipeCard({title, img, calories, protein, carbs, fat}) {

    return (
        <div className="d-flex pb-3 mb-3 border-bottom tr-row align-items-center">
            <div className="mr-auto pr-3">
                <a href="/react/demo/analytics/post-details">
                    <h2 className="text-black fs-14">{title}</h2>
                </a>
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
    )
}