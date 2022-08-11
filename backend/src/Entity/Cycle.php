<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CycleRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Filter\SimpleSearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

#[ORM\Entity(repositoryClass: CycleRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:cycle"]],
    denormalizationContext: ["groups" => ["write:cycle"]],
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
    properties: ["name"]
)]
#[ApiFilter(
    OrderFilter::class,
    properties: ["name"],
    arguments: ["orderParameterName" => "order"]
)]
class Cycle
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups([
        "read:cycle"
    ])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([
        "read:cycle", "write:cycle"
    ])]
    private $name;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups([
        "read:cycle", "write:cycle"
    ])]
    private $description;

    #[ORM\Column(type: 'datetime_immutable')]
    private $createdAt;

    #[ORM\Column(type: 'datetime_immutable')]
    private $updatedAt;

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

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }
}
