<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\FacultyRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: FacultyRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:faculty"]],
    denormalizationContext: ["groups" => ["write:faculty"]],
    attributes: [
        "pagination_client_enabled" => true,
        "pagination_client_items_per_page" => true
    ]
)]
#[ApiFilter(
    SearchFilter::class,
    properties: ["name" => "ipartial"]
)]
#[UniqueEntity(
    fields: ['name', 'code'],
    message: 'Le nom ou le code est déja utilisé'
)]
class Faculty
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups([
        "read:faculty"
    ])]
    private $id;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Assert\NotBlank(message: 'Le champs est requis')]
    #[Groups([
        "read:faculty", "write:faculty"
    ])]
    private $name;

    #[ORM\Column(type: 'text')]
    #[Assert\NotBlank(message: 'Le champs est requis')]
    #[Groups([
        "read:faculty", "write:faculty"
    ])]
    private $description;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Assert\NotBlank(message: 'Le champs est requis')]
    #[Groups([
        "read:faculty", "write:faculty"
    ])]
    private $code;

    #[ORM\ManyToOne(targetEntity: Etablishment::class)]
    #[Assert\NotBlank(message: 'Le champs est requis')]
    #[Groups([
        "read:faculty", "write:faculty"
    ])]
    private $etablishment;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
    }

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
