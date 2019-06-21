import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	state     : {
		userLogin : false,
		userId    : null
	},
	plugins   : [ createPersistedState() ],
	mutations : {
		changeStatus(state, payload) {
			state.userLogin = payload;
		},
		changeId(state, payload) {
			state.userId = payload;
		}
	},
	actions   : {},
	getters   : {
		userLogin(state) {
			return state.userLogin;
		},
		userId(state) {
			return state.userId;
		}
	}
});
