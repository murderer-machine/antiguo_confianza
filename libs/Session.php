<?php

class Session {

    static function init($name = '') {
        // ini_set("session.use_strict_mode", false);
        ini_set("session.cookie_httponly", true);
        ini_set("session.cookie_secure", true);
        //ini_set('session.cache_expire integer', 720);
        session_name($name);
        if (!isset($_COOKIE[$name])) {
            setcookie($name, session_create_id());
        } else {
            session_id($_COOKIE[$name]);
        }
        //session_cache_expire(720);
        //$cache_expire = session_cache_expire();
        session_start();
    }

    static function destroy() {
        session_unset();
        session_destroy();
    }

    static function getValue($var) {
        return $_SESSION[$var];
    }

    static function setValue($var, $val) {
        $_SESSION[$var] = $val;
    }

    static function unsetValue($var) {
        if (isset($_SESSION[$var])) {
            unset($_SESSION[$var]);
        }
    }

    static function exist() {
        if (sizeof($_SESSION) > 0) {
            return true;
        } else {
            return false;
        }
    }

}
