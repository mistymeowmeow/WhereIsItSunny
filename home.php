<!DOCTYPE html>
<html>
<style>
    * {
        box-sizing: border-box;
    }

    body {
        font: 16px Arial;
    }

    /*the container must be positioned relative:*/
    .autocomplete {
        position: relative;
        display: inline-block;
    }

    input {
        border: 1px solid transparent;
        background-color: #f1f1f1;
        padding: 10px;
        font-size: 16px;
    }

    input[type=text] {
        background-color: #f1f1f1;
        width: 100%;
    }

    input[type=submit] {
        background-color: DodgerBlue;
        color: #fff;
        cursor: pointer;
    }

    .autocomplete-items {
        position: absolute;
        border: 1px solid #d4d4d4;
        border-bottom: none;
        border-top: none;
        z-index: 99;
        /*position the autocomplete items to be the same width as the container:*/
        top: 100%;
        left: 0;
        right: 0;
    }

    .autocomplete-items div {
        padding: 10px;
        cursor: pointer;
        background-color: #fff;
        border-bottom: 1px solid #d4d4d4;
    }

    /*when hovering an item:*/
    .autocomplete-items div:hover {
        background-color: #e9e9e9;
    }

    /*when navigating through the items using the arrow keys:*/
    .autocomplete-active {
        background-color: DodgerBlue !important;
        color: #ffffff;
    }

</style>

<body onload="myFunction()">

    <!--Make sure the form has the autocomplete function switched off:-->
    <form autocomplete="off" action="/action_page.php">
        <div class="autocomplete" style="width:300px;">
            <input id="myInput" type="text" name="myCountry" placeholder="Search for a place">
        </div>
        <input type="submit">
    </form>

    <p id="demo"></p>




    <div id="test">

    </div>

    <script>
        function myFunction() {

            <?php

                $url = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/xml/sitelist?key=00c02539-1bdc-4e8d-9480-c2f1e8f3e721";

                $xml=simplexml_load_file($url) or die("Error: Cannot create object");

                $count = $xml->Location->count();

                for ($i =0; $i < $count; $i++)
                {
                    foreach($xml->Location[$i]->attributes() as $a => $b){
                        if ($a == "name"){  
                            $stringPlaceArray[] = $b->__toString();
                        }
                    }                
                }  

                $js_stringPlaceArray = json_encode($stringPlaceArray);

                echo "var javascript_placeArray = ".$js_stringPlaceArray . ";\n";
            ?>

            document.getElementById('test').innerHTML = javascript_placeArray;

        }

    </script>


</body>

</html>
