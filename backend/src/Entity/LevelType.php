<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\LevelTypeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Filter\SimpleSearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

#[ORM\Entity(repositoryClass: LevelTypeRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:level_type"]],
    denormalizationContext: ["groups" => ["write:level_type"]],
    attributes: [
        "pagination_client_enabled" => true,
        "pagination_client_items_per_page" => true
    ]
)]
#[ApiFilter(
    SearchFilter::class,
    properties: ["etablishment" => "exact"]
)]
#[ApiFilter(
    SimpleSearchFilter::class,
    properties: ["name", "code"]
)]
#[ApiFilter(
    OrderFilter::class,
    properties: ["name"],
    arguments: ["orderParameterName" => "order"]
)]
class LevelType
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups([
        "read:level_type"
    ])]
    private $id;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Groups([
        "read:level_type", "write:level_type",
        "read:level",
        "read:cycle"
    ])]
    private $name;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Groups([
        "read:level_type", "write:level_type",
        "read:cycle"
    ])]
    private $code;

    #[ORM\ManyToOne(targetEntity: Etablishment::class)]
    #[Groups([
        "read:level_type", "write:level_type"
    ])]
    private $etablishment;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups([
        "read:level_type", "write:level_type",
        "read:level",
        "read:cycle"
    ])]
    private $level;

    #[ORM\ManyToOne(targetEntity: Cycle::class, inversedBy: 'levelTypes')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups([
        "read:level_type", "write:level_type",
        "read:level"
    ])]
    private $cycle;

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

    public function getLevel(): ?string
    {
        return $this->level;
    }

    public function setLevel(?string $level): self
    {
        $this->level = $level;

        return $this;
    }

    public function getCycle(): ?Cycle
    {
        return $this->cycle;
    }

    public function setCycle(?Cycle $cycle): self
    {
        $this->cycle = $cycle;

        return $this;
    }
}
