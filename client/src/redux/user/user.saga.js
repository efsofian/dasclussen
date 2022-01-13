import { takeLatest, put, all, call } from "@redux-saga/core/effects";
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from "../../firebase/firebase.utils";
import { SignInSuccess, SignInFailure, signOutSuccess, signOutFailure, signUpFailure, signUpSuccess } from "./user.actions";
import UserActionTypes from "./user.types";

function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(SignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (e) {
        put(SignInFailure(e.message));
    }
}

function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (e) {
        yield put(SignInFailure(e.message));
    }
    
}

function* signInWithEmailAndPAssword({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (e) {
        yield put(SignInFailure(e.message));
    }
    
}

function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* onEmailAndPasswordSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmailAndPAssword);
}

function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) { return; }
        yield getSnapshotFromUserAuth(userAuth);
        
    } catch (e) {
        yield put(SignInFailure(e.message));
    }
}

function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess())
    } catch (e) {
        yield put(signOutFailure(e.message));
    }
}

function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName }}));
    } catch (e) {
        yield put(signUpFailure(e.message));
    }
}

function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}



export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailAndPasswordSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}