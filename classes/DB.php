<?php
    class DB
	{
	    private $dbHost;
		private $dbUser;
		private $dbPassword;
		public $dbSel;
		public $dbCon;
		public $selectRecords;
		
		function __construct($host, $user, $pwd, $dbName)
		{
		    $this->dbHost = $host;
			$this->dbUser = $user;
			$this->dbPassword = $pwd;
			$this->dbName = $dbName;		 
		}
		
		function dbConnect()
		{
		    $this->dbCon = mysql_connect($this->dbHost, $this->dbUser, $this->dbPassword) or die($this->dbError(mysql_error()));
			$this->dbSel = mysql_select_db($this->dbName, $this->dbCon) or die($this->dbError(mysql_error()));
			return $this->dbSel;
		}
		
		function dbQuery($sql)
		{
		    $res = mysql_query($sql) or die($this->dbError('Executing Query "'. $sql .'"'));
			return $res;
		}
		
		function dbRecordCount($result)
		{
		    return mysql_num_rows($result);
		}
		
		function dbFetchRecords($sql)
		{
		    $result = $this->dbQuery($sql);
		    $recordsNum = $this->dbRecordCount($result);
			if ($recordsNum > 0) {
			    while ($row = mysql_fetch_array($result,MYSQL_ASSOC))
				{
				    $this->selectRecords[] = $row;
				}
				mysql_free_result($result);
			}
			
			return $this->selectRecords;
		}
		
		function dbError($errStr)
		{
		    if($errStr) {
			    echo('<br><font color="#b91d1d"><b>[ Error: ]</b></font> ' . $errStr);
		    } else {
			    echo('<br><font color="#b91d1d"><b>[ Error Description: ]</b></font> ' .mysql_error($this->dbCon));
			}
		}
		
		function dbClose()
		{
		    mysql_close($this->dbCon);
		}
	}
?>