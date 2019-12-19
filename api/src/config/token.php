<?php

class Token
{
    private const KEY = "bling";

    static function generate($idUsuario)
    {
        //Header Token
        $header = [
            "typ" => "JWT",
            "alg" => "HS256"
        ];

        //Payload - Content
        $payload = [
            "exp" => (new DateTime("now"))->add(new DateInterval('PT1M'))->getTimestamp(),
            "uid" => $idUsuario
        ];

        //JSON
        $header = json_encode($header);
        $payload = json_encode($payload);

        //Base 64
        $header = base64_encode($header);
        $payload = base64_encode($payload);

        //Sign
        $sign = hash_hmac("sha256", "$header.$payload", self::KEY, true);
        $sign = base64_encode($sign);

        //Token
        $token = "$header.$payload.$sign";

        return $token;
    }

    static function validate($token)
    {
        try {
            $part = explode(".", $token);
            $header = trim(str_replace("Bearer", "", $part[0]));
            $payload = $part[1];
            $sign = $part[2];

            $valid = hash_hmac("sha256", "$header.$payload", self::KEY, true);
            $valid = base64_encode($valid);

            return $sign == $valid && self::checkExp($payload);
        } catch (Exception $e) {
            return false;
        }
    }

    private function checkExp($payload)
    {
        $payload = base64_decode($payload);
        $payload = json_decode($payload);
        return $payload->exp > (new DateTime("now"))->getTimestamp();
    }
}
