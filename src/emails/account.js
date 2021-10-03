const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'info@leopolicastro.com',
		subject: 'Welcome!',
		text: `Welcome to your task manager ${name}! I hope you like it.`
		// html: ''I can place html tags and elements inside this field
	});
};

const sendCancellationEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'info@leopolicastro.com',
		subject: 'We hate to see you leave.',
		text: `Goodbye, ${name}.  Hope to see you back again.`
	});
};

module.exports = {
	sendWelcomeEmail,
	sendCancellationEmail
};
