import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	state     : {
		userLogin    : false,
		userId       : null,
		userAccounts : [],
		categories   : null
	},
	plugins   : [ createPersistedState() ],
	mutations : {
		changeStatus(state, payload) {
			state.userLogin = payload;
		},
		changeId(state, payload) {
			state.userId = payload;
		},
		setAccount(state, payload) {
			state.userAccounts = [];
			state.userAccounts.push(...payload);
		},
		setCategories(state, payload) {
			state.categories = [];
			state.categories.push(...payload);
		},
		newAccount(state, payload) {
			state.userAccounts.push(payload);
		}
	},
	actions   : {},
	getters   : {
		userLogin(state) {
			return state.userLogin;
		},
		userId(state) {
			return state.userId;
		},
		getAccounts(state) {
			return state.userAccounts;
		},
		getCategories(state) {
			return state.categories;
		}
	}
});
