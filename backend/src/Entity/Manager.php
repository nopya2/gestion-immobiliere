<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ManagerRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ManagerRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:manager"]],
    denormalizationContext: ["groups" => ["write:manager"]]
)]
class Manager
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups([
        "read:user", 
        "read:manager", 
        "read:etablishment", "write:etablishment",
        "read:employee"])]
    private ?int $id = null;

    #[ORM\OneToOne(targetEntity: Employee::class, cascade: ['persist'])]
    #[Groups([
        "read:user", 
        "read:manager", "write:manager",
        "read:etablishment"
    ])]
    private $employee;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmployee(): ?Employee
    {
        return $this->employee;
    }

    public function setEmployee(?Employee $employee): self
    {
        $this->employee = $employee;

        return $this;
    }
}
