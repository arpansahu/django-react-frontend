import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/posts/posts';
import PostLoadingComponent from './components/posts/postLoading';
import axiosInstance from './axios';
import { useHistory } from 'react-router';
import Header from './components/header';
function App() {
	const history = useHistory();
	const PostLoading = PostLoadingComponent(Posts);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});
	const [temp, setTemp] = useState(0)


	useEffect(() => {
		// console.log("App.js")
		axiosInstance.get().then((res) => {
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });

		})
		.catch(err => {
			// what now?
			console.log("Inside Error", err);
			history.push('/login');
		})
		// console.log((appState))
		;
	}, [setAppState, localStorage.getItem('access_token')])


	return (
		<div className="App">
			<Header />
			<h1>Latest Posts</h1>
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}
export default App;
