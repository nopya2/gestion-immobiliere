<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TypeConstructionRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Filter\SimpleSearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: TypeConstructionRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:typeConstruction"]],
    denormalizationContext: ["groups" => ["write:typeConstruction"]],
    attributes: [
        "pagination_client_enabled" => true,
        "pagination_client_items_per_page" => true
    ]
)]
#[ApiFilter(
    SearchFilter::class,
    properties: ["label" => "ipartial"]
)]
#[ApiFilter(
    OrderFilter::class,
    properties: ["label"],
    arguments: ["orderParameterName" => "order"]
)]
class TypeConstruction
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups([
        "read:typeConstruction"
    ])]
    private $id;
    
    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([
        "read:typeConstruction", "write:typeConstruction"
    ])]
    #[Assert\NotBlank]
    #[Assert\Length(min: 2, max: 50)]
    private $label;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups([
        "read:typeConstruction", "write:typeConstruction"
    ])]
    private $description;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }
}
