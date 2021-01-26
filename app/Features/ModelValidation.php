<?php

namespace App\Features;

use Illuminate\Support\Facades\Validator;

/**
 *
 */
trait ModelValidation
{
  protected static $errors = [];

  public static function validate(array $data)
  {
    if (!isset(self::$rules)) {
      return true;
    }

    $valid = Validator::make($data, self::$rules);

    if ($valid->fails()) {
      self::$errors = $valid->errors()->all();
      return false;
    }

    return true;
  }

  public function getErrors()
  {
    return self::$errors;
  }

  public function getRules()
  {
    return self::$rules;
  }
}
