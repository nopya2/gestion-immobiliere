<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PermissionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

#[ORM\Entity(repositoryClass: PermissionRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:permission"]],
    denormalizationContext: ["groups" => ["write:permission"]],
    attributes: [
        "pagination_client_enabled" => true,
        "pagination_client_items_per_page" => true
    ]
)]
#[ApiFilter(
    SearchFilter::class,
    properties: ["name" => "ipartial"]
)]
#[ApiFilter(
    OrderFilter::class,
    properties: ["name"],
    arguments: ["orderParameterName" => "order"]
)]
class Permission
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["read:permission", "read:module", "write:module", "read:role", "write:role"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([
        "read:permission", "write:permission", 
        "read:module", "write:module", 
        "read:role", "write:role",
        "read:user",
        "read:privilege"
    ])]
    private $name;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([
        "read:permission", "write:permission", 
        "read:module", "write:module", 
        "read:role", "write:role",
        "read:user"
    ])]
    private $slug;

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

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

}
