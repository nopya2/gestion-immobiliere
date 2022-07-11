<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EmployeeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EmployeeRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:employee"]],
    denormalizationContext: ["groups" => ["write:employee"]]
)]
class Employee extends User
{
    #[ORM\ManyToOne(targetEntity: Etablishment::class, cascade: ["persist"])]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups([
        "read:employee", "write:employee",
        "read:manager", "write:manager"
    ])]
    private $etablishment;

    public function getEtablishment(): ?Etablishment
    {
        return $this->etablishment;
    }

    public function setEtablishment(?Etablishment $etablishment): self
    {
        $this->etablishment = $etablishment;

        return $this;
    }
}
