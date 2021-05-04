import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import HeaderForGuest from '../headerforguest';
import { ValidatorForm,TextValidator } from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp() {
	const history = useHistory();
	const initialFormData = Object.freeze({
		email: '',
		username: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance
			.post(`user/create/`, {
				email: formData.email,
				user_name: formData.username,
				password: formData.password,
			})
			.then((res) => {
				history.push('/login');
				console.log(res);
				console.log(res.data);
			});
	};

	const classes = useStyles();

	return (
		<div className="App">
			<HeaderForGuest />
			<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<ValidatorForm className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							{/* <TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleChange}
							/> */}
							<TextValidator
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								label="Email"
								onChange={handleChange}
								value={formData.email}
								validators={['required', 'isEmail']}
								errorMessages={['this field is required', 'email is not valid']}
							/>
						</Grid>
						<Grid item xs={12}>
							{/* <TextField
								variant="outlined"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								onChange={handleChange}
							/> */}
							<TextValidator
								variant="outlined"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								value={formData.username}
								autoComplete="username"
								onChange={handleChange}
								validators={['empty' ]}
								errorMessages={['this field is required']}
							/>
						</Grid>
						<Grid item xs={12}>
							{/* <TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange}
							/> */}
							<TextValidator
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange}
								value={formData.password}
								validators={['required' ,'matchRegexp:^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})']}
								errorMessages={['this field is required', 
									`password length  should be 8-20 --
									The password must contain at least 1 lowercase alphabetical character --
									The password must contain at least 1 uppercase alphabetical character --
									The password must contain at least 1 numeric character --
									The string must contain at least one special character`
							]
						}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</ValidatorForm>
			</div>
		</Container>
		</div>
	);
}