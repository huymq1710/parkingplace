<!DOCTYPE html>
<html>
	<head>
		<style>
			table {
				border-collapse: collapse;
				width: 100%;
				color: #1f5380;
				font-family: monospace;
				font-size: 20px;
				text-align: left;
			} 
			th {
				background-color: #1f5380;
				color: white;
			}
			tr:nth-child(even) {background-color: #f2f2f2}
		</style>
	</head>
	<?php
		//Creates new record as per request
		//Connect to database
		$hostname = "localhost";
		$username = "root";
		$password = "";
		$dbname = "nodemcu";
		// Create connection
		$conn = mysqli_connect($hostname, $username, $password, $dbname);
		// Check connection
		if (!$conn) {
			die("Connection failed !!!");
		} 
	?>
	<body>
		<table>
			<tr>
				<th>ID</th> 
				<th>MQ7</th> 
				<th>MQ4</th>
				<th>MQ131</th>
				<th>Date</th>
				<th>Time</th>
			</tr>	
			<?php
				$table = mysqli_query($conn, "SELECT id, mq7, mq4, mq131, date, time FROM table_nodemcu");
				while($row = mysqli_fetch_array($table))
				{
			?>
			<tr>
				<td><?php echo $row["id"]; ?></td>
				<td><?php echo $row["mq7"]; ?></td>
				<td><?php echo $row["mq4"]; ?></td>
				<td><?php echo $row["mq131"]; ?></td>
				<td><?php echo $row["date"]; ?></td>
				<td><?php echo $row["time"]; ?></td>
			</tr>
			<?php
				}
			?>
		</table>
	</body>
</html>