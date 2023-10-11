const useState = React.useState;
const ReactDOM = window.ReactDOM;
const Button = ReactBootstrap.Button;
const Modal = ReactBootstrap.Modal;
const useEffect = React.useEffect
const Tab = ReactBootstrap.Tab
const Tabs = ReactBootstrap.Tabs
const Spinner = ReactBootstrap.Spinner
const Alert = ReactBootstrap.Alert
const Dropdown = ReactBootstrap.Dropdown
const DropdownButton = ReactBootstrap.DropdownButton

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function LoginPage(props) {
    const [fname, setFname] = React.useState("");
    const [lname, setLname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [conEmail, setConEmail] = React.useState("");
    const [conPassword, setConPassword] = React.useState("");

    const handleSignUp = (evt) => {
        evt.preventDefault();
        const formData = {
            fname: fname,
            lname: lname,
            email: email,
            password: password
        }
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(result => { alert(result.status); });
    };

    const handleSignIn = (evt) => {
        evt.preventDefault();
        const formData = {
            email: conEmail,
            password: conPassword,
        };

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    window.location.href = "/home";
                }
            })
    }

    const switchTab = () => {

        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        container.classList.add("right-panel-active");

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }
    return (

        <div className="wrapper3">
            <img src="img/backdrop.jpg" alt="" />
            <div>
                <h1 className="title">NutriFit</h1>
            </div>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSignUp}>
                        <h1>Create Account</h1>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="First Name" name="fname" value={fname} required onChange={(evt) => setFname(evt.target.value)} />
                        <input type="text" placeholder="Last Name" name="lname" value={lname} required onChange={(evt) => setLname(evt.target.value)} />
                        <input type="email" placeholder="Email" name="email" value={email} required onChange={(evt) => setEmail(evt.target.value)} />
                        <input type="password" placeholder="Password" name="password" value={password} required onChange={(evt) => setPassword(evt.target.value)} />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={handleSignIn}>
                        <h1>Sign In</h1>
                        <span>or use your account</span>
                        <input type="email" placeholder="Email" name="email" value={conEmail} required onChange={(evt) => setConEmail(evt.target.value)} />
                        <input type="password" placeholder="Password" name="password" value={conPassword} required onChange={(evt) => setConPassword(evt.target.value)} />
                        <a href="#">Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To stay connected with us, please login with your personal info</p>
                            <button className="ghost" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Sign up</h1>
                            <p>Create an account to get started</p>
                            <button onClick={switchTab} className="ghost" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HomePage() {

    const [savedRecipes, setSavedRecipes] = useState([])

    const fetchSavedRecipes = () => {
        fetch("/get_saved_recipes")
            .then((response) => response.json())
            .then((data) => {
                setSavedRecipes(data);
            })
    };

    useEffect(() => {
        fetchSavedRecipes();
    }, []);



    const [userStats, setUserStats] = useState({});
    const [tabValue, setTabValue] = useState("recipes")
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState(null)

    useEffect(() => {
        fetch("/get_stats")
            .then((response) => response.json())
            .then((data) => {
                setUserStats(data);
                setLoading(false)
            });
    }, []);

    useEffect(() => {
        fetch("/get_name")
            .then((response) => response.json())
            .then((data) => {
                setName(data.first_name);
            });
    }, []);

    const fetchUserStats = () => {
        fetch("/get_stats")
            .then((response) => response.json())
            .then((data) => {
                setUserStats(data);
            })
            .finally(() => {
                setLoading(false)
            });
    };

    const handleLogout = async () => {
        await fetch('/logout', { method: 'GET', credentials: 'include' });
        window.location.href = '/';
    }

    return (
        <React.Fragment>
            <div>
                <div className="header-content snipcss-BMbif">
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse justify-content-between">
                            <div className="header-left">
                                <div className="dashboard_bar style-RA64s" id="style-RA64s" style={{ fontSize: "41px", marginLeft: "-38px" }}>
                                    NutriFit
                                </div>
                            </div>
                            <ul className="navbar-nav header-right">
                                <li className="nav-item dropdown header-profile dropdown">
                                    <a
                                        className="nav-link  i-false p-0c-pointer pointr dropdown-toggle"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        to="#"
                                        variant=""
                                    >
                                        <img
                                            src="static/img/user.png"
                                            width={20}
                                            alt="profile"
                                        />
                                        <div className="header-info">
                                            <DropdownButton title={<strong style={{marginLeft:"-25px"}}>{name}</strong>} id="dropdown-menu-align-right">
                                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                            </DropdownButton>
                                            <p className="fs-12 mb-0">Demo User</p>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="cards">
                    <div className="row">
                        <Card value={`${userStats.calorie_intake}cal`} label="Calorie Budget" loading={loading} />
                        <Card value={`${userStats.protein_intake}g`} label="Protein" loading={loading} />
                        <Card value={`${userStats.carbs_intake}g`} label="Carbohydrates" loading={loading} />
                        <Card value={`${userStats.fat_intake}g`} label="Fat" loading={loading} />
                    </div>
                </div>
                <div className="Form" style={{ marginTop: "-35px" }}>
                    <StatsForm fetchStats={fetchUserStats} userStats={userStats} />
                </div>

                <div className="card-action card-tabs mt-3 mt-3 mt-lg-0">
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                        activeKey={tabValue}
                        onSelect={(key) => setTabValue(key)}
                    >
                        <Tab eventKey="recipes" title="Recipes For You">
                        </Tab>
                        <Tab eventKey="restaurants" title="Healthy Restaurants Map">
                        </Tab>
                    </Tabs>
                </div>
                {tabValue === "recipes" && (
                    <div className="Section1">
                        <div className="RecipeDash">
                            <RecipeDash
                                userStatsCalories={userStats.calorie_intake}
                                fetchSavedRecipes={fetchSavedRecipes}>
                            </RecipeDash>
                        </div>
                        <div className="Favorites">
                            <Favorites fetchSavedRecipes={fetchSavedRecipes}
                                savedRecipes={savedRecipes}>
                            </Favorites>
                        </div>
                    </div>
                )}

                {tabValue === "restaurants" && (
                    <div className="Restaurants">
                        <div className="GoogleMaps">
                            <RestaurantView>
                            </RestaurantView>
                        </div>
                    </div>
                )}





            </div>
        </React.Fragment>
    );

}


const Card = ({ value, label, loading }) => (
    <div className="col-xl-3 col-xxl-6 col-sm-6 snipcss-klI8l">
        <div className="card grd-card">
            <div className="card-body snipcss0-0-0-1">
                <div className="media align-items-center snipcss0-1-1-2">
                    <div className="media-body mr-2 snipcss0-2-2-3">
                        {loading ? (<>
                            <Spinner animation="border" />
                        </>
                        ) : (
                            <div>
                                <h2 className="text-white font-w600 snipcss0-3-3-4">{value}</h2>
                                <span className="text-white snipcss0-3-3-5">{label}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

function StatsForm({ fetchStats, userStats }) {
    const [show, setShow] = useState(false);
    const [birthDate, setBirthDate] = useState("MM/DD/YYYY");
    const [height, setHeight] = useState("Height in cm");
    const [weight, setWeight] = useState("Weight in kg");
    const [gender, setGender] = useState("");
    const [activityLevel, setActivityLevel] = useState("");
    const [goal, setGoal] = useState("");
    const [pace, setPace] = useState("");
    const [alert, setAlert] = useState(null)

    const fetchFormStats = () => {
        fetch("/get_form_stats")
            .then((response) => response.json())
            .then((data) => {
                setBirthDate(data["bday"])
                setHeight(data["height"]);
                setWeight(data["weight"])
                setGender(data["gender"])
                setActivityLevel(data["activityLevel"])
                setGoal(data["fitGoal"])
                setPace(data["weightGoal"])
            })
    };


    useEffect(() => {
        fetchFormStats();
    }, [])

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const formData = {
            bday: birthDate,
            height: height,
            weight: weight,
            gender: gender,
            activity_level: activityLevel,
            fit_goal: pace,
            weight_goal: goal
        };
        fetch("/update_stats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
        fetchStats();
        fetchStats();
        setShow(false)
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <div className="row">
                <div className="col-lg-6">
                    <Button variant="primary" onClick={handleShow}>
                        My Fitness Goals
                    </Button>
                </div>
                <div className="col-lg-6" style={{ right: '42%', maxWidth: '15%' }}>
                    {birthDate === "MM/DD/YYYY" &&
                        (<div className="flash-alert"><Alert style={{ borderColor: 'pink', backgroundColor: 'pink' }} variant='warning'>{<i className="fa-solid fa-arrow-left fa-xl" style={{ color: 'black' }} />}  <b style={{ color: 'black' }}>Please enter your fitness goals!</b></Alert>
                        </div>)}
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>My Goals</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-xl-0 col-lg-12 snipcss-7jYH5">
                        <div className="card">
                            <div className="card-body">
                                <div className="basic-form">
                                    <form onSubmit={handleSubmit}>
                                        <FormGroup label="Birthdate" inputType="date" placeholderMark={birthDate} value={birthDate}
                                            evtChanger={setBirthDate} defaultValue={birthDate} />
                                        <FormGroup label="Height" inputType="number" placeholderMark={height} value={height}
                                            evtChanger={setHeight} />
                                        <FormGroup label="Weight" inputType="number" placeholderMark={weight} value={weight}
                                            evtChanger={setWeight} />

                                        <RadioGroup label="Gender" options={['Male', 'Female']} value={gender} defaultValue={gender}
                                            evtChanger={setGender} />
                                        <RadioGroup label="Activity Level" options={['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extra Active']} value={activityLevel}
                                            defaultValue={activityLevel} evtChanger={setActivityLevel} />
                                        <RadioGroup label="Goal" options={['Maintain Weight', 'Lose Weight', 'Gain Weight']} value={pace}
                                            defaultValue={pace} evtChanger={setPace} />
                                        {(pace === "Lose Weight" || pace === "Gain Weight") &&
                                            <RadioGroup label="Choose your pace" options={['Slow', 'Fast']} value={goal}
                                                defaultValue={goal} evtChanger={setGoal} />
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function FormGroup({ label, inputType, placeholderMark, evtChanger, defaultValue }) {
    return (
        <div className="form-group row">
            <label className="col-sm-3 col-form-label">{label}</label>
            <div className="col-sm-9">
                <input type={inputType} className="form-control" placeholder={placeholderMark}
                    onChange={(evt) => evtChanger(evt.target.value)}
                    defaultValue={defaultValue} />
            </div>
        </div>

    )

}

const RadioGroup = ({ label, options, defaultValue, evtChanger }) => {
    return (
        <fieldset className="form-group">
            <div className="row">
                <label className="col-form-label col-sm-3 pt-0">{label}</label>
                <div className="col-sm-9">
                    {options.map((option, index) => (
                        <div className="form-check" key={index}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name={label}
                                value={option}
                                checked={option === defaultValue}
                                onChange={(evt) => evtChanger(evt.target.value)}
                            />
                            <label className="form-check-label">{option}</label>
                        </div>
                    ))}
                </div>
            </div>
        </fieldset>
    );
};

const FadeInDiv = ({ children }) => {
    const [showDiv, setShowDiv] = useState(false);
    React.useEffect(() => {
        setShowDiv(true);
    }, []);

    return (
        <div className={showDiv ? 'fadeIn' : 'fadeOut'}>
            {children}
        </div>
    );
};


