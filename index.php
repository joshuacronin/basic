<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="favicons/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" type="image/x-icon" href="favicons/favicon.ico">
    <title>Front End Starter</title>
</head>
<body style="margin: 20px;">

    <h1>Positive Front End Starter HTML templates</h1>

    <ul>
        <?php 
        
            if ($handle = opendir('./templates')) {
                while (false !== ($file = readdir($handle))) {
                    if ($file != "." && $file != ".." && strtolower(substr($file, strrpos($file, '.') + 1)) == 'php') {
                        echo '<li><a href="./templates/' . $file . '">' . $file . '</a></li>';
                    }
                }
                closedir($handle);
            }

        ?>
    </ul>

</body>
</html>