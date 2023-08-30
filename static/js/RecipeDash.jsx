function RecipeDash({ userStatsCalories }) {

    const [recipeInfo, setRecipeInfo] = useState({})

    useEffect(() => {
        if (userStatsCalories > 0) {
            fetch('/get_recipes')
                .then((response) => response.json())
                .then((data) => {
                    setRecipeInfo(data);
                });
        }
    }, [userStatsCalories])
   

    return (
        <div>
            <div className="card snipcss-jULXg">
                <div className="card-header border-0 pb-2 d-lg-flex flex-wrap d-block">
                    <div>
                        <h4 className="card-title mb-2">Recipes for you</h4>
                   
                        <p className="fs-14 mb-0">These are given to you based on your daily intake</p>
                    </div>
                    <div className="card-action card-tabs mt-3 mt-3 mt-lg-0">
                        <ul className="nav nav-tabs nav" role="tablist">
                            <li className="nav-item nav-item">
                                <a
                                    role="tab"
                                    href="#"
                                    data-rb-event-key="all-categories"
                                    aria-selected="true"
                                    className="nav-link nav-link active"
                                >
                                    Breakfast
                                </a>
                            </li>
                            <li className="nav-item nav-item">
                                <a
                                    role="tab"
                                    href="#"
                                    data-rb-event-key="main-course"
                                    aria-selected="false"
                                    className="nav-link nav-link"
                                >
                                    Lunch
                                </a>
                            </li>
                            <li className="nav-item nav-item">
                                <a
                                    role="tab"
                                    href="#"
                                    data-rb-event-key="pizza"
                                    aria-selected="false"
                                    className="nav-link nav-link"
                                >
                                    Dinner
                                </a>
                            </li>
                            <li className="nav-item nav-item">
                                <a
                                    role="tab"
                                    href="#"
                                    data-rb-event-key="drinks"
                                    aria-selected="false"
                                    className="nav-link nav-link"
                                >
                                    Snacks
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card-body most-favourite-items pb-0">
                    <div className="tab-content tab-content">
                        <div
                            role="tabpanel"
                            aria-hidden="false"
                            className="fade tab-pane fade tab-pane active show"
                        >
                            <div className="row">
                               
                                    {Object.keys(recipeInfo).length > 0 && recipeInfo.map((info) => {
                                        console.log(info);  // Log each recipe info
                                        return (
                                            <div className="col-lg-6">
                                            <RecipeCard
                                                key={info.id}   
                                                title={info.Title}
                                                img={info.Image}
                                                calories={info.Calories}
                                            />
                                            </div>
                                        );
                                    })}
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
                                            <div className="donught-chart style-9kM2f" id="style-9kM2f">
                                                <canvas
                                                    role="img"
                                                    height={150}
                                                    width={150}
                                                    id="style-1Ehkv"
                                                    className="style-1Ehkv"
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
                                            ///demo/static/media/pic9.caa7db1011fab0d40c82.//"
                                            alt="/react/demo/static/media/pic9.caa7db1011fab0d40c82.//"
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
                                            <div className="donught-chart style-jZXaY" id="style-jZXaY">
                                                <canvas
                                                    role="img"
                                                    height={150}
                                                    width={150}
                                                    id="style-jYHkQ"
                                                    className="style-jYHkQ"
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
                                            ///demo/static/media/pic2.41901b5ddf88e968cdef.//"
                                            alt="card_pic2"
                                        />
                                        <div className="media-body">
                                            <h5 className="mb-sm-4 mb-3">
                                                <a
                                                    className="text-black"
                                                    href="/react/demo/analytics/ecom-product-detail"
                                                >
                                                    Mozarella Pizza with Random Topping
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
                                            <div className="donught-chart style-tDpCC" id="style-tDpCC">
                                                <canvas
                                                    role="img"
                                                    height={150}
                                                    width={150}
                                                    id="style-qnohf"
                                                    className="style-qnohf"
                                                ></canvas>
                                            </div>
                                            <small>85%</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="media mb-4 align-items-center">
                                        <img
                                            className="rounded mr-3 food-img"
                                            ///demo/static/media/pic8.3b1f317a5d1fc339cc2e.//"
                                            alt="card_pic8"
                                        />
                                        <div className="media-body">
                                            <h5 className="mb-sm-4 mb-3">
                                                <a
                                                    className="text-black"
                                                    href="/react/demo/analytics/ecom-product-detail"
                                                >
                                                    Extreme Deluxe Pizza Super With Mozarella
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
                                            <div className="donught-chart style-Aylxj" id="style-Aylxj">
                                                <canvas
                                                    role="img"
                                                    height={150}
                                                    width={150}
                                                    id="style-z9hfL"
                                                    className="style-z9hfL"
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
                                            <div className="donught-chart style-ET2RG" id="style-ET2RG">
                                                <canvas
                                                    role="img"
                                                    height={150}
                                                    width={150}
                                                    id="style-jZ14R"
                                                    className="style-jZ14R"
                                                ></canvas>
                                            </div>
                                            <small>52%</small>
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
                                            <div className="donught-chart style-REGJ4" id="style-REGJ4">
                                                <canvas
                                                    role="img"
                                                    height={150}
                                                    width={150}
                                                    id="style-gnfBZ"
                                                    className="style-gnfBZ"
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
                                            ///demo/static/media/pic9.caa7db1011fab0d40c82.//"
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
                                            ///demo/static/media/pic8.3b1f317a5d1fc339cc2e.//"
                                            alt="card_pic8"
                                        />
                                        <div className="media-body">
                                            <h5 className="mb-sm-4 mb-3">
                                                <a
                                                    className="text-black"
                                                    href="/react/demo/analytics/ecom-product-detail"
                                                >
                                                    Extreme Deluxe Pizza Super With Mozarella
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
                            <div className="row">
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
                                            <div className="donught-chart style-whD9E" id="style-whD9E">
                                                <canvas
                                                    role="img"
                                                    height={150}
                                                    width={150}
                                                    id="style-BMQKC"
                                                    className="style-BMQKC"
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
                                            ///demo/static/media/pic9.caa7db1011fab0d40c82.//"
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
                                            <div className="donught-chart style-o7hoh" id="style-o7hoh">
                                                <canvas
                                                    role="img"
                                                    height={150}
                                                    width={150}
                                                    id="style-SIg8L"
                                                    className="style-SIg8L"
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
                                            <div className="donught-chart style-Wkcj7" id="style-Wkcj7">
                                                <canvas
                                                    role="img"
                                                    height={150}
                                                    width={150}
                                                    id="style-Czo4z"
                                                    className="style-Czo4z"
                                                ></canvas>
                                            </div>
                                            <small>52%</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer border-0">
                    <nav>
                        <ul className="pagination style-1 mb-0">
                            <li className="page-item page-indicator">
                                <a className="page-link" href="/react/demo/analytics">
                                    <i className="la la-angle-left"></i>
                                </a>
                            </li>
                            <li>
                                <ul>
                                    <li className="page-item active">
                                        <a className="page-link" href="/react/demo/analytics">
                                            1
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="/react/demo/analytics">
                                            2
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="/react/demo/analytics">
                                            3
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="/react/demo/analytics">
                                            4
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="page-item page-indicator">
                                <a className="page-link" href="/react/demo/analytics">
                                    <i className="la la-angle-right"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

function RecipeCard({ title, img, calories, protein, carbs, fat }) {

    return (

        <div className="media mb-4 align-items-center">
            <img
                className="rounded mr-3 food-img"
                src={`${img}`}
                alt="card_pic4"
            />
            <div className="media-body">
                <h5 className="mb-sm-4 mb-3">
                    <a
                        className="text-black"
                        href="/react/demo/analytics/ecom-product-detail"
                    >
                        {title}
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
                        <strong className="mr-1">{calories}</strong>
                        Total Calories
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
                <div className="donught-chart style-KW4gD" id="style-KW4gD">
                    <canvas
                        role="img"
                        height={150}
                        width={150}
                        id="style-BfZ4o"
                        className="style-BfZ4o"
                    ></canvas>
                </div>
                <small>75%</small>
            </div>
        </div>

    )
}
