<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\DiplomaRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: DiplomaRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:diploma"]],
    denormalizationContext: ["groups" => ["write:diploma"]],
    attributes: [
        "pagination_client_enabled" => true,
        "pagination_client_items_per_page" => true
    ]
)]
#[ApiFilter(
    SearchFilter::class,
    properties: ["etablishment" => "exact"]
)]
class Diploma
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups([
        "read:diploma",
        "read:faculty", "write:faculty"
    ])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([
        "read:diploma", "write:diploma",
        "read:faculty"
    ])]
    private $name;

    #[ORM\Column(type: 'text')]
    #[Groups([
        "read:diploma", "write:diploma",
        "read:faculty"
    ])]
    private $description;

    #[ORM\ManyToOne(targetEntity: Etablishment::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([
        "read:diploma", "write:diploma"
    ])]
    private $etablishment;

    #[ORM\Column(type: 'integer')]
    #[Groups([
        "read:diploma", "write:diploma"
    ])]
    private $duration;

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

    public function getEtablishment(): ?Etablishment
    {
        return $this->etablishment;
    }

    public function setEtablishment(?Etablishment $etablishment): self
    {
        $this->etablishment = $etablishment;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): self
    {
        $this->duration = $duration;

        return $this;
    }
}
