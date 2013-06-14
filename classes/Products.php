<?php
    class Products extends DB
	{		
	    function getAllProducts ()
	    {
	        $sql = "SELECT * FROM products limit 10";
	        return $this->dbFetchRecords($sql);    
	    }
	}
	    