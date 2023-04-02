<?php

namespace App\Service;

use App\Entity\Owner;
use App\Repository\OwnerRepository;
use App\Repository\CustomerRepository;

class NumeroGenerator {

    private $ownerRepos;
    private $customerRepos;

    public function __construct(
        OwnerRepository $ownerRepos,
        CustomerRepository $customerRepos)
    {
        $this->ownerRepos = $ownerRepos;
        $this->customerRepos = $customerRepos;
    }

    /**
     * On genere le numero de dossier du proprietaire en recuperant le dernier proprietaire cree
     * format: "000001"
     * taille: 6 caracteres
     */
    public function getOwnerNumber(): string{
      $owner = $this->ownerRepos->getLastOwner();
      if(empty($owner)){
        return "000001";
      }

      //On convertit le numero de dossier en nomber
      $numInt = intval($owner->getNumFolder());
      $newNumInt = $numInt + 1;

      $newNumStr = strval($newNumInt);
      //On compte le nombre de caracteres de la nouvelle valeur
      $length = strlen($newNumStr);

      //On prefixe le numero par des 0 manquant
      $zeroToAdd = "";
      for($i = 0; $i < 6-$length; $i++){
        $zeroToAdd = "0".$zeroToAdd;
      }

      return $zeroToAdd . $newNumStr;
    }

    /**
     * On genere le numero de dossier du client en recuperant le dernier client cree
     * format: "000001"
     * taille: 6 caracteres
     */
    public function getCustomerNumber(): string{
      $customer = $this->customerRepos->getLastCustomer();
      if(empty($customer)){
        return "000001";
      }

      //On convertit le numero de dossier en nomber
      $numInt = intval($customer->getNumFolder());
      $newNumInt = $numInt + 1;

      $newNumStr = strval($newNumInt);
      //On compte le nombre de caracteres de la nouvelle valeur
      $length = strlen($newNumStr);

      //On prefixe le numero par des 0 manquant
      $zeroToAdd = "";
      for($i = 0; $i < 6-$length; $i++){
        $zeroToAdd = "0".$zeroToAdd;
      }

      return $zeroToAdd . $newNumStr;
    }
}