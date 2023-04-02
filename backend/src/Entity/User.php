<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use Doctrine\ORM\Mapping\DiscriminatorColumn;
use Doctrine\ORM\Mapping\DiscriminatorMap;
use Doctrine\ORM\Mapping\InheritanceType;

/**
 * Defines the properties of the User entity to represent the application users.
 * See https://symfony.com/doc/current/doctrine.html#creating-an-entity-class.
 *
 * Tip: if you have an existing database, you can generate these entity class automatically.
 * See https://symfony.com/doc/current/doctrine/reverse_engineering.html
 *
 * @author Ryan Weaver <weaverryan@gmail.com>
 * @author Javier Eguiluz <javier.eguiluz@gmail.com>
 */
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[InheritanceType("JOINED")]
#[DiscriminatorColumn(name: 'discr', type: 'string')]
#[DiscriminatorMap(["user" => "User", "manager" => "Manager", "employee" => "Employee"])]
// #[ORM\Table(name: 'symfony_demo_user')]
#[ApiResource(
    normalizationContext: ["groups" => ["read:user"]],
    denormalizationContext: ["groups" => ["write:user"]],
    attributes: [
        "pagination_client_enabled" => true,
        "pagination_client_items_per_page" => true
    ]
)]
#[ApiFilter(
    SearchFilter::class,
    properties: ["name" => "ipartial", "role" => "exact"]
)]
#[ApiFilter(
    OrderFilter::class,
    properties: ["name", "firstname"],
    arguments: ["orderParameterName" => "order"]
)]
#[ApiFilter(BooleanFilter::class, properties: ['enabled'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups([
        "read:user", 
        "read:manager", 
        "read:etablishment", "write:etablishment",
        "read:owner",
        "read:customer",
        "read:employee"])]
    private ?int $id = null;

    #[ORM\Column(type: 'string', unique: true)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 2, max: 50)]
    #[Groups(["read:user", "write:user", "read:manager", "write:manager",
        "read:employee", "write:employee",
        "read:etablishment"])]
    private ?string $username = null;

    #[ORM\Column(type: 'string', unique: true)]
    #[Assert\Email]
    #[Groups(["read:user", "write:user", "read:manager", "write:manager",
        "read:employee", "write:employee",
        "read:etablishment"])]
    private ?string $email = null;

    #[ORM\Column(type: 'string')]
    #[Groups(["write:user", "write:manager",
        "write:employee"])]
    private ?string $password = null;

    #[ORM\Column(type: 'json')]
    #[Groups(["read:user", "write:user", "read:manager", "write:manager",
        "read:employee", "write:employee"])]
    private array $roles = [];

    #[Groups(["read:user", "read:manager", "read:employee"])]
    private ?string $token = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:user", "write:user", "read:manager", "write:manager",
        "read:employee", "write:employee"])]
    #[Assert\NotBlank]
    private $phoneNumber1;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["read:user", "write:user", "read:manager", "write:manager",
        "read:employee", "write:employee"])]
    private $phoneNumber2;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 2, max: 50)]
    #[Groups(["read:user", "write:user", "read:manager", "write:manager", "read:etablishment",
        "read:employee", "write:employee",
        "read:owner",
        "read:customer",])]
    private $name;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 2, max: 50)]
    #[Groups(["read:user", "write:user", "read:manager", "write:manager", "read:etablishment",
        "read:employee", "write:employee",
        "read:owner",
        "read:customer"])]
    private $firstname;

    #[ORM\Column(type: 'boolean', nullable: true)]
    #[Groups(["read:user", "write:user", "read:manager", "write:manager",
        "read:employee", "write:employee"])]
    private $enabled = true;

    #[ORM\ManyToOne(targetEntity: Role::class, cascade: ['persist'])]
    #[Assert\NotBlank]
    #[ORM\JoinColumn(nullable: true, onDelete: "set null")]
    #[Groups([
        "read:user", "write:user", 
        "read:manager", "write:manager",
        "read:employee", "write:employee"])]
    private $role;

    public function __construct()
    {
        $this->enabled = true;
        $this->roles = ['ROLE_USER'];
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserIdentifier(): string
    {
        return $this->username;
    }

    public function getUsername(): string
    {
        return $this->getUserIdentifier();
    }

    public function setUsername(string $username): void
    {
        $this->username = $username;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    /**
     * Returns the roles or permissions granted to the user for security.
     */
    public function getRoles(): array
    {
        $roles = $this->roles;

        // guarantees that a user always has at least one role for security
        if (empty($roles)) {
            $roles[] = 'ROLE_USER';
        }

        return array_unique($roles);
    }

    public function setRoles(array $roles): void
    {
        $this->roles = $roles;
    }

    /**
     * Returns the salt that was originally used to encode the password.
     *
     * {@inheritdoc}
     */
    public function getSalt(): ?string
    {
        // We're using bcrypt in security.yaml to encode the password, so
        // the salt value is built-in and you don't have to generate one
        // See https://en.wikipedia.org/wiki/Bcrypt

        return null;
    }

    /**
     * Removes sensitive data from the user.
     *
     * {@inheritdoc}
     */
    public function eraseCredentials(): void
    {
        // if you had a plainPassword property, you'd nullify it here
        // $this->plainPassword = null;
    }

    public function __serialize(): array
    {
        // add $this->salt too if you don't use Bcrypt or Argon2i
        return [$this->id, $this->username, $this->password];
    }

    public function __unserialize(array $data): void
    {
        // add $this->salt too if you don't use Bcrypt or Argon2i
        [$this->id, $this->username, $this->password] = $data;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(?string $token): self
    {
        $this->token = $token;

        return $this;
    }

    public function getPhoneNumber1(): ?string
    {
        return $this->phoneNumber1;
    }

    public function setPhoneNumber1(string $phoneNumber1): self
    {
        $this->phoneNumber1 = $phoneNumber1;

        return $this;
    }

    public function getPhoneNumber2(): ?string
    {
        return $this->phoneNumber2;
    }

    public function setPhoneNumber2(?string $phoneNumber2): self
    {
        $this->phoneNumber2 = $phoneNumber2;

        return $this;
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

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getEnabled(): ?bool
    {
        return $this->enabled;
    }

    public function setEnabled(?bool $enabled): self
    {
        $this->enabled = $enabled;

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

    public function isEnabled(): ?bool
    {
        return $this->enabled;
    }
}
