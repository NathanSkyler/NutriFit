function Favorites() {
    return (
        <div>
            <div className="card trending-menus snipcss-NvKfM">
                <div className="card-header d-sm-flex d-block pb-0 border-0">
                    <div>
                        <h4 className="text-black fs-20">Daily Trending Menus</h4>
                        <p className="fs-13 mb-0 text-black">Lorem ipsum dolor</p>
                    </div>
                </div>
                <div className="card-body dz-scroll height500" id="dailyMenus">
                    <FavoriteRecipe></FavoriteRecipe>
                </div>
                <div className="card-footer border-0 pt-0"></div>
            </div>

        </div>
    )
}

function FavoriteRecipe() {

    return (
        <div className="d-flex pb-3 mb-3 border-bottom tr-row align-items-center">
            <span className="num">#1</span>
            <div className="mr-auto pr-3">
                <a href="/react/demo/analytics/post-details">
                    <h2 className="text-black fs-14">Medium Spicy Spagethi Italiano</h2>
                </a>
                <span className="text-black font-w600 d-inline-block mr-3">$5.6</span>
                <span className="fs-14">Order 89x</span>
            </div>
            <img
                src="data:image/png;base64,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"
                alt="menu9"
                width={60}
                className="rounded"
            />
        </div>
    )
}