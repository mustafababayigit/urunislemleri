import Vue from "vue";
import { router } from "../../router";
import axios from "axios"

const state = {
    token: "",
    fbAPIKey: "AIzaSyB1mBxNiHjNpWFHyrLI2UYEKYOK-gRjsG4"
}

const getters = {
    isAuthenticated(state){
        return state.token !== ""
    }
}

const mutations = {
    setToken(state, token){
        state.token = token
    },
    clearToken(state){
        state.token = ""
    }
}

const actions = {
    initAuth({commit, dispatch}){
        let token = localStorage.getItem("token");
        if(token){
            let expirationDate = localStorage.getItem("expirationDate")
            let time = new Date().getTime()
            if(time >= +expirationDate){
                dispatch("logout");
            }else{
                commit("setToken", token)
                let timerSecond = +expirationDate -time
                dispatch("setTimeoutTimer", timerSecond)
                router.push("/")
            }
        }else{
            router.push("/auth");
            return false;
        }
    },
    login({ commit, dispatch, state}, authData){
        let authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
        if(authData.isUser){
            authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
        }
        return axios.post(
            authLink + "AIzaSyB1mBxNiHjNpWFHyrLI2UYEKYOK-gRjsG4",
            { email:authData.email, password:authData.password, returnSecureToken: true}
        ).then(response => {
            commit("setToken", response.data.idToken),
            localStorage.setItem("token", response.data.idToken)
            localStorage.setItem("expirationDate", new Date().getTime() + +response.data.expiresIn*1000)
            dispatch("setTimeoutTimer", +response.data.expiresIn*1000)
        })

    },
    logout({ commit}){
        commit("clearToken");
        localStorage.removeItem("token");
        localStorage.removeItem("expirationDate");
        router.push("/auth");
    },
    setTimeoutTimer({dispatch}, expiresIn){
        setTimeout(() => {
            dispatch("logout")
        }, expiresIn)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}