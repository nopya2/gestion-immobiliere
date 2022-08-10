<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EtablishmentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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
    #[Groups([
        "read:etablishment", 
        "read:user", 
        "read:manager", 
        "read:employee", "write:employee",
        "read:diploma", "write:diploma",
        "read:faculty", "write:faculty",
        "read:level_type", "write:level_type",
        "write:level"
    ])]
    private $id;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Assert\NotBlank(message: 'Le champs est requis')]
    #[Assert\Length(
        min: 5, 
        minMessage: 'Le nom contenir au moins 5 caractères', 
        max: 10000, 
        maxMessage: 'Le nom contenir au plus 1000 caractères'
    )]
    #[Groups(["read:etablishment", "write:etablishment", "read:user", "read:manager", "read:employee"])]
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
    #[ORM\OneToOne(targetEntity: Image::class, cascade: ["persist", "remove"])]
    #[ORM\JoinColumn(nullable: true, onDelete: "cascade")]
    #[Groups(["read:etablishment", "write:etablishment"])]
    private ?Image $logo;

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

    #[Assert\NotBlank(message: 'Le champs est requis')]
    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:etablishment", "write:etablishment"])]
    private $etablishmentType;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["read:etablishment", "write:etablishment"])]
    private $postalBox;

    #[ORM\OneToMany(mappedBy: 'etablishment', targetEntity: AcademicYear::class, orphanRemoval: true)]
    private $academicYears;

    #[ORM\OneToOne(mappedBy: 'etablishment', targetEntity: Information::class, cascade: ['persist', 'remove'])]
    #[Groups(["read:etablishment", "write:etablishment"])]
    private $information;

    #[ORM\OneToOne(targetEntity: Manager::class, cascade: ['persist', 'remove'])]
    #[Groups(["read:etablishment", "write:etablishment"])]
    private $manager;
    
    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
        $this->academicYears = new ArrayCollection();
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

    public function getLogo(): ?Image
    {
        return $this->logo;
    }

    public function setLogo(Image $logo): void
    {
        $this->logo = $logo;
    }

    public function getEtablishmentType(): ?string
    {
        return $this->etablishmentType;
    }

    public function setEtablishmentType(string $etablishmentType): self
    {
        $this->etablishmentType = $etablishmentType;

        return $this;
    }

    public function getPostalBox(): ?string
    {
        return $this->postalBox;
    }

    public function setPostalBox(?string $postalBox): self
    {
        $this->postalBox = $postalBox;

        return $this;
    }

    /**
     * @return Collection<int, AcademicYear>
     */
    public function getAcademicYears(): Collection
    {
        return $this->academicYears;
    }

    public function addAcademicYear(AcademicYear $academicYear): self
    {
        if (!$this->academicYears->contains($academicYear)) {
            $this->academicYears[] = $academicYear;
            $academicYear->setEtablishment($this);
        }

        return $this;
    }

    public function removeAcademicYear(AcademicYear $academicYear): self
    {
        if ($this->academicYears->removeElement($academicYear)) {
            // set the owning side to null (unless already changed)
            if ($academicYear->getEtablishment() === $this) {
                $academicYear->setEtablishment(null);
            }
        }

        return $this;
    }

    public function getInformation(): ?Information
    {
        return $this->information;
    }

    public function setInformation(?Information $information): self
    {
        // unset the owning side of the relation if necessary
        if ($information === null && $this->information !== null) {
            $this->information->setEtablishment(null);
        }

        // set the owning side of the relation if necessary
        if ($information !== null && $information->getEtablishment() !== $this) {
            $information->setEtablishment($this);
        }

        $this->information = $information;

        return $this;
    }

    public function getManager(): ?Manager
    {
        return $this->manager;
    }

    public function setManager(?Manager $manager): self
    {
        $this->manager = $manager;

        return $this;
    }

}
