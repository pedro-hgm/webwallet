import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Dashboard from './views/Dashboard.vue';
import Cycles from '@/views/Cycles.vue';
import Accounts from '@/views/Accounts.vue';
import Reports from '@/views/Reports.vue';

Vue.use(Router);

export default new Router({
	mode   : 'history',
	base   : process.env.BASE_URL,
	routes : [
		{
			path      : '/',
			name      : 'home',
			component : Home
		},
		{
			path      : '/dashboard',
			name      : 'dashboard',
			component : Dashboard
		},
		{
			path      : '/cycles',
			name      : 'cycles',
			component : Cycles
		},
		{
			path      : '/accounts',
			name      : 'accounts',
			component : Accounts
		},
		{
			path      : '/reports',
			name      : 'reports',
			component : Reports
		},
		{
			path      : '/*',
			name      : '*',
			component : Home
		}
	]
});
