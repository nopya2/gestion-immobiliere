<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PrivilegeRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=PrivilegeRepository::class)
 * @ApiResource(
 *   normalizationContext={"groups"={"read:privilege"}},
 *   denormalizationContext={"groups"={"write:privilege"}},
 *   attributes= {
 *       "pagination_client_enabled"=true,
 *       "pagination_client_items_per_page"=true
 *   }
 * )
 */

class Privilege
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:privilege", "read:role", "write:role"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Module::class)
     * @ORM\JoinColumn(nullable=false)
     * @Groups({
     *   "read:privilege", "write:privilege", 
     *   "read:role", "write:role",
     *   "read:employee",
     *   "read:user"
     * })
     */
    private $module;

    /**
     * @ORM\ManyToOne(targetEntity=Permission::class)
     * @ORM\JoinColumn(nullable= false)
     * @Groups({
     *   "read:privilege", "write:privilege", 
     *   "read:role", "write:role",
     *   "read:employee",
     *   "read:user"
     * })
     */
    private $permission;

    /**
     * @ORM\ManyToOne(targetEntity=Role::class, inversedBy="privileges")
     * @ORM\JoinColumn(nullable=false)
     */
    private $role;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getModule(): ?Module
    {
        return $this->module;
    }

    public function setModule(?Module $module): self
    {
        $this->module = $module;

        return $this;
    }

    public function getPermission(): ?Permission
    {
        return $this->permission;
    }

    public function setPermission(?Permission $permission): self
    {
        $this->permission = $permission;

        return $this;
    }

    public function getRole(): ?Role
    {
        return $this->role;
    }

    public function setRole(?Role $role): self
    {
        $this->role = $role;

        return $this;
    }
}
