import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import {
	Home,
	Login,
	Join,
	MyPage,
	Report,
	ReportInfo,
	ReportWrite,
	UserEdit,
	MyLibrary,
	BookCalendar,
	BookInfo,
} from './pages';
import { Header } from './components';
import './scss/main.scss';

function App() {
	return (
		<Grid className="app">
			<Header />
			<Route exact path="/" component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/join" component={Join} />
			<Route path="/mypage" component={MyPage} />
			<Route exact path="/report" component={Report} />
			<Route exact path="/report/:id" component={ReportInfo} />
			<Route exact path="/report/:id/edit" component={ReportWrite} />
			<Route exact path="/mylib" component={MyLibrary} />
			<Route exact path="/book_info/:id" component={BookInfo} />
			<Route path="/calendar" component={BookCalendar} />
		</Grid>
	);
}

export default App;
