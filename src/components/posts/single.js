import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Header from '../header';
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export default function Post() {
	const { slug } = useParams();
	const classes = useStyles();

	const [data, setData] = useState({
		posts: [],
	});

	useEffect(() => {
		axiosInstance.get('post/' + slug).then((res) => {
			setData({
				posts: res.data,
			});
			// console.log(res.data);
		});
	}, [setData]);

	return (
		<div className="App">
			<Header />
			<h1>Latest Posts</h1>
			<React.Fragment>
			<Container component="main" maxWidth="md">
				<CssBaseline />
				<div className={classes.paper}> </div>{' '}
					<div className={classes.heroContent}>
						<Container maxWidth="sm">
							<CardMedia
								className={classes.cardMedia}
								image={data.posts.image}
								title="Image title"
							/>
							<Typography
								component="h1"
								variant="h2"
								align="center"
								color="textPrimary"
								gutterBottom
							>
								{data.posts.title}{' '}
							</Typography>{' '}
							<Typography
								variant="h5"
								align="center"
								color="textSecondary"
								paragraph
							>
								{data.posts.excerpt}{' '}
							</Typography>{' '}
							<Typography
								variant="h5"
								align="center"
								color="textSecondary"
								paragraph
							>
								{data.posts.content}{' '}
							</Typography>{' '}
						</Container>{' '}
					</div>{' '}
				</Container>
			</React.Fragment>

		</div>
	);
}
