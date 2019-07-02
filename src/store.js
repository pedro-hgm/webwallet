import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	state     : {
		userLogin       : false,
		userId          : null,
		userAccounts    : [],
		categories      : null,
		currentExpenses : null,
		currentIncomes  : null,
		userCycles      : [],
		cycleIncomes    : [],
		cycleExpenses   : []
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
			state.userAccounts = payload;
		},
		setCategories(state, payload) {
			state.categories = payload;
		},
		newAccount(state, payload) {
			state.userAccounts.push(payload);
		},
		setCurrentExpenses(state, payload) {
			state.currentExpenses = payload;
		},
		setCurrentIncomes(state, payload) {
			state.currentIncomes = payload;
		},
		setCycle(state, payload) {
			state.userCycles = payload;
		},
		newCycle(state, payload) {
			state.userCycles[state.userCycles.length - 1].current = false;
			state.userCycles.push(payload);
		},
		setCycleIncomes(state, payload) {
			state.cycleIncomes = payload;
		},
		setCycleExpenses(state, payload) {
			state.cycleExpenses = payload;
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
		},
		getCurrentExpenses(state) {
			return state.currentExpenses;
		},
		getCurrentIncomes(state) {
			return state.currentIncomes;
		},
		getCycles(state) {
			return state.userCycles;
		},
		getCycleExpenses(state) {
			return state.cycleExpenses;
		},
		getCycleIncomes(state) {
			return state.cycleIncomes;
		}
	}
});
