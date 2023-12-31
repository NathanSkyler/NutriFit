const Tab = ReactBootstrap.Tab
const Tabs = ReactBootstrap.Tabs
const Button = ReactBootstrap.Button
const ButtonGroup = ReactBootstrap.ButtonGroup
const Placeholder = ReactBootstrap.Placeholder

function RecipeDash({ userStatsCalories, fetchSavedRecipes }) {
    const [recipeInfo, setRecipeInfo] = useState({
        'breakfast': {},
        'lunch': {},
        'dinner': {},
        'snack': {}
    })

    const [foodType, setFoodtype] = useState('breakfast');
    const [dietType, setDietType] = useState(' ');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const dietData = {
            dietType: dietType
        }
        if (userStatsCalories > 0) {
            fetch('/get_recipes', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dietData)
            })
                .then((response) => response.json())
                .then((data) => {
                    setRecipeInfo((prevRecipeInfo) => {
                        return {
                            ...prevRecipeInfo,
                            ...data
                        };
                    });
                })
                .finally(() => {
                    setLoading(false)
                });
        }
    }, [userStatsCalories, dietType]);

    return (
        <div>
            <div className="card snipcss-jULXg">
                <div className="card-header border-0 pb-2 d-lg-flex flex-wrap d-block">
                    <div>
                        <h4 className="card-title mb-2">Recipes for you</h4>
                        <p className="fs-14 mb-0">These are given to you based on your daily intake</p>
                        <ButtonGroup aria-label="diets" className="dietgroup">
                            <Button variant="Anything" onClick={() => setDietType(" ")}className={dietType === ' ' ? 'selected-button' : 'dietbutton'}><div className="icon-content"><div className="icon-container">
                                <i className="fa-solid fa-utensils fa-2xl"></i></div><div>Anything</div></div></Button>
                            <Button variant="Paleo" onClick={() => setDietType("Paleo")} className={dietType === 'Paleo' ? 'selected-button' : 'dietbutton'}><div className="icon-content"><div className="icon-container">
                                <i className="fa-solid fa-drumstick-bite fa-2xl" style={{ color: '#4d3605' }}></i></div><div>Paleo</div></div></Button>
                            <Button variant="Vegetarian" onClick={() => setDietType("Vegetarian")}className={dietType === 'Vegetarian' ? 'selected-button' : 'dietbutton'}><div className="icon-content"><div className="icon-container">
                                <i className="fa-solid fa-carrot fa-2xl" style={{ color: '#ff7b00' }}></i></div><div>Vegetarian</div></div></Button>
                            <Button variant="Vegan" onClick={() => setDietType("Vegan")}className={dietType === 'Vegan' ? 'selected-button' : 'dietbutton'}><div className="icon-content"><div className="icon-container">
                                <i className="fa-solid fa-seedling fa-2xl" style={{ color: '#327b24' }}></i></div><div>Vegan</div></div></Button>
                            <Button variant="Ketogenic" onClick={() => setDietType("Ketogenic")}className={dietType === 'Ketogenic' ? 'selected-button' : 'dietbutton'}><div className="icon-content"><div className="icon-container">
                                <i className="fa-solid fa-wheat-awn-circle-exclamation fa-2xl" style={{ color: '#af9e4b' }}></i></div><div>Ketogenic</div></div></Button>
                            <Button variant="Mediterranean" onClick={() => setDietType("Pescetarian")}className={dietType === 'Pescetarian' ? 'selected-button' : 'dietbutton'}><div className="icon-content"><div className="icon-container">
                                <i className="fa-solid fa-fish-fins fa-2xl" style={{ color: '#dd7a1d' }}></i></div><div>Pescetarian</div></div></Button>
                        </ButtonGroup>
                    </div>
                    <div className="card-action card-tabs mt-3 mt-3 mt-lg-0" style={{marginBottom:"80px"}}>
                        <Tabs
                            defaultActiveKey="profile"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                            activeKey={foodType}
                            onSelect={(key) => setFoodtype(key)}
                        >
                            <Tab eventKey="breakfast" title="Breakfast">
                            </Tab>
                            <Tab eventKey="lunch" title="Lunch">
                            </Tab>
                            <Tab eventKey="dinner" title="Dinner">
                            </Tab>
                            <Tab eventKey="snack" title="Snacks">
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <div className="card-body most-favourite-items pb-0">
                    <div className="tab-content tab-content">
                        <div
                            role="tabpanel"
                            aria-hidden="false"
                            className="fade tab-pane fade tab-pane active show"
                        >
                            <div>
                                {loading ? (
                                    <>
                                        {Array.from({ length: 3 }).map((_, index) => (
                                            <PlaceholderAnimation key={index} />
                                        ))}
                                    </>
                                ) : (
                                    <div className="row" style={{marginTop:"-44px"}}>
                                        {Object.keys(recipeInfo[foodType]).length > 0 && recipeInfo[foodType].map((info) => {
                                            return (
                                                <div className="col-lg-6">
                                                    <RecipeCard
                                                        key={info.id}
                                                        title={info.Title}
                                                        img={info.Image}
                                                        calories={info.Calories}
                                                        protein={info.Protein}
                                                        carbs={info.Carbohydrates}
                                                        fat={info.Fat}
                                                        recipeSummary={info.RecipeSummary}
                                                        ingredients={info.Ingredients.map((ingredient) => ingredient.original)}
                                                        increase_amount={info.IncreaseIngredientsAmount}
                                                        instructions={info.Instructions.map((steps) => steps.step)}
                                                        recipe_id={info.RecipeID}
                                                        meal_type={foodType}
                                                        user_saved={info.UserSaved}
                                                        fetchSavedRecipes={fetchSavedRecipes}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                        </div>
                        <div
                            role="tabpanel"
                            aria-hidden="true"
                            className="fade tab-pane fade tab-pane"
                        >

                        </div>
                        <div
                            role="tabpanel"
                            aria-hidden="true"
                            className="fade tab-pane fade tab-pane"
                        >

                        </div>
                        <div
                            role="tabpanel"
                            aria-hidden="true"
                            className="fade tab-pane fade tab-pane"
                        >

                        </div>
                        <div
                            role="tabpanel"
                            aria-hidden="true"
                            className="fade tab-pane fade tab-pane"
                        >
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="media mb-4 align-items-center">
                                        <img
                                            className="rounded mr-3 food-img"
                                            ///demo/static/media/pic4.31c0781cec4fd0c518a8.//"
                                            alt="card_pic4"
                                        />
                                        <div className="media-body">
                                            <h5 className="mb-sm-4 mb-3">
                                                <a
                                                    className="text-black"
                                                    href="/react/demo/analytics/ecom-product-detail"
                                                >
                                                    Watermelon Juice with Ice
                                                </a>
                                            </h5>
                                            <div className="d-flex mb-2">
                                                <svg
                                                    className="mr-2"
                                                    width={15}
                                                    height={15}
                                                    viewBox="0 0 15 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        x="0.500488"
                                                        width="2.04545"
                                                        height={15}
                                                        rx="1.02273"
                                                        fill="#EA7A9A"
                                                    ></rect>
                                                    <rect
                                                        x="4.59131"
                                                        y="4.09082"
                                                        width="2.04545"
                                                        height="10.9091"
                                                        rx="1.02273"
                                                        fill="#EA7A9A"
                                                    ></rect>
                                                    <rect
                                                        x="8.68213"
                                                        y="10.2271"
                                                        width="2.04545"
                                                        height="4.77273"
                                                        rx="1.02273"
                                                        fill="#EA7A9A"
                                                    ></rect>
                                                    <rect
                                                        x="12.7729"
                                                        y="2.04541"
                                                        width="2.04545"
                                                        height="12.9545"
                                                        rx="1.02273"
                                                        fill="#EA7A9A"
                                                    ></rect>
                                                </svg>
                                                <span className="fs-14 text-black">
                                                    <strong className="mr-1">2,441</strong>
                                                    Total Sales
                                                </span>
                                            </div>
                                            <div className="star-review2 d-flex align-items-center flex-wrap fs-12">
                                                <div className="mb-2">
                                                    <i className="fa fa-star text-orange"></i>
                                                    <i className="fa fa-star text-orange"></i>
                                                    <i className="fa fa-star text-orange"></i>
                                                    <i className="fa fa-star text-gray"></i>
                                                    <i className="fa fa-star text-gray"></i>
                                                </div>
                                                <span className="ml-3 text-dark mb-2">(454 revies)</span>
                                            </div>
                                        </div>
                                        <div className="d-inline-block relative donut-chart-sale">
                                            <div className="donught-chart style-MlAKC" id="style-MlAKC">
                                                <canvas
                                                    role="img"
                                                    height={150}
                                                    width={150}
                                                    id="style-cq8ZE"
                                                    className="style-cq8ZE"
                                                ></canvas>
                                            </div>
                                            <small>75%</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="media mb-4 align-items-center">
                                        <img
                                            className="rounded mr-3 food-img"
                                            alt="card_pic9"
                                        />
                                        <div className="media-body">
                                            <h5 className="mb-sm-4 mb-3">
                                                <a
                                                    className="text-black"
                                                    href="/react/demo/analytics/ecom-product-detail"
                                                >
                                                    Orange Juice Special Smoothy with Sugar
                                                </a>
                                            </h5>
                                            <div className="d-flex mb-2">
                                                <svg
                                                    className="mr-2"
                                                    width={15}
                                                    height={15}
                                                    viewBox="0 0 15 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        x="0.500488"
                                                        width="2.04545"
                                                        height={15}
                                                        rx="1.02273"
                                                        fill="#EA7A9A"
                                                    ></rect>
                                                    <rect
                                                        x="4.59131"
                                                        y="4.09082"
                                                        width="2.04545"
                                                        height="10.9091"
                                                        rx="1.02273"
                                                        fill="#EA7A9A"
                                                    ></rect>
                                                    <rect
                                                        x="8.68213"
                                                        y="10.2271"
                                                        width="2.04545"
                                                        height="4.77273"
                                                        rx="1.02273"
                                                        fill="#EA7A9A"
                                                    ></rect>
                                                    <rect
                                                        x="12.7729"
                                                        y="2.04541"
                                                        width="2.04545"
                                                        height="12.9545"
                                                        rx="1.02273"
                                                        fill="#EA7A9A"
                                                    ></rect>
                                                </svg>
                                                <span className="fs-14 text-black">
                                                    <strong className="mr-1">3,515</strong>
                                                    Total Sales
                                                </span>
                                            </div>
                                            <div className="star-review2 d-flex align-items-center flex-wrap fs-12">
                                                <div className="mb-2">
                                                    <i className="fa fa-star text-orange"></i>
                                                    <i className="fa fa-star text-orange"></i>
                                                    <i className="fa fa-star text-orange"></i>
                                                    <i className="fa fa-star text-gray"></i>
                                                    <i className="fa fa-star text-gray"></i>
                                                </div>
                                                <span className="ml-3 text-dark mb-2">(454 revies)</span>
                                            </div>
                                        </div>
                                        <div className="d-inline-block relative donut-chart-sale">
                                            <div className="donught-chart style-m2WSj" id="style-m2WSj">
                                                <canvas
                                                    role="img"
                                                    height={150}
                                                    width={150}
                                                    id="style-D52B7"
                                                    className="style-D52B7"
                                                ></canvas>
                                            </div>
                                            <small>21%</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="media mb-4 align-items-center">
                                        <img
                                            className="rounded mr-3 food-img"
                                            alt="card_pic8"
                                        />
                                        <div className="d-inline-block relative donut-chart-sale">
                                            <div className="donught-chart style-4Vxnm" id="style-4Vxnm">
                                                <canvas
                                                    role="img"
                                                    height={150}
                                                    width={150}
                                                    id="style-C1ZQK"
                                                    className="style-C1ZQK"
                                                ></canvas>
                                            </div>
                                            <small>45%</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="media mb-4 align-items-center">
                                        <img
                                            className="rounded mr-3 food-img"
                                            ///demo/static/media/pic11.83579c8d992d3a72b773.//"
                                            alt="card_pic11"
                                        />
                                        <div className="media-body">
                                            <h5 className="mb-sm-4 mb-3">
                                                <a
                                                    className="text-black"
                                                    href="/react/demo/analytics/ecom-product-detail"
                                                >
                                                    Medium Spicy Pizza with Kemangi Leaf
                                                </a>
                                            </h5>
                                            <div className="d-flex mb-2">
                                                <svg
                                                    className="mr-2"
                                                    width={15}
                                                    height={15}
                                                    viewBox="0 0 15 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        x="0.500488"
                                                        width="2.04545"
                                                        height={15}
                                                        rx="1.02273"
                                                        fill="#EA7A9A"
                                                    ></rect>
                                                    <rect
                                                        x="4.59131"
                                                        y="4.09082"
                                                        width="2.04545"
                                                        height="10.9091"
                                                        rx="1.02273"
                                                        fill="#EA7A9A"
                                                    ></rect>
                                                    <rect
                                                        x="8.68213"
                                                        y="10.2271"
                                                        width="2.04545"
                                                        height="4.77273"
                                                        rx="1.02273"
                                                        fill="#EA7A9A"
                                                    ></rect>
                                                    <rect
                                                        x="12.7729"
                                                        y="2.04541"
                                                        width="2.04545"
                                                        height="12.9545"
                                                        rx="1.02273"
                                                        fill="#EA7A9A"
                                                    ></rect>
                                                </svg>
                                                <span className="fs-14 text-black">
                                                    <strong className="mr-1">2,441</strong>
                                                    Total Sales
                                                </span>
                                            </div>
                                            <div className="star-review2 d-flex align-items-center flex-wrap fs-12">
                                                <div className="mb-2">
                                                    <i className="fa fa-star text-orange"></i>
                                                    <i className="fa fa-star text-orange"></i>
                                                    <i className="fa fa-star text-orange"></i>
                                                    <i className="fa fa-star text-gray"></i>
                                                    <i className="fa fa-star text-gray"></i>
                                                </div>
                                                <span className="ml-3 text-dark mb-2">(454 revies)</span>
                                            </div>
                                        </div>
                                        <div className="d-inline-block relative donut-chart-sale">
                                            <div className="donught-chart style-xQJRk" id="style-xQJRk">
                                                <canvas
                                                    role="img"
                                                    height={150}
                                                    width={150}
                                                    id="style-vyg6H"
                                                    className="style-vyg6H"
                                                ></canvas>
                                            </div>
                                            <small>52%</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            role="tabpanel"
                            aria-hidden="true"
                            className="fade tab-pane fade tab-pane"
                        >

                        </div>
                    </div>
                </div>
                <div className="card-footer border-0">
                </div>
            </div>
        </div>
    )
}

function RecipeCard({ title, img, calories, protein, carbs, fat, recipeSummary,
    ingredients, increase_amount, instructions, recipe_id, meal_type, user_saved, fetchSavedRecipes }) {

    const formattedTitle = title.replace(/\b\w+/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [increased, setIncreased] = useState(" ")

    useEffect(() => {
        if (increase_amount > 0) {
            setIncreased(<div className="icon-container">
                <i className="fa-solid fa-clipboard-list fa-lg" style={{ color: '#ed4666' }}></i>
                <div className="icon-window">Modified to meet your dietary requirements!</div>
            </div>)
        }
    }, [increase_amount])

    return (

        <div>
            <button className="RecipeSuggestionButton" onClick={handleShow}>
                <div className="media mb-4 align-items-center" style={{marginTop:"22px"}}>
                    <img
                        className="rounded mr-3 food-img"
                        src={`${img}`}
                        alt="card_pic4"
                    />
                    <div className="media-body">
                        <h5 className="mb-sm-4 mb-3">
                            <b className="text-black">
                                {formattedTitle}
                            </b>
                            <span> {increased}</span>
                        </h5>
                        <div className="d-flex mb-2">
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
                    </div>
                </div>
            </button>
            {show && <RecipeModal handleClose={handleClose} title={title} image={img} show={show}
                calories={calories} protein={protein} carbs={carbs}
                fat={fat} recipeSummary={recipeSummary}
                ingredients={ingredients} increase_amount={increase_amount} instructions={instructions}
                recipe_id={recipe_id} meal_type={meal_type} user_saved={user_saved} fetchSavedRecipes={fetchSavedRecipes}

            ></RecipeModal>}
        </div>
    )
}

function RecipeModal({ handleClose, show, title, image, calories, protein, carbs, fat,
    recipeSummary, ingredients, increase_amount, instructions, recipe_id, meal_type,
    user_saved, fetchSavedRecipes }) {

    const handleShow = () => setShow(true);
    const [increaseAlert, setIncreaseAlert] = useState(" ")

    useEffect(() => {
        if (increase_amount > 0) {
            setIncreaseAlert(<span style={{color:"rgb(234, 122, 154)"}}>*Increase Ingredient amount by {increase_amount}%</span>)
        }
    }, [increase_amount])

    if (instructions[0] === undefined) {
        instructions = ["Not Available"]
    }

    function removeHtmlTagsAndSentences(inputString) {
        const stringWithoutHtml = inputString.replace(/<\/?[^>]+(>|$)/g, "");
        const sentences = stringWithoutHtml.match(/(.*?[.!?](?:\s|$))/g);

        if (sentences && sentences.length >= 3) {
            const firstSentence = sentences[0].trim();
            const secondSentence = sentences[1].trim();
            const thirdSentence = sentences[2].trim();

            if (secondSentence.split(/\s+/).length <= 3) {
                return `${firstSentence} ${thirdSentence}`;
            } else {
                return `${firstSentence} ${secondSentence}`;
            }
        }
        return inputString;
    }
    const recipeSummary_fromatted = removeHtmlTagsAndSentences(recipeSummary)
    const [saveButton, setSaveButton] = useState(user_saved ? "Unsave" : "Save");
    const handleSave = (evt) => {
        evt.preventDefault();
        const recipeData = {
            recipe_id: recipe_id,
            meal_name: title,
            meal_type: meal_type,
            calories: calories,
            protein: protein,
            carbs: carbs,
            fat: fat,
            image: image,
            recipe_summary: recipeSummary_fromatted,
            ingredients: ingredients,
            instructions: instructions,
            increase_amount: increase_amount,
        }
        fetch("/save_recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipeData)
        })
            .then(response => response.json())
    };
    const handleButtonSave = () => {
        setSaveButton((prevSaveButton) => {
            return prevSaveButton === "Save" ? "Unsave" : "Save";
        });
    };

    const handleButtonClick = async (evt) => {
        await handleSave(evt);
        await handleButtonSave(evt);
        await fetchSavedRecipes();
        await fetchSavedRecipes();
    };
    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Recipe Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="card project-boxed snipcss-zUV5Q">
                        <img class="img-bx" src={image}>
                        </img>
                        <div class="card-header align-items-start">
                            <div>
                                <h6 class="fs-18 font-w500 mb-3">
                                    <a class="text-black user-name text-primary" href="/react/demo/task">
                                        {title}
                                    </a>
                                </h6>
                                <div class="text-dark fs-14 text-wrap">
                                    {recipeSummary_fromatted}
                                </div>
                            </div>
                            <div class="dropdown">
                                <div class="btn-link i-false dropdown-toggle" aria-haspopup="true" aria-expanded="false" variant="">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#342E59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        </path>
                                        <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#342E59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        </path>
                                        <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#342E59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-0 pb-3">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <span class="mb-0 title">

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
                                    </span>
                                </li>
                                <li class="list-group-item">
                                    <span class="mb-0 title">
                                        <ul>
                                            <b>Ingredients</b> {increaseAlert}
                                            {ingredients.map((ingredient, index) => (
                                                <li key={index}>{ingredient}</li>
                                            ))}
                                        </ul>
                                    </span>
                                </li>
                                <li class="list-group-item">
                                    <span class="mb-0 title">
                                        <ul>
                                            <b>Instructions</b>
                                            {instructions.map((step, index) => (
                                                <li key={index}><b>{`${index + 1}.`}</b> {step}</li>
                                            ))}
                                        </ul>
                                    </span>

                                </li>
                            </ul>
                        </div>
                    </div>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleButtonClick}>
                        {saveButton}
                    </Button>

                </Modal.Body>
            </Modal>
        </>
    );
}

function PlaceholderAnimation() {
    return (
        <div className="row">
            <div className="col-lg-6">
                <div className="row" style={{marginTop:'-8%'}}>
                    <div className="col-lg-6">
                        <Placeholder.Button variant="primary" xs={12} style={{ backgroundColor: '#EA7A9A', borderColor: '#EA7A9A' }} />
                    </div>
                    <div className="col-lg-6" style={{margin: '-124px', marginTop: '9px'}}>
                        <Placeholder as={Card.Title} animation="glow">
                            <Placeholder xs={12} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={6} /> {' '}
                            <div><Placeholder xs={3} />{' '}
                            </div>
                            <div>
                                <Placeholder xs={6} /> {' '}
                            </div>
                            <Placeholder xs={3} />{' '}
                        </Placeholder>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="row"style={{marginTop:'-8%'}}>
                    <div className="col-lg-6">
                        <Placeholder.Button variant="primary" xs={12} style={{ backgroundColor: '#EA7A9A', borderColor: '#EA7A9A' }} />
                    </div>
                    <div className="col-lg-6" style={{margin: '-124px', marginTop: '9px'}}>
                        <Placeholder as={Card.Title} animation="glow">
                            <Placeholder xs={12} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={6} /> {' '}
                            <div><Placeholder xs={3} />{' '}
                            </div>
                            <div>
                                <Placeholder xs={6} /> {' '}
                            </div>
                            <Placeholder xs={3} />{' '}
                        </Placeholder>
                    </div>
                </div>
            </div>
        </div>
    )
}