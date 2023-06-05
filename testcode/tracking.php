<?php
//logger, make sure the directory or the file pixel.log is writable
function printLog($str)
{
  file_put_contents( 'pixel.log', $str."\n", FILE_APPEND | LOCK_EX );
}
 
//Несколько предварительных настроек:
$user_ip = getenv('REMOTE_ADDR');
//$browser = get_browser(null, true);
//$browser = print_r(get_browser(null, true));
$geo = unserialize(file_get_contents("http://www.geoplugin.net/php.gp?ip=$user_ip"));

//Пишем в лог
printLog("\n".'===============================================================');
printLog(date('Y-m-d H:i:s'));
printLog('Remote Address: '.$user_ip);
if (isset($geo["geoplugin_countryName"])) {
    printLog('Country: '.$geo["geoplugin_countryName"]);
} else {
  printLog('Country: N\A');
}
if (isset($geo["geoplugin_city"])) {
  printLog('City: '.$geo["geoplugin_city"]);
} else {
  printLog('City: N\A');
}
printLog('User Agent: '.$_SERVER['HTTP_USER_AGENT']);

if (isset($_SERVER['HTTP_REFERER'])) {
  printLog('HTTP Referer: '.$_SERVER['HTTP_REFERER']);
} else {
  printLog('HTTP Referer: N\A');
}
if (isset($_SERVER['REMOTE_HOST'])) {
  printLog('Remote host: '.$_SERVER['REMOTE_HOST']);
} else {
  printLog('Remote host: N\A');
}
if (isset($_SERVER['REMOTE_USER'])) {
  printLog('Remote  User: '.$_SERVER['REMOTE_USER']);
} else {
  printLog('Remote  User: N\A');
}
/*
ПАРА ИНТЕРЕСНЫХ ПЕРЕМЕННЫХ:

'REMOTE_USER' - Имя пользователя системы

'DOCUMENT_ROOT' - Директория исполнения файла

'REMOTE_PORT' - Открытый порт на компе пользователя, через который постучались к скрипту

printLog('User Agent: '.$browser); - Нужно отладить на серваке

*/

 
//Вывели картинку .gif
header('Content-Type: image/gif');
 
// Эквивалент readfile('pixel.gif') эмулировали изображение
echo "\x47\x49\x46\x38\x37\x61\x1\x0\x1\x0\x80\x0\x0\xfc\x6a\x6c\x0\x0\x0\x2c\x0\x0\x0\x0\x1\x0\x1\x0\x0\x2\x2\x44\x1\x0\x3b";
?>