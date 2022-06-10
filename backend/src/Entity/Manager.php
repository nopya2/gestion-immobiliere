<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ManagerRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ManagerRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:manager"]],
    denormalizationContext: ["groups" => ["write:manager"]]
)]
class Manager extends User
{
    
}
