<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\RoleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

#[ORM\Entity(repositoryClass: RoleRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:role"]],
    denormalizationContext: ["groups" => ["write:role"]],
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
class Role
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups([
        "read:role", "read:user",
        "read:employee", "write:employee"
    ])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups([
        "read:role", "write:role",
        "read:user", "write:user",
        "read:employee", "write:employee"
    ])]
    private $name;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups(["read:role", "write:role"])]
    private $description;

    #[ORM\OneToMany(mappedBy: 'role', targetEntity: Privilege::class, orphanRemoval: true, cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(onDelete: 'cascade')]
    #[Groups(["read:role", "write:role"])]
    private $privileges;

    public function __construct()
    {
        $this->privileges = new ArrayCollection();
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
     * @return Collection<int, Privilege>
     */
    public function getPrivileges(): Collection
    {
        return $this->privileges;
    }

    public function addPrivilege(Privilege $privilege): self
    {
        if (!$this->privileges->contains($privilege)) {
            $this->privileges[] = $privilege;
            $privilege->setRole($this);
        }

        return $this;
    }

    public function removePrivilege(Privilege $privilege): self
    {
        if ($this->privileges->removeElement($privilege)) {
            // set the owning side to null (unless already changed)
            if ($privilege->getRole() === $this) {
                $privilege->setRole(null);
            }
        }

        return $this;
    }

}
