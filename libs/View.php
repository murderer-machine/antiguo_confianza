<?php

class View {

    function render($view, $title = ' ', $datos = '') {
        $path = './views/' . $view;
        if (file_exists($path . '.php')) {
            require $path . '.php';
        } elseif (file_exists($path . '.html')) {
            require $path . '.html';
        } else {
            echo 'Error : Invalida Vista <strong>' . $view . '</strong> para renderizar';
        }
        if ($title != "") {
            $this->title = $title;
        }
    }

}
