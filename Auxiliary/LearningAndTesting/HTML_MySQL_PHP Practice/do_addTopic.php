<!doctype html>
<html lang="en">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<!-- Bootstrap CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
		<link rel="stylesheet" href="index.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<title>New Topic Added</title>
	</head>

	<body>
		<!--Navigation Bar-->
		<header class="navbar navbar-expand-sm navbar-light bg-light fixed-top">
			
			<a class="navbar-brand" href="#" >
				<img src="../resources/teetorLogo2.png" width="100" height="40" class="d-inline-block align-top" draggable = "false" alt="">
			</a>


			<!--Toggle Button-->
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu">
					<span class="navbar-toggler-icon"></span>
			</button>
			
			<!--Navigation Links-->
			<div class="collapse navbar-collapse " id="navbarMenu">
				<ul class="navbar-nav">
					<li class="nav-item"><a class="nav-link" href="#">Home</a></li>
					<li class="nav-item"><a class="nav-link" href="#">About Us</a></li>
				</ul>
				<!--Log in and Sign up link-->
				
			</div>	 
			<a class="headerMenuLink mr-3" href="#" data-toggle="modal" data-target="#modalLoginForm">Log In</a>
			<a class="headerMenuLink d-inline-block border border-gray-dark rounded-1 px-2 py-1" href="#" data-toggle="modal" data-target="#modalRegisterForm">Sign Up</a>
		</header>

		<div class="hr-divider"></div>
   		<div id="mainBody">
			<h1>New Topic Added</h1>
			<?php
				//check for required fields from the form
				if ((!$_POST[topic_owner]) || (!$_POST[topic_title]) || (!$_POST[post_text])) {
				header("Location: addtopic.html");
				exit;
				}

				//connect to server and select database
				$conn = mysql_connect("localhost", "joeuser", "somepass")
				or die(mysql_error());
				mysql_select_db("testDB",$conn) or die(mysql_error());

				//create and issue the first query
				$add_topic = "insert into forum_topics values ('', '$_POST[topic_title]',
				now(), '$_POST[topic_owner]')";
				mysql_query($add_topic,$conn) or die(mysql_error());

				//get the id of the last query 
				$topic_id = mysql_insert_id();

				//create and issue the second query
				$add_post = "insert into forum_posts values ('', '$topic_id',
				'$_POST[post_text]', now(), '$_POST[topic_owner]')";
				mysql_query($add_post,$conn) or die(mysql_error());
				 
				//create nice message for user
				$msg = "<P>The <strong>$topic_title</strong> topic has been created.</p>";
				?>
			<?php print $msg; ?>
		</div>
	</body>
</html>