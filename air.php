<?php
/**
 * Created by PhpStorm.
 * User: Trevor
 * Date: 2019/6/5
 * Time: 17:58
 */
$city=$_GET['city'];
$url="http://live.langziphp.com/v1/air?city=".$city;
$ch=curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
$result=curl_exec($ch);
curl_close($ch);
echo $result;
