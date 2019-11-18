import React, { useState, useEffect } from 'react';
import './App.css';
import Movie from './Movie';
import Header from './Header';
import Search from './Search';

const MOVIE_API_URL = 'http://www.omdbapi.com/?s=man&apikey=91ab1928';

const App = () => {
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		fetch(MOVIE_API_URL)
			.then(response => response.json())
			.then(jsonResponse => {
				setMovies(jsonResponse.Search);
				setLoading(false);
			});
	}, []);

	const search = searchValue => {
		setLoading(true);
		setErrorMessage(null);

		fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=91ab1928`)
			.then(response => response.json())
			.then(jsonResponse => {
				if (jsonResponse.Response == true) {
					setMovies(jsonResponse.Search);
					setLoading(false);
				} else {
					setErrorMessage(jsonResponse.Error);
					setLoading(false);
				}
			});
	};

	return (
		<div className='App'>
			<Header text='Movie Search: a React based IMDB Clone' />
			<Search search={search} />
			<p className='App-intro'>A couple of cool movies!</p>
			<div className='movies'>
				{loading && !errorMessage ? (
					<span>Loading...</span>
				): errorMessage ? (
					<div className="errorMessage">{errorMessage}</div>
				) : (
					movies.map((movie, index) => (
						<Movie key={`${index}-${movie.Title}`} movie={movie} />
					))
				)}
			</div>
		</div>
	);
};

export default App;
