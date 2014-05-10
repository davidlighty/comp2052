<?php
/*
	David Lighty
	A00843511
	Student server side module/class
	Respond to GET/POST/DELETE for student data.
	Write data to JSON file.
	Read data from JSON file.

	GET || POST (add/update)
	?type="student" or "campus"  + data

	*REQUIRES MONGODB
	
*/

$connection = new MongoClient(); // connects to localhost:27017
$db = $connection->studentApp;

// Globals
$response; 
$statusCode=200;

// Init Request handling
if(isset($_REQUEST["type"]) && !empty($_REQUEST["type"])){
	$requestType = $_REQUEST["type"];
	$httpMethod = $_SERVER['REQUEST_METHOD'];
	handleRequest($httpMethod,$requestType);
}else{
	$response=json_encode("Please set a type for your request. >> Eventually document this API.");
	$statusCode=500;
}

// Response
responseStart();
echo json_encode($response);


// Methods
function handleRequest($httpMethod,$requestType){
	global $stausCode;
	global $response;
	global $db;

	switch($requestType){
		case 'student':
		$studentsCollection = $db->students;
		switch ($httpMethod) {
		  case 'POST':
		  $rest_json = file_get_contents("php://input");
		  	$jsonData = json_decode($rest_json,true);
		  	var_dump($jsonData["action"]);
		  	if(!isset($jsonData["action"])||empty($jsonData["data"])){
		  		$response = "Requires an action";
		  		return;
		  	}
		  	$action = $jsonData["action"];
		  	switch($action){
		  		case 'addStudent':
		  		//var_dump($jsonData["data"]);  // Single student
		  		$studentsCollection->insert($jsonData["data"]);
		  		$response="Inserted";
		  		break;
		  		case 'seedData':
		  		$studentsCollection->remove(); // Empty it first.
				foreach($jsonData["data"] as $item){
			  		//var_dump($item["student"]);
			    	$studentsCollection->insert($item["student"]);
				}
				$response = "Inserted";
		  		break;
		  	}
		    break;
		  case 'GET':
		  	$data =$studentsCollection->find();
		  	$response = iterator_to_array($data);
		    break;
		  default:
		    $response="Not Implmented Yet.";
		    $statusCode=500;
		    break;
		}
		break;
		case 'campus':
		$campusCollection = $db->campuses;
			switch ($httpMethod) {
			  case 'POST':
			    $response=null;
			    break;
			  case 'GET':
			    $response=iterator_to_array($campusCollection->find());
			    break;
			  default:
			    $response="Not Implmented Yet.";
			    $statusCode=500;
			    break;
			}
	}
}

 function responseStart(){
 	global $statusCode;
 	//http_response_code($statusCode);
 	header('Content-Type: application/json');
 }

?>