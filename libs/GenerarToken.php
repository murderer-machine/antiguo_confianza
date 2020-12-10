<?php

class GenerarToken {

    private $clave;
    private $metodo;
    private $algoritmo;
    protected $enc_key;

    public function __construct() {
        $this->clave = HASHKEY;
        $this->metodo = 'aes-128-ctr';
        $this->algoritmo = ALGORITMO;
        $this->enc_key = openssl_digest($this->clave, $this->algoritmo, TRUE);
    }

    public function Encriptar($texto) {
        $enc_iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($this->metodo));
        $crypted_token = openssl_encrypt($texto, $this->metodo, $this->enc_key, OPENSSL_ZERO_PADDING, $enc_iv) . "." . bin2hex($enc_iv);
        return base64_encode($crypted_token);
    }

    public function Desencriptar($token) {
        list($token, $enc_iv) = explode(".", base64_decode($token));
        $token = openssl_decrypt($token, $this->metodo, $this->enc_key, 0, hex2bin($enc_iv));
        return $token;
    }

    public function __destruct() {
        unset($this->clave, $this->metodo, $this->algoritmo);
    }

}
