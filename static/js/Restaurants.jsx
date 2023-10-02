function RestaurantView() {
    const [yelpData, setYelpData] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [zipCode, setZipCode] = useState(null);


    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setUserLocation({ latitude, longitude });
            });
        }
    }, []);

    useEffect(() => {
        if (userLocation) {
            const locationData = {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
            };
            fetch('/get_yelp_results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(locationData),
            })
                .then((response) => response.json())
                .then((data) => {
                    setYelpData(data);
                });
        }
    }, [userLocation]);

    useEffect(() => {
        if (yelpData.length > 0 && userLocation) {
            initMap(yelpData, userLocation);
        }
    }, [yelpData, userLocation]);

    const sumbitLocation = (evt) => {
        evt.preventDefault();
        const zipCodeData = {
            zipCode: zipCode,
        };
        console.log(zipCodeData)
        fetch('/get_yelp_results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(zipCodeData),
        })
            .then((response) => response.json())
            .then((data) => {
                setYelpData(data.yelpResults);
                setUserLocation({ latitude: data.latitude, longitude: data.longitude });
            });
    }

    // Google Map

    function initMap(yelpData, userLocation) {
        const currentLocation = {
            lat: userLocation.latitude,
            lng: userLocation.longitude,
        };

        const map = new google.maps.Map(document.getElementById('map'), {
            center: currentLocation,
            zoom: 11,
        });

        const userMarker = new google.maps.Marker({
            position: currentLocation,
            title: 'Your Location',
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new google.maps.Size(40, 40),
            },
            map: map,
            zIndex: 1000,
        });

        let currentInfoWindow = null;

        yelpData.forEach((restaurant) => {
            const marker = new google.maps.Marker({
                position: { lat: restaurant.latitude, lng: restaurant.longitude },
                title: restaurant.Name,
                map: map,
            });

            const markerInfoWindow = new google.maps.InfoWindow({
                content: `        <div class="info-window">
                <h4 class="info-window-title">${restaurant.Name}</h4>
                <p class="info-window-address">${restaurant.Address}</p>
                <div class="info-window-image">
                    <img src="${restaurant.ImageUrl}" alt="${restaurant.Name}" />
                </div>
            </div>`,
            });

            const buttons = document.querySelectorAll(`.restaurants[data-restaurant-id="${restaurant.Id}"]`);

            for (const button of buttons) {
                button.addEventListener('mouseover', () => {
                    const restaurantId = button.getAttribute('data-restaurant-id');
                    setSelectedRestaurant(restaurantId);

                    if (currentInfoWindow) {
                        currentInfoWindow.close();
                    }
                    markerInfoWindow.open(map, marker);
                    currentInfoWindow = markerInfoWindow;
                });
            }

            marker.addListener('mouseover', () => {
                setSelectedRestaurant(restaurant);

                if (currentInfoWindow) {
                    currentInfoWindow.close();
                }
                markerInfoWindow.open(map, marker);
                currentInfoWindow = markerInfoWindow;
            });
        });
    }

    return (
        <div>
            <div className="card trending-menus snipcss-NvKfM">
                <div className="restaurantView">
                    <div className="card-header restaurants d-sm-flex d-block pb-0 border-0">
                        <div>
                            <Restaurants
                                yelpData={yelpData}
                                selectedRestaurant={selectedRestaurant}
                                setSelectedRestaurant={setSelectedRestaurant}>
                            </Restaurants>
                        </div>
                    </div>
                    <div className="card-body restaurants dz-scroll" id="dailyMenus">
                        <h4 className="text-black fs-20">Local Map</h4>
                        <p className="fs-13 mb-0 text-black">Healthy Restaurants Near You!</p>
                        <div id="map" style={{ height: '700px', width: '100%' }}></div>
                        <SearchBar
                            sumbitLocation={sumbitLocation}
                            setZipCode={setZipCode}
                            zipCode={zipCode}>
                        </SearchBar>
                    </div>
                    <div className="card-footer border-0 pt-0"></div>
                </div>
            </div>
        </div>
    );
}


function Restaurants({ yelpData, selectedRestaurant, setSelectedRestaurant }) {

    function handleRestaurantCardClick(restaurant) {
        setSelectedRestaurant(restaurant);
    }
    return (
        <div>
            <div className="card restaurants-results">
                <div className="card-header d-sm-flex d-block pb-0 border-0">
                    <div>
                        <h4 className="text-black fs-20">Healthy Restaurants</h4>
                        <p className="fs-13 mb-0 text-black">Scroll to see more!</p>
                    </div>
                </div>
                <div className="card-body dz-scroll" id="dailyMenus">
                    {Array.isArray(yelpData) && yelpData.map((restaurant) => (
                        <div className={`restaurants ${selectedRestaurant &&
                            selectedRestaurant.Id === restaurant.Id ? 'selected' : ''}`} key={restaurant.Id} data-restaurant-id={restaurant.Id} onClick={() => handleRestaurantCardClick(restaurant)}>
                            <RestaurantCard
                                name={restaurant.Name}
                                address={restaurant.Address}
                                categories={restaurant.Categories.join(', ')}
                                imageUrl={restaurant.ImageUrl}
                                rating={restaurant.Rating}
                                url={restaurant.url}
                            />
                        </div>
                    ))}
                </div>
                <div className="card-footer border-0 pt-0"></div>
            </div>

        </div>
    )
}

function RestaurantCard({ key, name, address, categories, imageUrl, rating, url }) {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div>
            <button className="RestaurantButton" onClick={handleShow}>
                <div className="d-flex pb-3 mb-3 border-bottom tr-row align-items-center">
                    <div className="{id}">
                        <h2 className="text-black fs-14">{name}</h2>
                        <ul>
                            <li className="fs-14 text-black">
                                <strong className="mr-1">{address}</strong>

                            </li>
                            <li className="fs-14 text-black">
                                <strong className="mr-1">{categories}</strong>
                            </li>
                            <li className="fs-14 text-black">
                                <strong className="mr-1">{rating}</strong>
                                Star Rating
                            </li>
                        </ul>
                    </div>
                    <img
                        src={`${imageUrl}`}
                        alt="menu9"
                        width={60}
                        className="rounded"
                    />
                </div>
            </button>
            {show && <RestaurantModal handleClose={handleClose} show={show} url={url}
            ></RestaurantModal>}
        </div>
    )
}

function RestaurantModal({ handleClose, show, url }) {

    return (
        <>
            <Modal size="xl" show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Yelp Info</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: 0 }}><iframe src={url} frameborder="0" scrolling="yes"></iframe></Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function SearchBar({ sumbitLocation, setZipCode }) {

    const handleZipCodeChange = (evt) => {
        setZipCode(evt.target.value);
    };

    return (
        <div id="cover">
            <form className="searchForm" onSubmit={sumbitLocation}>
                <div className="tb">
                    <div className="td">
                        <input
                            className="searchInput"
                            type="text"
                            placeholder="Zipcode Search"
                            onChange={handleZipCodeChange}
                            required
                        />
                    </div>
                    <div className="td" id="s-cover">
                        <button className="searchButton" type="submit">
                            <div id="s-circle"></div>
                            <span></span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}