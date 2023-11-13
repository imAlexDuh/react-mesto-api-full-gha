import '../index.css';
import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import api from '../utils/Api';
import auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip.js';
import Login from './Login.js';
import Register from './Register.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isImgPopupOpen, setIsImgPopupOpen] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCardsData] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isSuccesLogin, setIsSuccesLogin] = React.useState(false);
    const [authUserEmail, setAuthUserEmail] = React.useState(null);

    const history = useHistory();


    React.useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getCardsInfo()])
                .then(([userData, initialCards]) => {
                    setCurrentUser(userData.user);
                    setCardsData(initialCards.cards);
                })
                .catch((err) => console.log(err))
        }
    }, [loggedIn]);


    React.useEffect(() => {
        loggedIn && history.push('/');
    }, [history, loggedIn]);

    function handleInfoTooltipOpen() {
        setIsInfoTooltipOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setIsImgPopupOpen(false);
        setIsInfoTooltipOpen(false);
    }

    function handleCardClick(card) {
        setIsImgPopupOpen(true);
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCardsData((state) => state.map((c) => c._id === card._id ? newCard.card : c));
            })

            .catch((err) => {
                console.log(err);
            })
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCardsData((state) => state.filter((elem) => elem._id !== card._id));
            })

            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateUser(newInfo) {
        api.setUserInfo(newInfo)
            .then((userData) => {
                setCurrentUser(userData.user);
                closeAllPopups();
            })

            .catch((err) => {
                console.log(err);
            })

    }

    function handleUpdateAvatar(newAvatar) {
        api.setUserAvatar(newAvatar)
            .then((userData) => {
                setCurrentUser(userData.user);
                closeAllPopups();
            })

            .catch((err) => {
                console.log(err);
            })
    }

    function handleAddPlaceSubmit(place) {
        api.addCard(place)
            .then((newCard) => {
                setCardsData([newCard.card, ...cards]);
                closeAllPopups();
            })

            .catch((err) => {
                console.log(err);
            })
    }

    function handleSignOut() {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        history.push('/sign-in');
    }

    function handleRegistration(email, password) {
        auth.register(email, password)
            .then(
                (data) => {
                    setIsSuccesLogin(true);
                    history.push('/sign-in');
                }
            )

            .catch((err) => {
                console.log(err);
                setIsSuccesLogin(false);
            })

            .finally(() => {
                handleInfoTooltipOpen();
            })
    }

    function handleAuth(email, password) {
        setAuthUserEmail(email);
        auth.auth(email, password)
            .then(
                (data) => {
                    setLoggedIn(true);
                    localStorage.setItem('jwt', data.token);
                    history.push('/');
                }
            )

            .catch((err) => {
                console.log(err);
                setIsSuccesLogin(false);
                handleInfoTooltipOpen();
            })
    }

    React.useEffect(() => {
        auth.checkToken()
            .then((data) => {
                if (data) {
                    setLoggedIn(true);
                    setAuthUserEmail(data.user.email);
                    history('/', { replace: true });
                }
            })
            .catch((err) => console.log(err))
    }, [history])

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImgPopupOpen

    React.useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])

    return (
        <CurrentUserContext.Provider value={currentUser}>

            <Header
                loggedIn={loggedIn}
                onSignOut={handleSignOut}
                authUserEmail={authUserEmail}
            />

            <Switch>
                <Route path="/sign-up">
                    <Register
                        onRegistration={handleRegistration}
                    />
                </Route>

                <Route path="/sign-in">
                    <Login
                        onAuth={handleAuth}
                    />
                </Route>

                <ProtectedRoute
                    component={Main}
                    path="/"
                    loggedIn={loggedIn}
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />

                <Route path="/">
                    {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                </Route>
            </Switch>

            <Footer />

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser} />

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit} />

            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar} />

            <ImagePopup
                card={selectedCard}
                isOpen={isImgPopupOpen}
                onClose={closeAllPopups}
            />
            <InfoTooltip
                isopen={isInfoTooltipOpen}
                onClose={closeAllPopups}
                isSucces={isSuccesLogin}
            />
        </CurrentUserContext.Provider>
    );
}

export default App;
