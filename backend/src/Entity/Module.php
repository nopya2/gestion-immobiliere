<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ModuleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

#[ORM\Entity(repositoryClass: ModuleRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:module"]],
    denormalizationContext: ["groups" => ["write:module"]],
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
class Module
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["read:module", "read:role", "write:role"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:module", "write:module", "read:role", "write:role"])]
    #[Assert\NotBlank(message: 'Le champs est requis.')]
    #[Assert\Length(
        min: 2, 
        max: 50, 
        minMessage: 'Le champs doit avoir au moins 2 caractères', 
        maxMessage: 'Le champs doit avoir au plus 50 caractères'
    )]
    private $name;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:module", "write:module", "read:role", "write:role"])]
    #[Assert\NotBlank(message: 'Le champs est requis.')]
    #[Assert\Length(
        min: 2, 
        max: 50, 
        minMessage: 'Le champs doit avoir au moins 2 caractères', 
        maxMessage: 'Le champs doit avoir au plus 50 caractères'
    )]
    private $slug;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups(["read:module", "write:module", "read:role", "write:role"])]
    private $description;

    #[ORM\ManyToMany(targetEntity: Permission::class, cascade: ['persist'])]
    #[ORM\JoinTable(name: 'module_permission')]
    #[Groups(["read:module", "write:module"])]
    private $permissions;

    public function __construct()
    {
        $this->permissions = new ArrayCollection();
    }

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Permission>
     */
    public function getPermissions(): Collection
    {
        return $this->permissions;
    }

    public function addPermission(Permission $permission): self
    {
        if (!$this->permissions->contains($permission)) {
            $this->permissions[] = $permission;
        }

        return $this;
    }

    public function removePermission(Permission $permission): self
    {
        $this->permissions->removeElement($permission);

        return $this;
    }

}
