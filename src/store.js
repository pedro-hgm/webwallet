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
			state.userAccounts = [];
			state.userAccounts.push(...payload);
		},
		setCategories(state, payload) {
			state.categories = [];
			state.categories.push(...payload);
		},
		newAccount(state, payload) {
			state.userAccounts.push(payload);
		},
		setCurrentExpenses(state, payload) {
			state.currentExpenses = [];
			state.currentExpenses.push(...payload);
		},
		newExpense(state, payload) {
			// TODO: replace this for a call from the api since the user can create a new expense with a date that does not fit in the current one
			state.currentExpenses.push(payload);
		},
		setCurrentIncomes(state, payload) {
			state.currentIncomes = [];
			state.currentIncomes.push(...payload);
		},
		newIncome(state, payload) {
			state.currentIncome.push(payload);
		},
		setCycle(state, payload) {
			state.userCycles = [];
			state.userCycles.push(...payload);
		},
		newCycle(state, payload) {
			state.userCycles[state.userCycles.length - 1].current = false;
			state.userCycles.push(payload);
		},
		setCycleIncomes(state, payload) {
			state.cycleIncomes = [];
			state.cycleIncomes.push(...payload);
		},
		setCycleExpenses(state, payload) {
			state.cycleExpenses = [];
			state.cycleExpenses.push(...payload);
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
