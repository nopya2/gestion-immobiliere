<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EtablishmentRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: EtablishmentRepository::class)]
#[ApiResource(
    normalizationContext: ["groups" => ["read:etablishment"]],
    denormalizationContext: ["groups" => ["write:etablishment"]],
    attributes: [
        "pagination_client_enabled" => true,
        "pagination_client_items_per_page" => true
    ]
)]
#[UniqueEntity(
    fields: 'name',
    message: 'Ce nom est déja utilisé'
)]
class Etablishment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups("read:etablishment")]
    private $id;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Assert\NotBlank(message: 'Le champs est requis')]
    #[Assert\Length(
        min: 5, 
        minMessage: 'Le nom contenir au moins 5 caractères', 
        max: 10000, 
        maxMessage: 'Le nom contenir au plus 1000 caractères'
    )]
    #[Groups(["read:etablishment", "write:etablishment"])]
    private $name;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: 'Le champs est requis')]
    #[Assert\Email(message: 'Adresse e-mail invalide')]
    #[Groups(["read:etablishment", "write:etablishment"])]
    private $email;

    #[Assert\NotBlank(message: 'Le champs est requis')]
    #[ORM\Column(type: 'text')]
    #[Groups(["read:etablishment", "write:etablishment"])]
    private $address;

    #[Assert\NotBlank(message: 'Le champs est requis')]
    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:etablishment", "write:etablishment"])]
    private $city;
    
    #[Assert\NotBlank(message: 'Le champs est requis')]
    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:etablishment", "write:etablishment"])]
    private $country;
    
    #[Assert\NotBlank(message: 'Le champs est requis')]
    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:etablishment", "write:etablishment"])]
    private $logo;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["read:etablishment", "write:etablishment"])]
    private $website;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups(["read:etablishment"])]
    private $createdAt;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups(["read:etablishment"])]
    private $updatedAt;

    #[ORM\Column(type: 'array')]
    #[Groups(["read:etablishment", "write:etablishment"])]
    private $phones = [];
    
    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(string $logo): self
    {
        $this->logo = $logo;

        return $this;
    }

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(?string $website): self
    {
        $this->website = $website;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getPhones(): ?array
    {
        return $this->phones;
    }

    public function setPhones(array $phones): self
    {
        $this->phones = $phones;

        return $this;
    }

}
