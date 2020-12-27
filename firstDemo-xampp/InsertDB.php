<?php
//Creates new record as per request
    //Connect to database
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "nodemcu";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Database Connection failed: " . $conn->connect_error);
    }

    //Get current date and time
    date_default_timezone_set('Asia/Ho_Chi_Minh');
    $d = date("Y-m-d");
    $t = date("H:i:s");


    if(!empty($_POST['mq7val']) && !empty($_POST['mq4val']) && !empty($_POST['mq131val']))
    {
		$mq7val = $_POST['mq7val'];
		$mq4val = $_POST['mq4val'];
		$mq131val = $_POST['mq131val'];
		
       
        $sql = "INSERT INTO table_nodemcu (mq7, mq4, mq131, date, time) VALUES ('".$mq7val."', '".$mq4val."', '".$mq131val."', '".$d."', '".$t."')";

        if ($conn->query($sql) === TRUE) {
            echo "OK";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }   
	}


	$conn->close();
?>