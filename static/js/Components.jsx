

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
        console.log(formData)
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
                            <button className="ghost" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HomePage() {

    return (
        <React.Fragment>
        <div>
            <div className="header-content snipcss-BMbif">
                <nav className="navbar navbar-expand">
                    <div className="collapse navbar-collapse justify-content-between">
                        <div className="header-left">
                            <div className="dashboard_bar style-RA64s" id="style-RA64s">
                                NutriFit
                            </div>
                        </div>
                        <ul className="navbar-nav header-right">
                            <li className="nav-item">
                                <div className="input-group search-area d-xl-inline-flex d-none">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search here..."
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <a href="/react/demo">
                                                <i className="flaticon-381-search-2"></i>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item dropdown notification_dropdown dropdown">
                                <a
                                    className="nav-link  ai-icon i-false dropdown-toggle"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    variant=""
                                    href="#"
                                    role="button"
                                    data-toggle="dropdown"
                                >
                                    <svg
                                        width={28}
                                        height={28}
                                        viewBox="0 0 28 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M21.75 14.8385V12.0463C21.7471 9.88552 20.9385 7.80353 19.4821 6.20735C18.0258 4.61116 16.0264 3.61555 13.875 3.41516V1.625C13.875 1.39294 13.7828 1.17038 13.6187 1.00628C13.4546 0.842187 13.2321 0.75 13 0.75C12.7679 0.75 12.5454 0.842187 12.3813 1.00628C12.2172 1.17038 12.125 1.39294 12.125 1.625V3.41534C9.97361 3.61572 7.97429 4.61131 6.51794 6.20746C5.06159 7.80361 4.25291 9.88555 4.25 12.0463V14.8383C3.26257 15.0412 2.37529 15.5784 1.73774 16.3593C1.10019 17.1401 0.751339 18.1169 0.75 19.125C0.750764 19.821 1.02757 20.4882 1.51969 20.9803C2.01181 21.4724 2.67904 21.7492 3.375 21.75H8.71346C8.91521 22.738 9.45205 23.6259 10.2331 24.2636C11.0142 24.9013 11.9916 25.2497 13 25.2497C14.0084 25.2497 14.9858 24.9013 15.7669 24.2636C16.548 23.6259 17.0848 22.738 17.2865 21.75H22.625C23.321 21.7492 23.9882 21.4724 24.4803 20.9803C24.9724 20.4882 25.2492 19.821 25.25 19.125C25.2486 18.117 24.8998 17.1402 24.2622 16.3594C23.6247 15.5786 22.7374 15.0414 21.75 14.8385ZM6 12.0463C6.00232 10.2113 6.73226 8.45223 8.02974 7.15474C9.32723 5.85726 11.0863 5.12732 12.9212 5.125H13.0788C14.9137 5.12732 16.6728 5.85726 17.9703 7.15474C19.2677 8.45223 19.9977 10.2113 20 12.0463V14.75H6V12.0463ZM13 23.5C12.4589 23.4983 11.9316 23.3292 11.4905 23.0159C11.0493 22.7026 10.716 22.2604 10.5363 21.75H15.4637C15.284 22.2604 14.9507 22.7026 14.5095 23.0159C14.0684 23.3292 13.5411 23.4983 13 23.5ZM22.625 20H3.375C3.14298 19.9999 2.9205 19.9076 2.75644 19.7436C2.59237 19.5795 2.50014 19.357 2.5 19.125C2.50076 18.429 2.77757 17.7618 3.26969 17.2697C3.76181 16.7776 4.42904 16.5008 5.125 16.5H20.875C21.571 16.5008 22.2382 16.7776 22.7303 17.2697C23.2224 17.7618 23.4992 18.429 23.5 19.125C23.4999 19.357 23.4076 19.5795 23.2436 19.7436C23.0795 19.9076 22.857 19.9999 22.625 20Z"
                                            fill="#4C8147"
                                        ></path>
                                    </svg>
                                    <span className="badge light text-white bg-primary rounded-circle">
                                        12
                                    </span>
                                </a>
                            </li>
                            <li className="nav-item dropdown notification_dropdown dropdown">
                                <a
                                    className="nav-link bell bell-link i-false pointr dropdown-toggle"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    variant=""
                                >
                                    <svg
                                        width={28}
                                        height={28}
                                        viewBox="0 0 28 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M22.4604 3.84888H5.31685C4.64745 3.84961 4.00568 4.11586 3.53234 4.58919C3.059 5.06253 2.79276 5.7043 2.79202 6.3737V18.1562C2.79276 18.8256 3.059 19.4674 3.53234 19.9407C4.00568 20.4141 4.64745 20.6803 5.31685 20.6811C5.54002 20.6812 5.75401 20.7699 5.91181 20.9277C6.06961 21.0855 6.15832 21.2995 6.15846 21.5227V23.3168C6.15846 23.6215 6.24115 23.9204 6.39771 24.1818C6.55427 24.4431 6.77882 24.6571 7.04744 24.8009C7.31605 24.9446 7.61864 25.0128 7.92295 24.9981C8.22726 24.9834 8.52186 24.8863 8.77536 24.7173L14.6173 20.8224C14.7554 20.7299 14.9179 20.6807 15.0841 20.6811H19.187C19.7383 20.68 20.2743 20.4994 20.7137 20.1664C21.1531 19.8335 21.472 19.3664 21.6222 18.8359L24.8965 7.05011C24.9999 6.67481 25.0152 6.28074 24.9413 5.89856C24.8675 5.51637 24.7064 5.15639 24.4707 4.84663C24.235 4.53687 23.9309 4.28568 23.5823 4.11263C23.2336 3.93957 22.8497 3.84931 22.4604 3.84888ZM23.2733 6.60304L20.0006 18.3847C19.95 18.5614 19.8432 18.7168 19.6964 18.8275C19.5496 18.9381 19.3708 18.9979 19.187 18.9978H15.0841C14.5856 18.9972 14.0981 19.1448 13.6836 19.4219L7.84168 23.3168V21.5227C7.84094 20.8533 7.5747 20.2115 7.10136 19.7382C6.62802 19.2648 5.98625 18.9986 5.31685 18.9978C5.09368 18.9977 4.87969 18.909 4.72189 18.7512C4.56409 18.5934 4.47537 18.3794 4.47524 18.1562V6.3737C4.47537 6.15054 4.56409 5.93655 4.72189 5.77874C4.87969 5.62094 5.09368 5.53223 5.31685 5.5321H22.4604C22.5905 5.53243 22.7188 5.56277 22.8352 5.62076C22.9517 5.67875 23.0532 5.76283 23.1318 5.86646C23.2105 5.97008 23.2641 6.09045 23.2887 6.21821C23.3132 6.34597 23.3079 6.47766 23.2733 6.60304Z"
                                            fill="#4C8147"
                                        ></path>
                                        <path
                                            d="M7.84167 11.4233H12.0497C12.2729 11.4233 12.487 11.3347 12.6448 11.1768C12.8027 11.019 12.8913 10.8049 12.8913 10.5817C12.8913 10.3585 12.8027 10.1444 12.6448 9.98661C12.487 9.82878 12.2729 9.74011 12.0497 9.74011H7.84167C7.61846 9.74011 7.4044 9.82878 7.24656 9.98661C7.08873 10.1444 7.00006 10.3585 7.00006 10.5817C7.00006 10.8049 7.08873 11.019 7.24656 11.1768C7.4044 11.3347 7.61846 11.4233 7.84167 11.4233Z"
                                            fill="#4C8147"
                                        ></path>
                                        <path
                                            d="M15.4162 13.1066H7.84167C7.61846 13.1066 7.4044 13.1952 7.24656 13.3531C7.08873 13.5109 7.00006 13.725 7.00006 13.9482C7.00006 14.1714 7.08873 14.3855 7.24656 14.5433C7.4044 14.7011 7.61846 14.7898 7.84167 14.7898H15.4162C15.6394 14.7898 15.8534 14.7011 16.0113 14.5433C16.1691 14.3855 16.2578 14.1714 16.2578 13.9482C16.2578 13.725 16.1691 13.5109 16.0113 13.3531C15.8534 13.1952 15.6394 13.1066 15.4162 13.1066Z"
                                            fill="#4C8147"
                                        ></path>
                                    </svg>
                                    <span className="badge light text-white bg-primary rounded-circle">
                                        5
                                    </span>
                                </a>
                            </li>
                            <li className="nav-item dropdown notification_dropdown dropdown">
                                <a
                                    className="nav-link i-false pointr dropdown-toggle"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    variant=""
                                    data-toggle="dropdown"
                                >
                                    <svg
                                        width={28}
                                        height={28}
                                        viewBox="0 0 28 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M22.625 5.125H21.75V1.625C21.75 1.47262 21.7102 1.32289 21.6345 1.19062C21.5589 1.05835 21.45 0.948128 21.3186 0.870868C21.1873 0.793609 21.0381 0.751989 20.8857 0.750126C20.7333 0.748264 20.5831 0.786224 20.4499 0.86025L13 4.99909L5.55007 0.86025C5.41688 0.786224 5.26667 0.748264 5.11431 0.750126C4.96194 0.751989 4.8127 0.793609 4.68136 0.870868C4.55002 0.948128 4.44113 1.05835 4.36547 1.19062C4.28981 1.32289 4.25001 1.47262 4.25 1.625V5.125H3.375C2.67904 5.12576 2.01181 5.40257 1.51969 5.89469C1.02757 6.3868 0.750764 7.05404 0.75 7.75V10.375C0.750764 11.071 1.02757 11.7382 1.51969 12.2303C2.01181 12.7224 2.67904 12.9992 3.375 13H4.25V22.625C4.25076 23.321 4.52757 23.9882 5.01969 24.4803C5.51181 24.9724 6.17904 25.2492 6.875 25.25H19.125C19.821 25.2492 20.4882 24.9724 20.9803 24.4803C21.4724 23.9882 21.7492 23.321 21.75 22.625V13H22.625C23.321 12.9992 23.9882 12.7224 24.4803 12.2303C24.9724 11.7382 25.2492 11.071 25.25 10.375V7.75C25.2492 7.05404 24.9724 6.3868 24.4803 5.89469C23.9882 5.40257 23.321 5.12576 22.625 5.125ZM20 5.125H16.3769L20 3.1125V5.125ZM6 3.1125L9.62311 5.125H6V3.1125ZM6 22.625V13H12.125V23.5H6.875C6.64303 23.4997 6.42064 23.4074 6.25661 23.2434C6.09258 23.0793 6.0003 22.857 6 22.625ZM20 22.625C19.9997 22.857 19.9074 23.0793 19.7434 23.2434C19.5794 23.4074 19.357 23.4997 19.125 23.5H13.875V13H20V22.625ZM23.5 10.375C23.4997 10.607 23.4074 10.8294 23.2434 10.9934C23.0794 11.1574 22.857 11.2497 22.625 11.25H3.375C3.14303 11.2497 2.92064 11.1574 2.75661 10.9934C2.59258 10.8294 2.5003 10.607 2.5 10.375V7.75C2.5003 7.51803 2.59258 7.29564 2.75661 7.13161C2.92064 6.96758 3.14303 6.8753 3.375 6.875H22.625C22.857 6.8753 23.0794 6.96758 23.2434 7.13161C23.4074 7.29564 23.4997 7.51803 23.5 7.75V10.375Z"
                                            fill="#4C8147"
                                        ></path>
                                    </svg>
                                    <span className="badge light text-white bg-primary rounded-circle">
                                        2
                                    </span>
                                </a>
                            </li>
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
                                        <span className="text-black">
                                            <strong>Nathan</strong>
                                        </span>
                                        <p className="fs-12 mb-0">Test User</p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className="cards">
                <div className="row">
                    <div className="col-xl-3 col-xxl-6 col-sm-6 snipcss-klI8l">
                        <div className="card grd-card">
                            <div className="card-body snipcss0-0-0-1">
                                <div className="media align-items-center snipcss0-1-1-2">
                                    <div className="media-body mr-2 snipcss0-2-2-3">
                                        <h2 className="text-white font-w600 snipcss0-3-3-4">3000 cal</h2>
                                        <span className="text-white snipcss0-3-3-5">Calorie Budget</span>
                                    </div>
                                    <div className="d-inline-block position-relative donut-chart-sale snipcss0-2-2-6">
                                        <div
                                            className="donught-chart snipcss0-3-6-7 style-xrPbP"
                                            id="style-xrPbP"
                                        >
                                            <canvas
                                                role="img"
                                                height={187}
                                                width={187}
                                                className="snipcss0-4-7-8 style-ibt72"
                                                id="style-ibt72"
                                            ></canvas>
                                        </div>
                                        <small className="text-primary snipcss0-3-6-9">
                                            <svg
                                                width={30}
                                                height={30}
                                                viewBox="0 0 30 30"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="snipcss0-4-9-10"
                                            >
                                                <g clipPath="url(#clip0)" className="snipcss0-5-10-11">
                                                    <path
                                                        d="M30 7.03697H21.4497V1.75781H27.7137V0H19.6918V7.03697H11.1417V12.3132H12.9572L13.1193 14.7549H8.50227C5.03494 14.7549 2.17072 17.3859 1.80038 20.7561C0.75531 21.1073 0 22.0953 0 23.2571C0 24.4244 0.762405 25.4164 1.81526 25.7632C2.1769 28.1582 4.24873 30 6.74286 30H27.0115L28.1845 12.3132H30V7.03697ZM8.50227 16.5127H16.2202C18.669 16.5127 20.7097 18.2881 21.1263 20.6188H3.59619C4.01276 18.2881 6.05324 16.5127 8.50227 16.5127ZM2.63809 22.3766H22.0841C22.5696 22.3766 22.9646 22.7717 22.9646 23.2569C22.9646 23.7424 22.5696 24.1372 22.0841 24.1372H2.63809C2.15263 24.1372 1.75781 23.7424 1.75781 23.2569C1.75781 22.7717 2.15263 22.3766 2.63809 22.3766ZM6.74286 28.2422C5.26886 28.2422 4.02351 27.2479 3.63968 25.8952H21.0825C20.6989 27.2479 19.4536 28.2422 17.9794 28.2422H6.74286ZM25.3665 28.2422H21.7738C22.3618 27.5517 22.7655 26.7002 22.907 25.7632C23.9598 25.4164 24.7224 24.4244 24.7224 23.2571C24.7224 22.0953 23.9671 21.1073 22.9221 20.7561C22.5517 17.3859 19.6877 14.7549 16.2202 14.7549H14.881L14.7189 12.3132H26.4228L25.3665 28.2422ZM28.2422 10.5553H12.8996V8.79478H28.2422V10.5553Z"
                                                        fill="#EA7A9A"
                                                    ></path>
                                                </g>
                                                <defs className="snipcss0-5-10-12">
                                                    <clipPath id="clip0" className="snipcss0-6-12-13">
                                                        <rect width={30} height={30} fill="white"></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </small>
                                        <span className="circle bg-white snipcss0-3-6-14"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-xxl-6 col-sm-6 snipcss-klI8l">
                        <div className="card grd-card">
                            <div className="card-body snipcss0-0-0-1">
                                <div className="media align-items-center snipcss0-1-1-2">
                                    <div className="media-body mr-2 snipcss0-2-2-3">
                                        <h2 className="text-white font-w600 snipcss0-3-3-4">300g</h2>
                                        <span className="text-white snipcss0-3-3-5">Protein</span>
                                    </div>
                                    <div className="d-inline-block position-relative donut-chart-sale snipcss0-2-2-6">
                                        <div
                                            className="donught-chart snipcss0-3-6-7 style-xrPbP"
                                            id="style-xrPbP"
                                        >
                                            <canvas
                                                role="img"
                                                height={187}
                                                width={187}
                                                className="snipcss0-4-7-8 style-ibt72"
                                                id="style-ibt72"
                                            ></canvas>
                                        </div>
                                        <small className="text-primary snipcss0-3-6-9">
                                            <svg
                                                width={30}
                                                height={30}
                                                viewBox="0 0 30 30"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="snipcss0-4-9-10"
                                            >
                                                <g clipPath="url(#clip0)" className="snipcss0-5-10-11">
                                                    <path
                                                        d="M30 7.03697H21.4497V1.75781H27.7137V0H19.6918V7.03697H11.1417V12.3132H12.9572L13.1193 14.7549H8.50227C5.03494 14.7549 2.17072 17.3859 1.80038 20.7561C0.75531 21.1073 0 22.0953 0 23.2571C0 24.4244 0.762405 25.4164 1.81526 25.7632C2.1769 28.1582 4.24873 30 6.74286 30H27.0115L28.1845 12.3132H30V7.03697ZM8.50227 16.5127H16.2202C18.669 16.5127 20.7097 18.2881 21.1263 20.6188H3.59619C4.01276 18.2881 6.05324 16.5127 8.50227 16.5127ZM2.63809 22.3766H22.0841C22.5696 22.3766 22.9646 22.7717 22.9646 23.2569C22.9646 23.7424 22.5696 24.1372 22.0841 24.1372H2.63809C2.15263 24.1372 1.75781 23.7424 1.75781 23.2569C1.75781 22.7717 2.15263 22.3766 2.63809 22.3766ZM6.74286 28.2422C5.26886 28.2422 4.02351 27.2479 3.63968 25.8952H21.0825C20.6989 27.2479 19.4536 28.2422 17.9794 28.2422H6.74286ZM25.3665 28.2422H21.7738C22.3618 27.5517 22.7655 26.7002 22.907 25.7632C23.9598 25.4164 24.7224 24.4244 24.7224 23.2571C24.7224 22.0953 23.9671 21.1073 22.9221 20.7561C22.5517 17.3859 19.6877 14.7549 16.2202 14.7549H14.881L14.7189 12.3132H26.4228L25.3665 28.2422ZM28.2422 10.5553H12.8996V8.79478H28.2422V10.5553Z"
                                                        fill="#EA7A9A"
                                                    ></path>
                                                </g>
                                                <defs className="snipcss0-5-10-12">
                                                    <clipPath id="clip0" className="snipcss0-6-12-13">
                                                        <rect width={30} height={30} fill="white"></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </small>
                                        <span className="circle bg-white snipcss0-3-6-14"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-xxl-6 col-sm-6 snipcss-klI8l">
                        <div className="card grd-card">
                            <div className="card-body snipcss0-0-0-1">
                                <div className="media align-items-center snipcss0-1-1-2">
                                    <div className="media-body mr-2 snipcss0-2-2-3">
                                        <h2 className="text-white font-w600 snipcss0-3-3-4">300g</h2>
                                        <span className="text-white snipcss0-3-3-5">Carbohydrates</span>
                                    </div>
                                    <div className="d-inline-block position-relative donut-chart-sale snipcss0-2-2-6">
                                        <div
                                            className="donught-chart snipcss0-3-6-7 style-xrPbP"
                                            id="style-xrPbP"
                                        >
                                            <canvas
                                                role="img"
                                                height={187}
                                                width={187}
                                                className="snipcss0-4-7-8 style-ibt72"
                                                id="style-ibt72"
                                            ></canvas>
                                        </div>
                                        <small className="text-primary snipcss0-3-6-9">
                                            <svg
                                                width={30}
                                                height={30}
                                                viewBox="0 0 30 30"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="snipcss0-4-9-10"
                                            >
                                                <g clipPath="url(#clip0)" className="snipcss0-5-10-11">
                                                    <path
                                                        d="M30 7.03697H21.4497V1.75781H27.7137V0H19.6918V7.03697H11.1417V12.3132H12.9572L13.1193 14.7549H8.50227C5.03494 14.7549 2.17072 17.3859 1.80038 20.7561C0.75531 21.1073 0 22.0953 0 23.2571C0 24.4244 0.762405 25.4164 1.81526 25.7632C2.1769 28.1582 4.24873 30 6.74286 30H27.0115L28.1845 12.3132H30V7.03697ZM8.50227 16.5127H16.2202C18.669 16.5127 20.7097 18.2881 21.1263 20.6188H3.59619C4.01276 18.2881 6.05324 16.5127 8.50227 16.5127ZM2.63809 22.3766H22.0841C22.5696 22.3766 22.9646 22.7717 22.9646 23.2569C22.9646 23.7424 22.5696 24.1372 22.0841 24.1372H2.63809C2.15263 24.1372 1.75781 23.7424 1.75781 23.2569C1.75781 22.7717 2.15263 22.3766 2.63809 22.3766ZM6.74286 28.2422C5.26886 28.2422 4.02351 27.2479 3.63968 25.8952H21.0825C20.6989 27.2479 19.4536 28.2422 17.9794 28.2422H6.74286ZM25.3665 28.2422H21.7738C22.3618 27.5517 22.7655 26.7002 22.907 25.7632C23.9598 25.4164 24.7224 24.4244 24.7224 23.2571C24.7224 22.0953 23.9671 21.1073 22.9221 20.7561C22.5517 17.3859 19.6877 14.7549 16.2202 14.7549H14.881L14.7189 12.3132H26.4228L25.3665 28.2422ZM28.2422 10.5553H12.8996V8.79478H28.2422V10.5553Z"
                                                        fill="#EA7A9A"
                                                    ></path>
                                                </g>
                                                <defs className="snipcss0-5-10-12">
                                                    <clipPath id="clip0" className="snipcss0-6-12-13">
                                                        <rect width={30} height={30} fill="white"></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </small>
                                        <span className="circle bg-white snipcss0-3-6-14"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-xxl-6 col-sm-6 snipcss-klI8l">
                        <div className="card grd-card">
                            <div className="card-body snipcss0-0-0-1">
                                <div className="media align-items-center snipcss0-1-1-2">
                                    <div className="media-body mr-2 snipcss0-2-2-3">
                                        <h2 className="text-white font-w600 snipcss0-3-3-4">120g</h2>
                                        <span className="text-white snipcss0-3-3-5">Fat</span>
                                    </div>
                                    <div className="d-inline-block position-relative donut-chart-sale snipcss0-2-2-6">
                                        <div
                                            className="donught-chart snipcss0-3-6-7 style-xrPbP"
                                            id="style-xrPbP"
                                        >
                                            <canvas
                                                role="img"
                                                height={187}
                                                width={187}
                                                className="snipcss0-4-7-8 style-ibt72"
                                                id="style-ibt72"
                                            ></canvas>
                                        </div>
                                        <small className="text-primary snipcss0-3-6-9">
                                            <svg
                                                width={30}
                                                height={30}
                                                viewBox="0 0 30 30"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="snipcss0-4-9-10"
                                            >
                                                <g clipPath="url(#clip0)" className="snipcss0-5-10-11">
                                                    <path
                                                        d="M30 7.03697H21.4497V1.75781H27.7137V0H19.6918V7.03697H11.1417V12.3132H12.9572L13.1193 14.7549H8.50227C5.03494 14.7549 2.17072 17.3859 1.80038 20.7561C0.75531 21.1073 0 22.0953 0 23.2571C0 24.4244 0.762405 25.4164 1.81526 25.7632C2.1769 28.1582 4.24873 30 6.74286 30H27.0115L28.1845 12.3132H30V7.03697ZM8.50227 16.5127H16.2202C18.669 16.5127 20.7097 18.2881 21.1263 20.6188H3.59619C4.01276 18.2881 6.05324 16.5127 8.50227 16.5127ZM2.63809 22.3766H22.0841C22.5696 22.3766 22.9646 22.7717 22.9646 23.2569C22.9646 23.7424 22.5696 24.1372 22.0841 24.1372H2.63809C2.15263 24.1372 1.75781 23.7424 1.75781 23.2569C1.75781 22.7717 2.15263 22.3766 2.63809 22.3766ZM6.74286 28.2422C5.26886 28.2422 4.02351 27.2479 3.63968 25.8952H21.0825C20.6989 27.2479 19.4536 28.2422 17.9794 28.2422H6.74286ZM25.3665 28.2422H21.7738C22.3618 27.5517 22.7655 26.7002 22.907 25.7632C23.9598 25.4164 24.7224 24.4244 24.7224 23.2571C24.7224 22.0953 23.9671 21.1073 22.9221 20.7561C22.5517 17.3859 19.6877 14.7549 16.2202 14.7549H14.881L14.7189 12.3132H26.4228L25.3665 28.2422ZM28.2422 10.5553H12.8996V8.79478H28.2422V10.5553Z"
                                                        fill="#EA7A9A"
                                                    ></path>
                                                </g>
                                                <defs className="snipcss0-5-10-12">
                                                    <clipPath id="clip0" className="snipcss0-6-12-13">
                                                        <rect width={30} height={30} fill="white"></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </small>
                                        <span className="circle bg-white snipcss0-3-6-14"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className = "Form">
                <StatsForm/></div>
        </div>
        </React.Fragment>
    );
    
}

// export default function BasicModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       <Button onClick={handleOpen}>Open modal</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Text in a modal
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

// function Test(props) {
//   const {isShowing, toggle} = useModal();
//   console.log("Test")
//   return (
//     <div className="App">
//       <button className="button-default" onClick={toggle}>Show Modal</button>
//       <Modal
//         isShowing={isShowing}
//         hide={toggle}
//       />
//     </div>
//   );
// };

// export default Test;

function StatsForm(props) {
    return (
        <div className="col-xl-6 col-lg-12 snipcss-7jYH5">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">My Goals</h4>
                </div>
                <div className="card-body">
                    <div className="basic-form">
                        <form>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Birthdate</label>
                                <div className="col-sm-9">
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="MM/DD/YYYY"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Height</label>
                                <div className="col-sm-9">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                            <fieldset className="form-group">
                                <div className="row">
                                    <label className="col-form-label col-sm-3 pt-0">Radios</label>
                                    <div className="col-sm-9">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gridRadios"
                                                defaultValue="option1"
                                                defaultChecked=""
                                            />
                                            <label className="form-check-label">First radio</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gridRadios"
                                                defaultValue="option2"
                                            />
                                            <label className="form-check-label">Second radio</label>
                                        </div>
                                        <div className="form-check disabled">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gridRadios"
                                                disabled=""
                                                defaultValue="option3"
                                            />
                                            <label className="form-check-label">
                                                Third disabled radio
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <div className="form-group row">
                                <div className="col-sm-3">Checkbox</div>
                                <div className="col-sm-9">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" />
                                        <label className="form-check-label">Example checkbox</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button type="submit" className="btn btn-primary">
                                        Sign in
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}